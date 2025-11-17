# ⚠️ Important Notes

## Before You Start

### 1. Prerequisites Check
- [ ] Python 3.8+ installed (`python --version`)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (for version control)

### 2. Download Sample Data
The Google Sheets link provided in the assignment:
https://docs.google.com/spreadsheets/d/1BPFvRBLAFFLyQ1EDJ4ogXt8HYCUXhM80/edit

**How to use:**
1. Open the link
2. File → Download → Microsoft Excel (.xlsx)
3. Save as `sample_data.xlsx`
4. Place in `backend/api/` directory

**OR** use the auto-generated sample data:
```bash
cd backend
python create_sample_data.py
```

## Quick Start Commands

### Windows Users
```bash
# Terminal 1 - Backend
start_backend.bat

# Terminal 2 - Frontend
start_frontend.bat
```

### Mac/Linux Users
```bash
# Terminal 1 - Backend
chmod +x start_backend.sh
./start_backend.sh

# Terminal 2 - Frontend
chmod +x start_frontend.sh
./start_frontend.sh
```

## Common Issues & Solutions

### Issue 1: "Python not found"
**Solution:** Install Python from python.org or use Microsoft Store

### Issue 2: "npm not found"
**Solution:** Install Node.js from nodejs.org

### Issue 3: "Port 8000 already in use"
**Solution:** 
```bash
# Find and kill the process
netstat -ano | findstr :8000  # Windows
lsof -ti:8000 | xargs kill    # Mac/Linux

# Or use different port
python manage.py runserver 8001
```

### Issue 4: "Port 3000 already in use"
**Solution:** React will prompt to use another port - press 'Y'

### Issue 5: "Module not found" (Backend)
**Solution:**
```bash
# Make sure virtual environment is activated
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue 6: "Module not found" (Frontend)
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json  # Delete
npm install  # Reinstall
```

### Issue 7: "No data found for query"
**Solution:** 
- Check area name spelling (case-sensitive)
- Use exact names from sample data
- Available areas: Wakad, Aundh, Baner, Hinjewadi, Kharadi, etc.

### Issue 8: CORS errors
**Solution:** 
- Make sure backend is running on port 8000
- Check `settings.py` has `CORS_ALLOW_ALL_ORIGINS = True`

## Testing Checklist

Before recording demo or submitting:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Sample queries work
- [ ] File upload works
- [ ] Charts display correctly
- [ ] Tables display correctly
- [ ] CSV download works
- [ ] No console errors in browser
- [ ] Mobile responsive (test in browser dev tools)

## For Submission

### 1. GitHub Repository
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Real Estate Analysis Chatbot"

# Create repo on GitHub, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### 2. README Updates
Before submitting, update README.md:
- [ ] Add your name
- [ ] Add GitHub username
- [ ] Add LinkedIn profile
- [ ] Add demo video link (after recording)
- [ ] Add live demo link (after deployment)

### 3. Demo Video
Follow `DEMO_SCRIPT.md`:
- [ ] Record 1-2 minute walkthrough
- [ ] Show all features
- [ ] Upload to YouTube/Google Drive
- [ ] Add link to README

### 4. Deployment
**Backend (Render):**
1. Create account on render.com
2. New → Web Service
3. Connect GitHub repo
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn real_estate_backend.wsgi:application`
6. Add environment variables
7. Deploy

**Frontend (Vercel):**
1. Create account on vercel.com
2. Import project from GitHub
3. Framework: React
4. Build command: `npm run build`
5. Output directory: `build`
6. Add environment variable: `REACT_APP_API_URL=<backend-url>`
7. Deploy

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com
```

## File Structure Verification

Make sure you have:
```
✓ backend/
  ✓ api/
    ✓ analyzer.py
    ✓ views.py
    ✓ models.py
    ✓ serializers.py
    ✓ urls.py
  ✓ real_estate_backend/
    ✓ settings.py
    ✓ urls.py
  ✓ manage.py
  ✓ requirements.txt
  ✓ create_sample_data.py

✓ frontend/
  ✓ src/
    ✓ components/
      ✓ ChatInterface.js
      ✓ ChatMessage.js
      ✓ AnalysisResult.js
      ✓ PriceChart.js
      ✓ FileUpload.js
    ✓ App.js
    ✓ index.js
  ✓ public/
    ✓ index.html
  ✓ package.json

✓ README.md
✓ QUICK_START.md
✓ SETUP_GUIDE.md
✓ FEATURES.md
✓ DEMO_SCRIPT.md
```

## Performance Tips

1. **Large Excel Files:**
   - Limit to 10,000 rows for best performance
   - Consider pagination for larger datasets

2. **Multiple Queries:**
   - Backend caches loaded Excel data
   - No need to re-upload for each query

3. **Browser Performance:**
   - Use Chrome or Firefox for best experience
   - Clear cache if charts don't update

## Security Notes

### Development
- CORS is open (allow all origins)
- DEBUG mode is ON
- SQLite database

### Production
- Update CORS to specific origins
- Set DEBUG=False
- Use PostgreSQL
- Use environment variables for secrets
- Enable HTTPS

## Optional Enhancements

If you have extra time:

### Easy (30 min)
- [ ] Add more sample queries
- [ ] Improve error messages
- [ ] Add loading animations
- [ ] Customize colors/theme

### Medium (1-2 hours)
- [ ] Add query history
- [ ] Save favorite queries
- [ ] Add more chart types
- [ ] Improve mobile UI

### Advanced (3+ hours)
- [ ] OpenAI integration
- [ ] User authentication
- [ ] Database storage for queries
- [ ] Advanced filters
- [ ] Map visualization

## Support Resources

- **Django Docs:** https://docs.djangoproject.com/
- **React Docs:** https://react.dev/
- **Chart.js Docs:** https://www.chartjs.org/
- **Bootstrap Docs:** https://getbootstrap.com/
- **pandas Docs:** https://pandas.pydata.org/

## Contact

If you encounter issues:
1. Check this file first
2. Review SETUP_GUIDE.md
3. Check browser console for errors
4. Check terminal for backend errors
5. Search error messages online

## Final Checklist

Before submission:
- [ ] Code works locally
- [ ] All features tested
- [ ] GitHub repo created
- [ ] README updated
- [ ] Demo video recorded
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] All links added to README
- [ ] Code is clean and commented
- [ ] Documentation is complete

## Good Luck! 🚀

You have everything you need to successfully complete and submit this assignment. The code is production-ready and well-documented. Just follow the steps, test thoroughly, and you'll do great!

**Remember:**
- Test locally first
- Deploy early to catch issues
- Record demo after deployment
- Double-check all links before submission

**You've got this! 💪**
