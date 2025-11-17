@echo off
echo Starting Real Estate Chatbot Frontend...
echo.

cd frontend

if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo.
echo Starting React development server...
echo Frontend will be available at http://localhost:3000
echo.
npm start
