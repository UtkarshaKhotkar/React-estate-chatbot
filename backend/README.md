# Real Estate Chatbot - Backend

Django REST API for the Real Estate Analysis Chatbot.

## Setup

```bash
# Create virtual environment
python -m venv venv

# Activate
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create sample data
python create_sample_data.py

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

## API Endpoints

### Upload File
```
POST /api/upload/
Content-Type: multipart/form-data

Body: file (Excel file)
```

### Analyze Query
```
POST /api/analyze/
Content-Type: application/json

Body: {
  "query": "Give me analysis of Wakad",
  "file_id": 1  // optional
}
```

## Environment Variables

Create a `.env` file:

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Core Components

### analyzer.py
- `RealEstateAnalyzer` - Main analysis class
- `extract_areas()` - Extract area names from query
- `extract_years()` - Extract time periods
- `filter_data()` - Filter DataFrame
- `generate_summary()` - Create natural language summary
- `generate_chart_data()` - Prepare data for charts

### views.py
- `UploadFileView` - Handle file uploads
- `AnalyzeQueryView` - Process queries and return results

### models.py
- `UploadedFile` - Store uploaded Excel files

## Testing

```bash
python manage.py test
```

## Deployment

### Render

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: real-estate-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn real_estate_backend.wsgi:application
```

2. Deploy via Render dashboard

### Heroku

```bash
heroku create your-app-name
git push heroku main
heroku run python manage.py migrate
```

## Admin Panel

Access at `/admin/` after creating superuser:
```bash
python manage.py createsuperuser
```

## Database

Default: SQLite (development)
Production: PostgreSQL recommended

## CORS

Configured to allow all origins in development.
Update `settings.py` for production:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend-domain.com",
]
```
