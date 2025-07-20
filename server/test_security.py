#!/usr/bin/env python3
"""
Test script for security implementations
"""
import re
import os
from pathlib import Path

def validate_filename(filename: str) -> tuple[bool, str]:
    """
    Secure filename validation for intranet deployment
    Returns: (is_valid, sanitized_filename)
    """
    if not filename or len(filename) > 100:
        return False, ""
    
    # Check for dangerous patterns BEFORE sanitization
    dangerous_patterns = ['..', '/', '\\', '\0', '.env', 'config', 'passwd', 'shadow', 'hosts']
    for pattern in dangerous_patterns:
        if pattern in filename.lower():
            return False, ""
    
    # Remove any dangerous characters, keep only alphanumeric, hyphens, underscores
    sanitized = re.sub(r'[^\w\-_]', '', filename)
    
    # Ensure it's not empty after sanitization
    if not sanitized:
        return False, ""
    
    # Prevent hidden files
    if sanitized.startswith('.'):
        return False, ""
    
    # Must contain at least one letter or number
    if not re.search(r'[a-zA-Z0-9]', sanitized):
        return False, ""
    
    # Basic pattern validation
    if not re.match(r'^[a-zA-Z0-9_\-]+$', sanitized):
        return False, ""
    
    return True, sanitized

def secure_file_path(base_dir: str, filename: str) -> tuple[bool, str]:
    """
    Create secure file path and verify it's within base directory
    """
    is_valid, clean_filename = validate_filename(filename)
    if not is_valid:
        return False, ""
    
    try:
        # Create absolute paths for comparison
        base_path = Path(base_dir).resolve()
        file_path = (base_path / f"{clean_filename}.json").resolve()
        
        # Ensure the file path is within the base directory
        file_path.relative_to(base_path)
        return True, str(file_path)
    except (ValueError, OSError):
        return False, ""

def test_security():
    print("🔒 Testing Security Implementations")
    print("=" * 50)
    
    # Test valid filenames
    print("\n✅ Testing valid filenames:")
    valid_files = ['c1g1l1_circularity', 'test_file', 'data_123', 'RB3bubble_massL1']
    for filename in valid_files:
        is_valid, clean = validate_filename(filename)
        status = "✅ PASS" if is_valid else "❌ FAIL"
        print(f"  {filename:<20} → {status} ({clean})")
    
    # Test path traversal attempts
    print("\n🚨 Testing path traversal attempts (should all fail):")
    malicious_files = [
        '../../../etc/passwd',
        '..\\\\..\\\\config', 
        'test/../secret',
        '.env',
        'config.json',
        '../../../../database/backup.sql',
        'test\0admin',
        'file with spaces',
        'file/with/slashes'
    ]
    
    for filename in malicious_files:
        is_valid, clean = validate_filename(filename)
        status = "✅ BLOCKED" if not is_valid else "🚨 DANGER"
        print(f"  {filename:<30} → {status}")
    
    # Test secure file path
    print("\n🔧 Testing secure file path:")
    
    # Valid file
    is_valid, path = secure_file_path('data', 'c1g1l1_circularity')
    print(f"  Valid file: {is_valid} → {path}")
    
    # Malicious file
    is_valid, path = secure_file_path('data', '../../../etc/passwd')
    status = "✅ BLOCKED" if not is_valid else "🚨 DANGER"
    print(f"  Malicious file: {status}")
    
    # Test edge cases
    print("\n🧪 Testing edge cases:")
    edge_cases = ['', 'a' * 101, '.hidden', '...', 'normal_file']
    for filename in edge_cases:
        is_valid, clean = validate_filename(filename)
        status = "✅" if is_valid else "❌"
        print(f"  {filename:<15} → {status}")
    
    print("\n🎉 Security tests completed!")
    print("All path traversal attempts should be blocked (❌ or 🚨)")

if __name__ == "__main__":
    test_security()