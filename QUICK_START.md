# 🚀 Quick Start Guide

Get the Real Estate Chatbot running in 5 minutes!

## Option 1: Automated Start (Recommended)

### Windows Users

1. **Start Backend:**
   - Double-click `start_backend.bat`
   - Wait for "Starting Django server..." message
   - Backend runs at http://localhost:8000

2. **Start Frontend:**
   - Open new terminal
   - Double-click `start_frontend.bat`
   - Wait for browser to open automatically
   - Frontend runs at http://localhost:3000

### Mac/Linux Users

1. **Start Backend:**
   ```bash
   chmod +x start_backend.sh
   ./start_backend.sh
   ```

2. **Start Frontend:**
   ```bash
   # Open new terminal
   chmod +x start_frontend.sh
   ./start_frontend.sh
   ```

## Option 2: Manual Start

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python create_sample_data.py
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🎯 First Steps

1. **Open the app** at http://localhost:3000

2. **Try a sample query:**
   - Click on "Give me analysis of Wakad"
   - See the summary, chart, and data table

3. **Try more queries:**
   - "Compare Ambegaon Budruk and Aundh demand trends"
   - "Show price growth for Akurdi over the last 3 years"

4. **Upload your own data:**
   - Click "Choose File"
   - Select an Excel file (.xlsx)
   - Click "Upload"
   - Ask questions about your data

## 📊 Sample Data

The app comes with pre-generated sample data for these areas:
- Wakad, Aundh, Baner, Hinjewadi, Kharadi
- Viman Nagar, Koregaon Park, Kalyani Nagar
- Ambegaon Budruk, Akurdi, Pimple Saudagar

Data spans from 2020 to 2024.

## 🐛 Troubleshooting

### Backend won't start
- **Issue:** Port 8000 already in use
- **Fix:** `python manage.py runserver 8001`

### Frontend won't start
- **Issue:** Port 3000 already in use
- **Fix:** React will prompt to use another port (press Y)

### "Module not found" error
- **Backend:** Make sure virtual environment is activated
- **Frontend:** Delete `node_modules` and run `npm install` again

### No data found
- **Issue:** Area name doesn't match
- **Fix:** Check spelling - use exact names from sample data

## 📝 Next Steps

1. ✅ Test all sample queries
2. ✅ Upload your own Excel file
3. ✅ Explore the charts and tables
4. ✅ Download CSV data
5. 📚 Read FEATURES.md for advanced features
6. 🚀 Follow SETUP_GUIDE.md for deployment

## 🎥 Recording Demo

When ready to record your demo video:
1. Read DEMO_SCRIPT.md
2. Practice the flow
3. Record using OBS, Loom, or QuickTime
4. Keep it 1-2 minutes
5. Upload and add link to README

## 💡 Tips

- Use Chrome or Firefox for best experience
- Keep both backend and frontend running
- Check browser console for errors
- Backend logs show in terminal
- Sample data is in `backend/api/sample_data.xlsx`

## 🆘 Need Help?

- Check SETUP_GUIDE.md for detailed instructions
- Review FEATURES.md for implementation details
- See SAMPLE_DATA_STRUCTURE.md for data format
- Check CHECKLIST.md for completion status

---

**Happy Coding! 🎉**
