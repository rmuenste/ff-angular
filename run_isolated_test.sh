#!/bin/bash

# Isolated test runner for rising-bubble-3d view
# This script starts the server and runs the comprehensive test

echo "🚀 Starting isolated test for rising-bubble-3d view..."
echo "=================================================="

# Kill any existing server processes
echo "🧹 Cleaning up any existing server processes..."
pkill -f "python server.py" 2>/dev/null || true
sleep 1

# Start the server in background
echo "🔥 Starting FastAPI server..."
cd server
source env/bin/activate 2>/dev/null || echo "⚠️  Virtual environment not found, using system Python"

# Start server in background with output redirection
python server.py > server.log 2>&1 &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
echo "⏳ Waiting for server to start..."
sleep 3

# Check if server is running
if ! curl -s http://127.0.0.1:8000/get-view-data > /dev/null 2>&1; then
    echo "❌ Server failed to start. Check server.log for details."
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

echo "✅ Server started successfully (PID: $SERVER_PID)"
echo

# Run the test
echo "🧪 Running isolated test..."
python test_rising_bubble_3d.py

TEST_RESULT=$?

# Cleanup
echo
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

if [ $TEST_RESULT -eq 0 ]; then
    echo "✅ Test completed successfully!"
    echo
    echo "💡 Key findings:"
    echo "   - Server returns data in object format: {RB3sphericityL1: [...], ...}"
    echo "   - Component converts to array format: [data[0], data[1], ...]"
    echo "   - This fixes the [null, null, null] issue in plot-component.component.ts"
    echo
    echo "🎯 The rising-bubble-3d graphs should now work correctly!"
else
    echo "❌ Test failed. Check the output above for details."
fi

exit $TEST_RESULT