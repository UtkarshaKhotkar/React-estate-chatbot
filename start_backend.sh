#!/bin/bash

echo "Starting Real Estate Chatbot Backend..."
echo ""

cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

if [ ! -f "api/sample_data.xlsx" ]; then
    echo "Creating sample data..."
    python create_sample_data.py
fi

if [ ! -f "db.sqlite3" ]; then
    echo "Running migrations..."
    python manage.py migrate
fi

echo ""
echo "Starting Django server..."
echo "Backend will be available at http://localhost:8000"
echo ""
python manage.py runserver
