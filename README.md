# 🏠 Real Estate Analysis Chatbot

A full-stack web application that analyzes real estate data from Excel files and provides intelligent insights through natural language queries, interactive charts, and data tables.

![Tech Stack](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## ✨ Features

- 📊 **Excel Data Processing** - Upload and analyze real estate datasets
- 💬 **Natural Language Queries** - Ask questions in plain English
- 📈 **Interactive Charts** - Visualize price trends and demand patterns
- 📋 **Filtered Data Tables** - View and export filtered results
- 🎯 **Smart Query Parsing** - Automatically extracts areas, time periods, and intent
- 📥 **CSV Export** - Download filtered data for further analysis
- 🎨 **Modern UI** - Clean, responsive chat interface
- 🚀 **Deployment Ready** - Configured for Vercel, Render, Heroku

## 🛠️ Tech Stack

**Backend:**
- Django 4.2 + Django REST Framework
- pandas + openpyxl (Excel processing)
- Python 3.11

**Frontend:**
- React 18
- Bootstrap 5
- Chart.js (data visualization)
- Axios (API communication)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create sample data
python create_sample_data.py

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend runs on: **http://localhost:8000**

### 2. Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: **http://localhost:3000**

## 📝 Sample Queries

Try these queries to see the chatbot in action:

- "Give me analysis of Wakad"
- "Compare Ambegaon Budruk and Aundh demand trends"
- "Show price growth for Akurdi over the last 3 years"
- "Analyze Hinjewadi"
- "Compare Baner and Kharadi"

## 📊 Excel Data Format

Your Excel file should contain these columns:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| area | String | Yes | Locality/area name |
| year | Integer | Yes | Year of data |
| price | Float | Yes | Property price |
| demand | Float | No | Demand index (0-100) |
| size | Float | No | Property size (sq ft) |
| type | String | No | Property type |

See `SAMPLE_DATA_STRUCTURE.md` for detailed format information.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload/` | Upload Excel file |
| POST | `/api/analyze/` | Analyze query and return results |

### Example Request

```bash
curl -X POST http://localhost:8000/api/analyze/ \
  -H "Content-Type: application/json" \
  -d '{"query": "Give me analysis of Wakad"}'
```

### Example Response

```json
{
  "summary": "Analysis for Wakad:\n- Average price: ₹6,000,000\n- Price range: ₹5,500,000 - ₹6,500,000",
  "chart_data": [
    {
      "area": "Wakad",
      "data": [
        {"year": 2021, "price": 5500000, "demand": 75},
        {"year": 2022, "price": 6000000, "demand": 80}
      ]
    }
  ],
  "table_data": [...]
}
```

## 🎨 Project Structure

```
real-estate-chatbot/
├── backend/
│   ├── api/
│   │   ├── analyzer.py          # Core analysis logic
│   │   ├── views.py             # API endpoints
│   │   ├── models.py            # Database models
│   │   ├── serializers.py       # Data serialization
│   │   └── sample_data.xlsx     # Sample dataset
│   ├── real_estate_backend/
│   │   ├── settings.py          # Django settings
│   │   └── urls.py              # URL routing
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.js
│   │   │   ├── ChatMessage.js
│   │   │   ├── AnalysisResult.js
│   │   │   ├── PriceChart.js
│   │   │   └── FileUpload.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── README.md
├── SETUP_GUIDE.md
├── FEATURES.md
└── DEMO_SCRIPT.md
```

## 🚀 Deployment

### Backend (Render/Heroku)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Set environment variables:
   - `DJANGO_SECRET_KEY`
   - `DEBUG=False`
5. Deploy

### Frontend (Vercel/Netlify)

1. Push code to GitHub
2. Import project on Vercel
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `build`
4. Add environment variable:
   - `REACT_APP_API_URL=<backend-url>`
5. Deploy

See `SETUP_GUIDE.md` for detailed deployment instructions.

## 🎥 Demo Video

[Add your demo video link here]

**Demo Script:** See `DEMO_SCRIPT.md` for recording guidelines

## 🌟 Bonus Features

- ✅ Clean, modular code structure
- ✅ Comprehensive error handling
- ✅ Responsive design (mobile-friendly)
- ✅ CSV export functionality
- ✅ Sample query suggestions
- ✅ Loading states and animations
- ✅ Deployment configurations
- ⭐ Optional: OpenAI LLM integration (see `FEATURES.md`)

## 📚 Documentation

- **SETUP_GUIDE.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature list and implementation details
- **SAMPLE_DATA_STRUCTURE.md** - Excel data format guide
- **DEMO_SCRIPT.md** - Video recording script

## 🧪 Testing

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

[Your Name]
- GitHub: [@yourusername]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- Sample data structure inspired by real estate market analysis
- UI design inspired by modern chat applications
- Built as part of a technical assignment

---

**⭐ If you found this project helpful, please give it a star!**
