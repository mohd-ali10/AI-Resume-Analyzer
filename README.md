# 🤖 AI Resume Analyzer

> **Full-stack intelligent resume analysis platform** — Parse resumes, extract skills, and measure alignment with job descriptions using NLP and semantic similarity.

[![Python](https://img.shields.io/badge/Python-3.11+-blue?logo=python)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **PDF Parsing** | Extract clean text from resumes using PyMuPDF with fallback error handling |
| 🎯 **Skill Extraction** | Keyword-based extraction with optional NLP enhancement (spaCy/NER ready) |
| 🔍 **Semantic Matching** | Compare resumes to job descriptions using Sentence-Transformers (fallback: TF-IDF) |
| 📊 **ATS Scoring** | Generate compatibility scores, matched/missing skills, and actionable suggestions |
| 💾 **Persistent Storage** | SQLAlchemy ORM with SQLite (dev) / PostgreSQL (prod) support |
| 🎨 **Modern UI** | Responsive React + Tailwind CSS frontend with real-time feedback |
| 🔒 **CORS & Config** | Environment-based configuration for secure local & production deployments |

---

## 🗂️ Project Structure

```
AI-Resume-Analyzer/
├── README.md
├── LICENSE
├── .gitignore
├── docker-compose.yml          # [Optional] Container orchestration
│
├── backend/
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   ├── pyproject.toml         # [Optional] Poetry config
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI entrypoint
│   │   ├── config.py          # Settings & env management
│   │   ├── database.py        # SQLAlchemy engine & session
│   │   ├── models.py          # Database schemas
│   │   ├── schemas.py         # Pydantic models
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   └── resume.py      # Resume API endpoints
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── analyzer.py    # Scoring & matching logic
│   │       └── resume_parser.py # PDF parsing & skill extraction
│   └── tests/
│       ├── __init__.py
│       ├── conftest.py        # Pytest fixtures
│       └── test_analyzer.py   # Unit & integration tests
│
└── frontend/
    ├── package.json
    ├── .env.example
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── eslint.config.js
    ├── index.html
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/
        │   └── client.js      # Axios instance & API wrappers
        ├── components/
        │   ├── NavBar.jsx
        │   ├── ResumeUpload.jsx
        │   ├── ScoreCard.jsx
        │   └── SkillsGapChart.jsx
        └── pages/
            ├── HomePage.jsx
            ├── DashboardPage.jsx
            ├── SkillsGapPage.jsx
            └── UploadPage.jsx
```

---

## 🚀 Quick Start

### Prerequisites

| Dependency | Version | Install |
|------------|---------|---------|
| Python | 3.11+ | [python.org](https://www.python.org/downloads/) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| pip | 23.0+ | Bundled with Python |
| npm | 9+ | Bundled with Node.js |

> 💡 **Optional**: GPU support for faster sentence-transformers inference. Install `torch` with CUDA if available.

---

### 🔧 Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your settings:
#   DATABASE_URL=sqlite:///./resume_analyzer.db
#   CORS_ORIGINS=["http://localhost:5173"]
#   UPLOAD_DIR=./uploads
#   MODEL_NAME=all-MiniLM-L6-v2  # or use 'tfidf' for lightweight mode

# Run database migrations (if using Alembic)
# alembic upgrade head

# Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend API available at: **http://localhost:8000**  
✅ Interactive docs: **http://localhost:8000/docs** (Swagger UI)

---

### 🎨 Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Ensure VITE_API_BASE_URL=http://localhost:8000/api

# Start development server
npm run dev -- --host
```

✅ Frontend available at: **http://localhost:5173**

---

## 🌐 API Reference

All endpoints are prefixed with `/api` (configurable via `API_PREFIX` in `config.py`).

### 🔹 Resume Parsing

**`POST /api/resumes/parse`**  
*Parse a PDF resume and extract text + skills*

```bash
curl -X POST http://localhost:8000/api/resumes/parse \
  -F "file=@/path/to/resume.pdf" \
  -v
```

**Response:**
```json
{
  "resume_id": 42,
  "filename": "john_doe_resume.pdf",
  "resume_text": "Experienced software engineer with expertise in Python...",
  "extracted_skills": ["python", "fastapi", "sql", "docker"],
  "parsed_at": "2024-06-15T10:30:00Z"
}
```

---

### 🔹 Job Match Analysis

**`POST /api/resumes/{resume_id}/match`**  
*Compare a parsed resume against a job description*

```bash
curl -X POST http://localhost:8000/api/resumes/42/match \
  -H "Content-Type: application/json" \
  -d '{
    "job_description": "We seek a Python developer with FastAPI, Docker, and SQL experience..."
  }'
```

**Response:**
```json
{
  "ats_score": 87.5,
  "similarity_score": 0.812,
  "matched_skills": ["python", "fastapi", "sql"],
  "missing_skills": ["kubernetes", "ci/cd"],
  "suggestions": [
    "Consider adding experience with Kubernetes or container orchestration.",
    "Highlight any CI/CD pipeline work in your projects section."
  ],
  "analysis_id": 101
}
```

---

### 🔹 Direct Text Analysis (No Persistence)

**`POST /api/resumes/ats-score`**  
*Quick analysis without saving to database*

```json
{
  "resume_text": "Your resume content here...",
  "job_description": "Target job description here..."
}
```

→ Returns same scoring payload as `/match` endpoint.

---

### 🔹 Retrieve Analyses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/resumes` | List all saved analyses (paginated) |
| `GET` | `/api/resumes/{id}` | Fetch single analysis by ID |
| `DELETE` | `/api/resumes/{id}` | Remove an analysis record |

---

## ⚙️ Configuration

### Backend Environment Variables (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./resume_analyzer.db` | SQLAlchemy connection string |
| `CORS_ORIGINS` | `["http://localhost:5173"]` | Allowed frontend origins |
| `UPLOAD_DIR` | `./uploads` | Directory for temporary PDF storage |
| `API_PREFIX` | `/api` | Base path for all API routes |
| `MODEL_NAME` | `all-MiniLM-L6-v2` | Sentence transformer model (or `tfidf`) |
| `MAX_FILE_SIZE_MB` | `10` | Maximum allowed PDF upload size |
| `LOG_LEVEL` | `INFO` | Python logging level |

### Frontend Environment Variables (`frontend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api` | Backend API endpoint |
| `VITE_APP_NAME` | `AI Resume Analyzer` | App title in UI |
| `VITE_ENABLE_ANALYTICS` | `false` | Toggle usage telemetry |

---

## 🧪 Testing

### Backend Tests (pytest)

```bash
cd backend
source .venv/bin/activate

# Run all tests with coverage
pytest -q --cov=app --cov-report=term-missing

# Run specific test file
pytest tests/test_analyzer.py -v

# Run with mock LLM/NLP disabled for speed
pytest -m "not slow"
```

### Frontend Tests & Linting

```bash
cd frontend

# Lint code
npm run lint

# Type check (if using TypeScript)
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🐳 Docker Deployment (Optional)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access services:
#   Frontend: http://localhost:5173
#   Backend API: http://localhost:8000
#   PostgreSQL (if enabled): localhost:5432
```

**Sample `docker-compose.yml` snippet:**
```yaml
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/resumes
    depends_on: [db]

  frontend:
    build: ./frontend
    ports: ["5173:5173"]
    environment:
      - VITE_API_BASE_URL=http://localhost:8000/api

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: resumes
    volumes: [postgres_data:/var/lib/postgresql/data]

volumes:
  postgres_data:
```

---

## 🛠️ Troubleshooting

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| ❌ Upload fails / 400 error | File not PDF or too large | Ensure `.pdf` extension and `<10MB` |
| ❌ CORS error in browser | Backend CORS not configured | Add frontend URL to `CORS_ORIGINS` in `.env` |
| ❌ "Unable to extract text" | Corrupted PDF or PyMuPDF issue | Try re-saving PDF; check backend logs |
| ❌ Slow similarity scoring | Large model loading on CPU | Use `MODEL_NAME=tfidf` or enable GPU |
| ❌ Database connection error | SQLite lock / PostgreSQL down | Check `DATABASE_URL`; ensure DB is running |
| ❌ Frontend can't reach API | Wrong `VITE_API_BASE_URL` | Verify frontend env matches backend host/port |

🔍 **Debug Tip**: Watch backend logs in real-time:
```bash
# In backend terminal
tail -f uvicorn.log  # or observe console output during dev
```

---

## 🚢 Production Deployment Checklist

- [ ] Set `DEBUG=False` and configure proper logging
- [ ] Use PostgreSQL with connection pooling for concurrency
- [ ] Serve frontend via Nginx/Vercel/Netlify with HTTPS
- [ ] Set `CORS_ORIGINS` to your production domain only
- [ ] Use a process manager: `gunicorn + uvicorn workers` or Docker
- [ ] Store secrets in environment variables or secret manager
- [ ] Enable health checks: `GET /api/health`
- [ ] Set up monitoring (Prometheus/Grafana) and alerting
- [ ] Run `npm run build` and serve static assets with cache headers

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create a feature branch**: `git checkout -b feat/your-feature`
3. **Make changes** with clear, atomic commits (use [Conventional Commits](https://www.conventionalcommits.org/))
4. **Add tests** for new functionality
5. **Run checks**:
   ```bash
   # Backend
   pytest && black . && flake8
   
   # Frontend
   npm run lint && npm run build
   ```
6. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI updates
   - Test results

### Good First Issues
Look for tickets labeled [`good-first-issue`](https://github.com/your-repo/issues?q=label%3Agood-first-issue) to get started.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

```
MIT License

Copyright (c) 2024 Muhammad Ali

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
...
```

---

## 🙏 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com) – High-performance API framework
- [Sentence-Transformers](https://www.sbert.net) – Semantic text embeddings
- [PyMuPDF](https://pymupdf.readthedocs.io) – Robust PDF parsing
- [Tailwind CSS](https://tailwindcss.com) – Utility-first styling
- [Vite](https://vitejs.dev) – Next-gen frontend tooling

---

> 💡 **Pro Tip**: For best ATS matching results, ensure resumes use standard section headers (Experience, Education, Skills) and avoid complex layouts or images.

**Built with ❤️ by Muhammad Ali**  
📧 aliskdse@gmail.com | 🔗 [LinkedIn](https://linkedin.com/in/mohdali1) | 💻 [GitHub](https://github.com/mohd-ali10)
