# AI Resume Analyzer

Full-stack AI Resume Analyzer built with **FastAPI** (backend) and **React + Tailwind CSS** (frontend).

## Features

- Upload and parse resume PDF files (PyMuPDF)
- Extract resume skills using keyword + NLP-driven analysis
- Compare resume against job descriptions
- Calculate ATS match score and semantic similarity
- Show missing skills and improvement suggestions
- ATS dashboard and skills-gap pages
- Store uploaded resume metadata and analysis results (SQLAlchemy + PostgreSQL-compatible)
- Environment-variable based configuration
- Dark mode UI

## Project Structure

```text
AI-Resume-Analyzer/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── pages/
│   ├── package.json
│   └── .env.example
└── README.md
```

## Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend runs at `http://localhost:8000`.

### Backend API Endpoints

- `POST /api/resumes/parse` – upload and parse resume PDF
- `POST /api/resumes/{resume_id}/match` – match stored resume with job description
- `POST /api/resumes/ats-score` – ATS/similarity scoring for raw text payloads
- `GET /api/resumes` – list stored analysis records
- `GET /api/resumes/{resume_id}` – fetch one analysis record

## Frontend Setup (React + Tailwind)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Environment Variables

### Backend (`backend/.env`)

- `DATABASE_URL` (PostgreSQL/Supabase connection string; default local SQLite fallback)
- `CORS_ORIGINS` (comma-separated origins)
- `UPLOAD_DIR`
- `SENTENCE_MODEL_NAME`

### Frontend (`frontend/.env`)

- `VITE_API_BASE_URL` (default `http://localhost:8000/api`)

## Testing

Run backend targeted tests:

```bash
cd backend
pytest -q
```

Build and lint frontend:

```bash
cd frontend
npm run lint
npm run build
```
