# Setup Guide - Real Estate Analysis Chatbot

## Prerequisites

- Python 3.8+ installed
- Node.js 16+ and npm installed
- Git installed

## Step-by-Step Setup

### 1. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Add gunicorn for deployment
pip install gunicorn

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend will run on: http://localhost:8000

### 2. Frontend Setup (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on: http://localhost:3000

### 3. Prepare Sample Data

1. Download the Excel file from the provided Google Sheets link
2. Save it as `sample_data.xlsx`
3. Place it in `backend/api/` directory

OR

Upload your own Excel file through the web interface.

## Excel File Format

Your Excel file should have these columns:
- `area` - Area/locality name
- `year` - Year of data
- `price` - Property price
- `demand` - Demand index (optional)
- `size` - Property size (optional)

## Testing the Application

1. Open http://localhost:3000 in your browser
2. Try sample queries:
   - "Give me analysis of Wakad"
   - "Compare Ambegaon Budruk and Aundh demand trends"
   - "Show price growth for Akurdi over the last 3 years"

## Deployment

### Backend (Render/Heroku)

1. Create account on Render.com or Heroku
2. Connect your GitHub repository
3. Set environment variables:
   - `DJANGO_SECRET_KEY`
   - `DEBUG=False`
4. Deploy

### Frontend (Vercel/Netlify)

1. Create account on Vercel or Netlify
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL=<your-backend-url>`
6. Deploy

## Troubleshooting

### Backend Issues

- **Port already in use**: Change port with `python manage.py runserver 8001`
- **Module not found**: Ensure virtual environment is activated
- **Database errors**: Run `python manage.py migrate`

### Frontend Issues

- **Port 3000 in use**: React will prompt to use another port
- **API connection failed**: Check backend is running on port 8000
- **Module not found**: Delete `node_modules` and run `npm install` again

## Optional: LLM Integration

To integrate OpenAI or other LLM:

1. Install openai package:
```bash
pip install openai
```

2. Add to `backend/.env`:
```
OPENAI_API_KEY=your-api-key-here
```

3. Update `backend/api/analyzer.py` to use LLM for summaries

## Project Structure

```
real-estate-chatbot/
├── backend/
│   ├── api/                    # Django app
│   │   ├── analyzer.py         # Data analysis logic
│   │   ├── models.py           # Database models
│   │   ├── views.py            # API endpoints
│   │   └── serializers.py      # Data serialization
│   ├── real_estate_backend/    # Django project settings
│   ├── manage.py               # Django management
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── App.js              # Main app component
│   │   └── index.js            # Entry point
│   ├── public/                 # Static files
│   └── package.json            # Node dependencies
└── README.md                   # Documentation
```

## Support

For issues or questions, please create an issue on GitHub.
