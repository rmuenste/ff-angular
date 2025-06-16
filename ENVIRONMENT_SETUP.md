# Environment Configuration Setup

This project uses environment-specific configuration files to manage different deployment environments securely.

## File Convention

The project follows this environment file convention:

```
server/
├── .env.example      ✅ Template file (committed to git)
├── .env.development  ❌ Local development config (not in git)
├── .env.staging      ❌ Staging environment config (not in git)  
├── .env.production   ❌ Production environment config (not in git)
└── .env              ❌ Optional local overrides (not in git)
```

## Developer Setup Instructions

### 1. Initial Setup

When setting up the project for the first time:

```bash
# Navigate to server directory
cd server

# Create your environment-specific configuration files
cp .env.example .env.development
cp .env.example .env.staging
cp .env.example .env.production
```

### 2. Configure Each Environment

Edit each file with appropriate values for that environment:

**Development (.env.development):**
```bash
# Local development settings
PORT=8000
HOST=127.0.0.1
ALLOWED_ORIGINS=http://localhost:4200
LOG_LEVEL=DEBUG
ENABLE_RATE_LIMITING=true
RATE_LIMIT_REQUESTS=2000  # More generous for development
```

**Staging (.env.staging):**
```bash
# Staging environment settings  
PORT=8000
HOST=0.0.0.0
ALLOWED_ORIGINS=https://staging.yourdomain.com
LOG_LEVEL=INFO
ENABLE_RATE_LIMITING=true
RATE_LIMIT_REQUESTS=1000
```

**Production (.env.production):**
```bash
# Production environment settings
PORT=8000
HOST=0.0.0.0
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
LOG_LEVEL=WARNING
ENABLE_RATE_LIMITING=true
RATE_LIMIT_REQUESTS=500  # More restrictive for production
```

### 3. Running the Server

The server automatically loads the correct configuration based on the ENVIRONMENT variable:

```bash
# Development (default)
python server.py
# or explicitly:
ENVIRONMENT=development python server.py

# Staging
ENVIRONMENT=staging python server.py

# Production
ENVIRONMENT=production python server.py
```

## Security Best Practices

### ✅ DO:
- ✅ Commit `.env.example` as a template
- ✅ Update `.env.example` when adding new configuration options
- ✅ Use different values for each environment as appropriate
- ✅ Keep sensitive values (API keys, passwords) out of all files if possible
- ✅ Use external secret management for production (e.g., Docker secrets, Kubernetes secrets)

### ❌ DON'T:
- ❌ Commit actual `.env.*` files (except `.env.example`)
- ❌ Put real secrets/passwords in any environment file
- ❌ Share environment files via email, chat, or other insecure channels
- ❌ Use production values in development/staging files

## Adding New Configuration

When you need to add new configuration options:

1. **Add to `.env.example`** with appropriate comments and placeholder values
2. **Update all your local environment files** (`.env.development`, etc.)
3. **Document the new option** in this README
4. **Inform team members** to update their local files

## Troubleshooting

### "Environment file not found"
If you get an error about missing environment files:
```bash
cp .env.example .env.development
```

### "Missing configuration option"
If the server reports missing configuration:
1. Check if the option exists in `.env.example`
2. Copy any new options to your environment-specific files
3. Set appropriate values for your environment

### "Permission denied"
Environment files should not be executable:
```bash
chmod 644 server/.env.*
```

## Current Configuration Options

See `server/.env.example` for the complete list of available configuration options and their descriptions.