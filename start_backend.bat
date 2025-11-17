@echo off
echo Starting Real Estate Chatbot Backend...
echo.

cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

if not exist api\sample_data.xlsx (
    echo Creating sample data...
    python create_sample_data.py
)

if not exist db.sqlite3 (
    echo Running migrations...
    python manage.py migrate
)

echo.
echo Starting Django server...
echo Backend will be available at http://localhost:8000
echo.
python manage.py runserver
