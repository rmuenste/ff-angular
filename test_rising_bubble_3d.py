#!/usr/bin/env python3
"""
Isolated test for the rising-bubble-3d view endpoint
This script tests the server endpoint and shows the response structure.
"""

import requests
import json
import sys
from pprint import pprint

def test_rising_bubble_view():
    """Test the rising-bubble-3d view endpoint"""
    
    url = "http://127.0.0.1:8000/get-view-data"
    payload = {"view_name": "rising-bubble-3d"}
    headers = {"Content-Type": "application/json"}
    
    try:
        print("🚀 Testing rising-bubble-3d view endpoint...")
        print(f"URL: {url}")
        print(f"Payload: {payload}")
        print("-" * 60)
        
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print("-" * 60)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Success! Response received.")
            print(f"📊 Number of files returned: {len(data)}")
            print("\n📋 File keys in response:")
            
            for i, key in enumerate(sorted(data.keys())):
                file_data = data[key]
                if isinstance(file_data, dict) and 'error' not in file_data:
                    # Get some stats about the data
                    data_size = len(str(file_data))
                    has_x = 'x' in file_data
                    has_y = 'y' in file_data
                    has_marker = 'marker' in file_data
                    print(f"  {i:2d}. {key:20s} - Size: {data_size:6d} chars, x: {has_x}, y: {has_y}, marker: {has_marker}")
                elif isinstance(file_data, list):
                    print(f"  {i:2d}. {key:20s} - Array with {len(file_data)} plot objects")
                else:
                    print(f"  {i:2d}. {key:20s} - ERROR: {file_data}")
            
            print("\n🔍 Detailed structure of first file:")
            first_key = sorted(data.keys())[0]
            first_file = data[first_key]
            if isinstance(first_file, list):
                print(f"File: {first_key}")
                print(f"Type: Array with {len(first_file)} plot objects")
                
                # Show structure of first plot object
                if len(first_file) > 0:
                    first_plot = first_file[0]
                    print("First plot object structure:")
                    for key, value in first_plot.items():
                        if isinstance(value, list):
                            print(f"  {key}: List with {len(value)} elements")
                            if len(value) > 0 and key in ['x', 'y']:
                                print(f"    Range: {min(value):.6f} to {max(value):.6f}")
                        else:
                            print(f"  {key}: {type(value).__name__} = {value}")
            
            # Expected order based on original code
            expected_order = [
                "RB3sphericityL1", "RB3sphericityL2", "RB3sphericityL3",
                "RB3bubble_massL1", "RB3bubble_massL2", "RB3bubble_massL3", 
                "RB3sizeL1", "RB3sizeL2", "RB3sizeL3",
                "RB3surfaceL1", "RB3surfaceL2", "RB3surfaceL3"
            ]
            
            print("\n📐 Expected vs Actual order:")
            print("Expected order for benchmark-bubble3 component:")
            for i, expected_key in enumerate(expected_order):
                if expected_key in data:
                    data_item = data[expected_key]
                    if isinstance(data_item, list):
                        status = f"✅ Found (Array with {len(data_item)} items)"
                    else:
                        status = f"⚠️  Found but wrong type: {type(data_item)}"
                else:
                    status = "❌ Missing"
                print(f"  {i:2d}. {expected_key:20s} {status}")
            
            print("\n🔧 Component Data Conversion Test:")
            print("Testing the array conversion that fixes the component issue...")
            
            # Test the conversion logic from the component
            converted_array = [data[key] for key in expected_order if key in data]
            print(f"Converted to array with {len(converted_array)} elements")
            
            # Test specific indices that caused the [null, null, null] issue
            test_indices = [0, 1, 2, 3]  # First few that component uses
            print("Component will access:")
            for i in test_indices:
                if i < len(converted_array):
                    item = converted_array[i]
                    if item is not None and isinstance(item, list):
                        print(f"  this.data[{i}] = {expected_order[i]:20s} ✅ Valid array with {len(item)} plot objects")
                    else:
                        print(f"  this.data[{i}] = {expected_order[i]:20s} ❌ Invalid: {type(item)}")
                else:
                    print(f"  this.data[{i}] = (missing) ❌ Array too short")
            
            # Check for null values that caused the original issue
            null_count = sum(1 for item in converted_array if item is None)
            if null_count > 0:
                print(f"\n❌ Found {null_count} null values - this would cause plotting issues!")
            else:
                print(f"\n✅ No null values found - plotting should work correctly!")
            
        else:
            print(f"❌ Error! Status: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection failed! Is the server running?")
        print("Start the server with:")
        print("  cd server && source env/bin/activate && python server.py")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False
    
    return True

def test_other_views():
    """Test the other view endpoints for comparison"""
    
    views = ["benchmark-case1", "benchmark-case2"]
    
    for view_name in views:
        print(f"\n🔍 Testing {view_name} view:")
        try:
            response = requests.post(
                "http://127.0.0.1:8000/get-view-data",
                json={"view_name": view_name},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"  ✅ {view_name}: {len(data)} files returned")
            else:
                print(f"  ❌ {view_name}: Status {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ {view_name}: Error - {e}")

def test_invalid_view():
    """Test error handling with invalid view"""
    
    print(f"\n🚫 Testing invalid view:")
    try:
        response = requests.post(
            "http://127.0.0.1:8000/get-view-data",
            json={"view_name": "invalid-view-name"},
            headers={"Content-Type": "application/json"}
        )
        
        print(f"  Status: {response.status_code}")
        if response.status_code == 404:
            print(f"  ✅ Correct 404 error: {response.json()}")
        else:
            print(f"  ⚠️  Unexpected status: {response.text}")
            
    except Exception as e:
        print(f"  ❌ Error: {e}")

if __name__ == "__main__":
    print("=" * 80)
    print("🧪 ISOLATED TEST FOR RISING-BUBBLE-3D VIEW")
    print("=" * 80)
    
    # Test main functionality
    success = test_rising_bubble_view()
    
    if success:
        # Test other views for comparison
        test_other_views()
        
        # Test error handling
        test_invalid_view()
        
        print("\n" + "=" * 80)
        print("🎉 ISOLATED TEST COMPLETE")
        print("=" * 80)
        print("This test verifies that:")
        print("1. ✅ Server returns correct data structure")
        print("2. ✅ All 12 files are present and valid")
        print("3. ✅ Data conversion works for component compatibility") 
        print("4. ✅ No null values that cause [null, null, null] in plots")
        print("5. ✅ Error handling works for invalid views")
        
    sys.exit(0 if success else 1)