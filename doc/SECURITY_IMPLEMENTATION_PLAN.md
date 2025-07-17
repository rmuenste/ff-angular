# Security Implementation Plan

## Current Vulnerabilities Analysis

### 1. Path Traversal Vulnerabilities

#### FastAPI Server (Limited Protection)
```python
# Current protection in server.py line 76-79
if ".." in file_name or "/" in file_name or "\\" in file_name:
    logger.warning(f"Invalid characters detected in filename request: {file_name}")
    response_data[file_name] = ErrorResponse(error=f"Invalid filename format: {file_name}").dict()
    continue
```
**Issues:**
- Basic regex check only
- Doesn't handle encoded characters (%2E%2E, %2F)
- No whitelist approach
- Vulnerable to null byte injection

#### Node.js Server (No Protection)
```javascript
// server.js line 54 - VULNERABLE
const filePath = path.join(__dirname, DATA_DIRECTORY, `${fileName}.json`);
```
**Issues:**
- No input validation whatsoever
- Direct path concatenation
- Vulnerable to `../../../etc/passwd` style attacks

### 2. Authentication/Authorization Issues

#### Current State
- **No authentication** on any endpoint
- **No rate limiting** 
- **Public API** accessible to anyone
- **No request logging** for security monitoring
- **No API keys** or tokens required

#### Attack Vectors
- DDoS through repeated requests
- Data scraping of entire dataset
- Server resource exhaustion
- Competitive intelligence gathering

## Implementation Strategy

### Phase 1: Path Traversal Protection (High Priority)

#### 1.1 Secure Filename Validation

**Approach: Whitelist + Sanitization**

```python
import re
import os
from pathlib import Path

def validate_filename(filename: str) -> tuple[bool, str]:
    """
    Secure filename validation with whitelist approach
    Returns: (is_valid, sanitized_filename)
    """
    # Remove any path separators and dangerous characters
    sanitized = re.sub(r'[^\w\-_.]', '', filename)
    
    # Whitelist pattern: alphanumeric, hyphens, underscores
    if not re.match(r'^[a-zA-Z0-9_\-]+$', sanitized):
        return False, ""
    
    # Length check
    if len(sanitized) > 100:
        return False, ""
    
    # Prevent hidden files
    if sanitized.startswith('.'):
        return False, ""
    
    return True, sanitized

def secure_file_path(base_dir: str, filename: str) -> tuple[bool, str]:
    """
    Create secure file path and verify it's within base directory
    """
    is_valid, clean_filename = validate_filename(filename)
    if not is_valid:
        return False, ""
    
    # Create absolute paths for comparison
    base_path = Path(base_dir).resolve()
    file_path = (base_path / f"{clean_filename}.json").resolve()
    
    # Ensure the file path is within the base directory
    try:
        file_path.relative_to(base_path)
        return True, str(file_path)
    except ValueError:
        return False, ""
```

#### 1.2 Implementation Plan

**FastAPI Enhancement:**
```python
@app.post("/get-multiple-json-v-new")
async def get_multiple_json_v_new(request: FileRequest) -> ResponseType:
    response_data: ResponseType = {}
    
    for file_name in request.fileNames:
        is_valid, file_path = secure_file_path(DATA_DIRECTORY, file_name)
        
        if not is_valid:
            logger.warning(f"Invalid filename rejected: {file_name}")
            response_data[file_name] = ErrorResponse(error="Invalid filename").dict()
            continue
            
        # Rest of file processing...
```

**Node.js Enhancement:**
```javascript
const path = require('path');

function validateFilename(filename) {
    // Remove dangerous characters
    const sanitized = filename.replace(/[^\w\-_.]/g, '');
    
    // Whitelist validation
    if (!/^[a-zA-Z0-9_\-]+$/.test(sanitized)) {
        return { valid: false, sanitized: '' };
    }
    
    // Length and hidden file checks
    if (sanitized.length > 100 || sanitized.startsWith('.')) {
        return { valid: false, sanitized: '' };
    }
    
    return { valid: true, sanitized };
}

function secureFilePath(baseDir, filename) {
    const validation = validateFilename(filename);
    if (!validation.valid) {
        return { valid: false, path: '' };
    }
    
    const basePath = path.resolve(baseDir);
    const filePath = path.resolve(basePath, `${validation.sanitized}.json`);
    
    // Ensure file is within base directory
    if (!filePath.startsWith(basePath + path.sep)) {
        return { valid: false, path: '' };
    }
    
    return { valid: true, path: filePath };
}
```

### Phase 2: Authentication & Authorization (High Priority)

#### 2.1 Authentication Strategy Options

**Option A: API Key Authentication (Recommended for this use case)**
- Simple to implement
- Suitable for server-to-server communication
- Easy to rotate and manage
- Lower overhead than JWT

**Option B: JWT Token Authentication**
- More sophisticated
- Supports user sessions
- Stateless authentication
- Better for user-facing applications

**Option C: Basic Authentication**
- Simple username/password
- Easy to implement
- Less secure than other options

#### 2.2 Recommended Implementation: API Key + Rate Limiting

**Environment Configuration:**
```bash
# .env files
API_KEYS=key1,key2,key3  # Production keys
REQUIRE_AUTH=true
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=3600  # 1 hour
```

**FastAPI Implementation:**
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import time
from collections import defaultdict

# Rate limiting storage
request_counts = defaultdict(list)
security = HTTPBearer()

VALID_API_KEYS = set(os.getenv('API_KEYS', '').split(','))
REQUIRE_AUTH = os.getenv('REQUIRE_AUTH', 'false').lower() == 'true'
RATE_LIMIT = int(os.getenv('RATE_LIMIT_REQUESTS', '100'))
RATE_WINDOW = int(os.getenv('RATE_LIMIT_WINDOW', '3600'))

async def verify_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not REQUIRE_AUTH:
        return True
        
    if credentials.credentials not in VALID_API_KEYS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    return credentials.credentials

async def rate_limit_check(api_key: str, client_ip: str):
    now = time.time()
    key = f"{api_key}:{client_ip}"
    
    # Clean old requests
    request_counts[key] = [req_time for req_time in request_counts[key] 
                          if now - req_time < RATE_WINDOW]
    
    # Check rate limit
    if len(request_counts[key]) >= RATE_LIMIT:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded"
        )
    
    # Record this request
    request_counts[key].append(now)

@app.post("/get-multiple-json-v-new")
async def get_multiple_json_v_new(
    request: FileRequest,
    api_key: str = Depends(verify_api_key),
    client_request: Request = None
):
    # Rate limiting
    client_ip = client_request.client.host
    await rate_limit_check(api_key, client_ip)
    
    # Rest of implementation...
```

**Node.js Implementation:**
```javascript
const rateLimit = require('express-rate-limit');

const VALID_API_KEYS = new Set(process.env.API_KEYS?.split(',') || []);
const REQUIRE_AUTH = process.env.REQUIRE_AUTH === 'true';

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '3600') * 1000,
    max: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
    message: { error: 'Rate limit exceeded' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Authentication middleware
function authenticateApiKey(req, res, next) {
    if (!REQUIRE_AUTH) {
        return next();
    }
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid API key' });
    }
    
    const apiKey = authHeader.slice(7);
    if (!VALID_API_KEYS.has(apiKey)) {
        return res.status(401).json({ error: 'Invalid API key' });
    }
    
    req.apiKey = apiKey;
    next();
}

// Apply middleware
app.use(limiter);
app.use(authenticateApiKey);
```

#### 2.3 Frontend Integration

**Updated PostService:**
```typescript
export class PostService {
  private apiKey = environment.api.apiKey;

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    if (this.apiKey) {
      headers = headers.set('Authorization', `Bearer ${this.apiKey}`);
    }
    
    return headers;
  }

  postMultiFileRequestV2(fileNames: Array<string>): Observable<any> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.getMultipleJsonV2}`;
    const payload = { fileNames };
    const headers = this.getHeaders();
    
    return this.http.post<any>(url, payload, { headers });
  }
}
```

### Phase 3: Additional Security Measures

#### 3.1 Request Logging & Monitoring

```python
import logging
from datetime import datetime

# Security logger
security_logger = logging.getLogger('security')
security_handler = logging.FileHandler('security.log')
security_logger.addHandler(security_handler)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Log request details
    security_logger.info({
        'timestamp': datetime.utcnow().isoformat(),
        'method': request.method,
        'url': str(request.url),
        'client_ip': request.client.host,
        'user_agent': request.headers.get('user-agent'),
        'api_key_hash': hashlib.sha256(request.headers.get('authorization', '').encode()).hexdigest()[:16]
    })
    
    response = await call_next(request)
    
    # Log response details
    process_time = time.time() - start_time
    security_logger.info({
        'response_time': process_time,
        'status_code': response.status_code
    })
    
    return response
```

#### 3.2 Input Validation Enhancement

```python
from pydantic import BaseModel, validator
from typing import List

class FileRequest(BaseModel):
    fileNames: List[str]
    
    @validator('fileNames')
    def validate_filenames(cls, v):
        if len(v) > 50:  # Max 50 files per request
            raise ValueError('Too many files requested')
        
        for filename in v:
            if len(filename) > 100:
                raise ValueError('Filename too long')
            
            if not re.match(r'^[a-zA-Z0-9_\-]+$', filename):
                raise ValueError(f'Invalid filename: {filename}')
        
        return v
```

#### 3.3 HTTPS Enforcement

```python
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

if os.getenv('FORCE_HTTPS', 'false').lower() == 'true':
    app.add_middleware(HTTPSRedirectMiddleware)
```

## Implementation Timeline

### Week 1: Path Traversal Protection
- [ ] Implement secure filename validation
- [ ] Add path traversal protection to both servers
- [ ] Test with various attack payloads
- [ ] Update error handling

### Week 2: Authentication System
- [ ] Design API key management system
- [ ] Implement authentication middleware
- [ ] Update frontend to use API keys
- [ ] Create environment configurations

### Week 3: Rate Limiting & Monitoring
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Create monitoring dashboard
- [ ] Test load scenarios

### Week 4: Security Hardening
- [ ] Add input validation
- [ ] Implement HTTPS enforcement
- [ ] Security testing and penetration testing
- [ ] Documentation and deployment guides

## Testing Strategy

### Security Test Cases

1. **Path Traversal Tests:**
   ```bash
   # Test payloads
   "../../../etc/passwd"
   "..%2F..%2F..%2Fetc%2Fpasswd"
   "....//....//etc/passwd"
   "\0..\0..\0etc\0passwd"
   ```

2. **Authentication Tests:**
   ```bash
   # Invalid API keys
   curl -H "Authorization: Bearer invalid_key"
   
   # Missing authentication
   curl -X POST (without auth header)
   
   # Rate limiting
   for i in {1..200}; do curl -H "Authorization: Bearer valid_key"; done
   ```

3. **Input Validation Tests:**
   ```bash
   # Oversized requests
   # Special characters
   # Empty requests
   # Malformed JSON
   ```

## Security Monitoring

### Key Metrics to Monitor

1. **Failed authentication attempts**
2. **Rate limit violations**
3. **Invalid filename requests**
4. **Unusual request patterns**
5. **Server response times**
6. **Error rates**

### Alerting Thresholds

- More than 10 failed auth attempts per minute
- Rate limit exceeded more than 5 times per hour
- Invalid filename requests > 20 per hour
- Server response time > 5 seconds
- Error rate > 5%

## Cost-Benefit Analysis

### Implementation Costs
- **Development time:** 2-3 weeks
- **Testing time:** 1 week
- **Ongoing maintenance:** 2-4 hours/month

### Security Benefits
- **Prevents data breaches:** High value
- **Reduces server abuse:** Medium value
- **Compliance readiness:** High value
- **Professional credibility:** Medium value

### Performance Impact
- **Authentication overhead:** ~2-5ms per request
- **Rate limiting:** ~1-2ms per request
- **Input validation:** ~1ms per request
- **Total overhead:** <10ms per request

## Conclusion

This security implementation plan addresses the critical vulnerabilities while maintaining system performance and usability. The phased approach allows for incremental improvements and testing at each stage.

**Priority Implementation Order:**
1. Path traversal protection (Critical)
2. API key authentication (High)
3. Rate limiting (High)
4. Request logging (Medium)
5. Additional hardening (Low)

The proposed solution balances security with practicality, making it suitable for production deployment while being maintainable by a small development team.