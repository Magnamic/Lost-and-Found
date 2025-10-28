#!/bin/bash
# Start backend server in background
node server/server_server.js &
# Start React frontend on port 5000 (this will be the main process)
BROWSER=none PORT=5000 HOST=0.0.0.0 npm start
