# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                     (http://localhost:3000)                  │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    React Frontend                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                           │  │
│  │  ├── App.js (Main Container)                         │  │
│  │  ├── ChatInterface (State Management)                │  │
│  │  ├── ChatMessage (Message Display)                   │  │
│  │  ├── AnalysisResult (Results Display)                │  │
│  │  ├── PriceChart (Chart.js Visualization)             │  │
│  │  └── FileUpload (File Upload UI)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  Libraries: React 18, Bootstrap 5, Chart.js, Axios          │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ REST API Calls
                             │ POST /api/upload/
                             │ POST /api/analyze/
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Django Backend                            │
│                  (http://localhost:8000)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Layer (views.py)                                 │  │
│  │  ├── UploadFileView                                   │  │
│  │  │   └── Handle file uploads                          │  │
│  │  └── AnalyzeQueryView                                 │  │
│  │      └── Process queries and return results           │  │
│  └──────────────────────────────────────────────────────┘  │
│                             │                                │
│  ┌──────────────────────────▼────────────────────────────┐ │
│  │  Business Logic (analyzer.py)                         │ │
│  │  ├── RealEstateAnalyzer                               │ │
│  │  │   ├── load_data() - Load Excel                     │ │
│  │  │   ├── extract_areas() - Parse query                │ │
│  │  │   ├── extract_years() - Parse time                 │ │
│  │  │   ├── filter_data() - Filter DataFrame             │ │
│  │  │   ├── generate_summary() - Create text             │ │
│  │  │   └── generate_chart_data() - Prepare charts       │ │
│  │  └── analyze() - Main orchestration                   │ │
│  └──────────────────────────────────────────────────────┘ │
│                             │                                │
│  ┌──────────────────────────▼────────────────────────────┐ │
│  │  Data Layer                                            │ │
│  │  ├── models.py (UploadedFile)                         │ │
│  │  ├── SQLite Database                                  │ │
│  │  └── File Storage (media/)                            │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                              │
│  Libraries: Django 4.2, DRF, pandas, openpyxl               │
└──────────────────────────────────────────────────────────────┘
                             │
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    Excel Data Files                          │
│  ├── Uploaded files (media/uploads/)                        │
│  └── Sample data (api/sample_data.xlsx)                     │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Query Processing Flow

```
User Input
    │
    ├─→ "Give me analysis of Wakad"
    │
    ▼
ChatInterface Component
    │
    ├─→ Create user message
    ├─→ Display in chat
    ├─→ Show loading indicator
    │
    ▼
Axios POST Request
    │
    ├─→ URL: /api/analyze/
    ├─→ Body: { query: "...", file_id: ... }
    │
    ▼
Django AnalyzeQueryView
    │
    ├─→ Validate request
    ├─→ Get file path
    │
    ▼
RealEstateAnalyzer
    │
    ├─→ Load Excel data (pandas)
    ├─→ Parse query
    │   ├─→ Extract areas: ["Wakad"]
    │   └─→ Extract years: [2021, 2022, 2023]
    │
    ├─→ Filter DataFrame
    │   └─→ df[df['area'] == 'Wakad']
    │
    ├─→ Generate Results
    │   ├─→ Summary: "Analysis for Wakad..."
    │   ├─→ Chart Data: [{area: "Wakad", data: [...]}]
    │   └─→ Table Data: [{year: 2021, price: ...}, ...]
    │
    ▼
JSON Response
    │
    ├─→ {
    │     "summary": "...",
    │     "chart_data": [...],
    │     "table_data": [...]
    │   }
    │
    ▼
ChatInterface Component
    │
    ├─→ Create bot message
    ├─→ Hide loading indicator
    │
    ▼
AnalysisResult Component
    │
    ├─→ Display Summary
    ├─→ Render Chart (PriceChart)
    └─→ Render Table (with export)
    │
    ▼
User sees results
```

### 2. File Upload Flow

```
User selects file
    │
    ▼
FileUpload Component
    │
    ├─→ Validate file type (.xlsx, .xls)
    ├─→ Create FormData
    │
    ▼
Axios POST Request
    │
    ├─→ URL: /api/upload/
    ├─→ Content-Type: multipart/form-data
    │
    ▼
Django UploadFileView
    │
    ├─→ Validate file
    ├─→ Save to media/uploads/
    ├─→ Create UploadedFile record
    │
    ▼
JSON Response
    │
    ├─→ { id: 1, file: "...", uploaded_at: "..." }
    │
    ▼
FileUpload Component
    │
    ├─→ Show success message
    ├─→ Update parent state (fileId)
    │
    ▼
ChatInterface uses fileId for queries
```

## Component Hierarchy

```
App
├── FileUpload
│   └── Form
│       ├── Input (file)
│       └── Button (upload)
│
└── ChatInterface
    ├── Welcome Message (conditional)
    │   └── Sample Query Buttons
    │
    ├── Messages List
    │   └── ChatMessage (multiple)
    │       ├── User Message
    │       │   └── Text
    │       │
    │       └── Bot Message
    │           └── AnalysisResult
    │               ├── Summary Section
    │               │   └── Text
    │               │
    │               └── Tabs
    │                   ├── Chart Tab
    │                   │   └── PriceChart
    │                   │       └── Line Chart (Chart.js)
    │                   │
    │                   └── Table Tab
    │                       ├── Download Button
    │                       └── Data Table
    │
    └── Input Form
        ├── Text Input
        └── Send Button
```

## API Endpoints

### POST /api/upload/

**Request:**
```http
POST /api/upload/ HTTP/1.1
Content-Type: multipart/form-data

file: [binary data]
```

**Response:**
```json
{
  "id": 1,
  "file": "/media/uploads/data.xlsx",
  "uploaded_at": "2024-01-15T10:30:00Z"
}
```

### POST /api/analyze/

**Request:**
```http
POST /api/analyze/ HTTP/1.1
Content-Type: application/json

{
  "query": "Give me analysis of Wakad",
  "file_id": 1
}
```

**Response:**
```json
{
  "summary": "Analysis for Wakad:\n- Average price: ₹6,000,000\n- Price range: ₹5,500,000 - ₹6,500,000\n- Average demand index: 80.0\n- Data spans from 2021 to 2023",
  "chart_data": [
    {
      "area": "Wakad",
      "data": [
        {"year": 2021, "price": 5500000, "demand": 75},
        {"year": 2022, "price": 6000000, "demand": 80},
        {"year": 2023, "price": 6500000, "demand": 85}
      ]
    }
  ],
  "table_data": [
    {
      "area": "Wakad",
      "year": 2021,
      "price": 5500000,
      "demand": 75,
      "size": 1200,
      "type": "Apartment"
    }
  ],
  "areas": ["Wakad"]
}
```

## Database Schema

### UploadedFile Model

```sql
CREATE TABLE api_uploadedfile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file VARCHAR(100) NOT NULL,
    uploaded_at DATETIME NOT NULL
);
```

## Technology Stack Details

### Backend Stack
```
Python 3.11
├── Django 4.2.7
│   ├── djangorestframework 3.14.0
│   └── django-cors-headers 4.3.1
├── pandas 2.1.3
├── openpyxl 3.1.2
└── gunicorn 21.2.0 (production)
```

### Frontend Stack
```
Node.js 16+
├── React 18.2.0
├── react-dom 18.2.0
├── Bootstrap 5.3.2
├── react-bootstrap 2.9.1
├── Chart.js 4.4.0
├── react-chartjs-2 5.2.0
└── axios 1.6.2
```

## Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel/Netlify                        │
│                   (Frontend Hosting)                     │
│  ┌────────────────────────────────────────────────┐    │
│  │  React App (Static Files)                      │    │
│  │  - Optimized build                             │    │
│  │  - CDN distribution                            │    │
│  │  - HTTPS enabled                               │    │
│  └────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ API Calls (HTTPS)
                         │
┌────────────────────────▼────────────────────────────────┐
│                  Render/Heroku                           │
│                 (Backend Hosting)                        │
│  ┌────────────────────────────────────────────────┐    │
│  │  Django App (gunicorn)                         │    │
│  │  - PostgreSQL database                         │    │
│  │  - File storage (S3/Cloudinary)                │    │
│  │  - Environment variables                       │    │
│  │  - HTTPS enabled                               │    │
│  └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

## Security Considerations

1. **CORS Configuration**
   - Whitelist specific origins in production
   - Credentials handling

2. **File Upload Security**
   - File type validation
   - File size limits
   - Virus scanning (recommended)

3. **Input Validation**
   - Query sanitization
   - SQL injection prevention (ORM)
   - XSS prevention (React escaping)

4. **Authentication** (Future)
   - JWT tokens
   - User sessions
   - Rate limiting

## Performance Optimizations

1. **Backend**
   - Efficient pandas operations
   - Database indexing
   - Query optimization
   - Caching (future)

2. **Frontend**
   - Code splitting
   - Lazy loading
   - Memoization
   - Optimized re-renders

3. **Network**
   - Compressed responses
   - CDN for static files
   - HTTP/2
   - Caching headers

## Scalability

### Current Capacity
- Handles files up to 10,000 rows
- Supports multiple concurrent users
- Stateless API design

### Future Scaling
- Add Redis caching
- Implement queue system (Celery)
- Database replication
- Load balancing
- Microservices architecture
