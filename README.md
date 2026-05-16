# AI Resume Analyzer

Full-stack application for analyzing resumes and measuring alignment with job descriptions. The backend is built with **FastAPI** and the frontend is a **React + Tailwind CSS** single-page app.

**Repository layout**: [backend](backend) (FastAPI) and [frontend](frontend) (React + Vite).

**What it does**:
- **Parse** PDF resumes and extract plain text using PyMuPDF.
- **Extract skills** using a keyword set with optional NLP enhancements.
- **Compare** resume text against a job description using semantic similarity (Sentence-Transformers fallback to TF-IDF).
- **Compute an ATS score**, similarity score, matched/missing skills, and suggestions.
- **Persist analysis** records via SQLAlchemy (default: SQLite; can use PostgreSQL).

**Status**: Development-ready. Use this README to run locally, run tests, and troubleshoot common issues.

**Important files**:
- [backend/app/main.py](backend/app/main.py) - FastAPI application entrypoint
- [backend/app/routers/resume.py](backend/app/routers/resume.py) - Upload / analysis routes
- [backend/requirements.txt](backend/requirements.txt) - Python dependencies
- [frontend/src/pages/UploadPage.jsx](frontend/src/pages/UploadPage.jsx) - Upload UI and client flow

**Full project structure**

```text
AI-Resume-Analyzer/
├── README.md
├── backend/
│   ├── requirements.txt
│   ├── .env.example
│   ├── app/
│   │   ├── __init__.py
+│   │   ├── main.py
   │   ├── config.py
   │   ├── database.py
   │   ├── models.py
   │   ├── schemas.py
   │   ├── routers/
   │   │   ├── __init__.py
   │   │   └── resume.py
   │   └── services/
   │       ├── __init__.py
   │       ├── analyzer.py
   │       └── resume_parser.py
   └── tests/
     └── test_analyzer.py
├── frontend/
│   ├── package.json
│   ├── README.md
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
   ├── postcss.config.js
   ├── eslint.config.js
   ├── public/
   └── src/
     ├── main.jsx
     ├── App.jsx
     ├── index.css
     ├── api/
     │   └── client.js
     ├── components/
     │   └── NavBar.jsx
     └── pages/
       ├── HomePage.jsx
       ├── DashboardPage.jsx
       ├── SkillsGapPage.jsx
       └── UploadPage.jsx
```

**Table of contents**
- **Prerequisites**
- **Local setup (backend)**
- **Local setup (frontend)**
- **API reference & examples**
- **Testing**
- **Troubleshooting**
- **Deployment notes**
- **Contributing & License**

**Prerequisites**
- **Python 3.11+** and `venv` available locally.
- **Node.js 18+** and `npm` (or pnpm/yarn) for the frontend.
- Optional GPU / model artifacts for sentence-transformers (otherwise TF-IDF is used).

**Local setup — Backend**

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Create and activate a Python virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Copy example environment file and adjust values if needed:

```bash
cp .env.example .env
# edit backend/.env to set DATABASE_URL, CORS_ORIGINS, UPLOAD_DIR etc.
```

5. Run the development server:

```bash
/path/to/your/project/.venv/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

By default the API base is available at `http://localhost:8000/api`.

**Local setup — Frontend**

1. From the project root, install frontend deps and start Vite:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev -- --host
```

2. The dev server runs on `http://localhost:5173`. The frontend uses `VITE_API_BASE_URL` (default `http://localhost:8000/api`) to call the backend.

**API Reference & Examples**

All backend endpoints are mounted under the API prefix defined in `backend/app/config.py` (default: `/api`). Key endpoints:

- `POST /api/resumes/parse` — Accepts `multipart/form-data` with a `file` field (PDF). Returns `resume_id`, `filename`, `resume_text`, and `extracted_skills`.
- `POST /api/resumes/{resume_id}/match` — JSON body: `{ "job_description": "..." }`. Returns ATS score, similarity score, matched/missing skills, and suggestions.
- `POST /api/resumes/ats-score` — JSON body: `{ "resume_text": "...", "job_description": "..." }` returns the same scoring payload without persistence.
- `GET /api/resumes` — List saved analyses.
- `GET /api/resumes/{resume_id}` — Fetch a single analysis record.

Curl example — parse a PDF:

```bash
curl -v -F "file=@/path/to/your_resume.pdf" http://localhost:8000/api/resumes/parse
```

Curl example — match after parse (replace <id> with resume_id):

```bash
curl -v -H "Content-Type: application/json" -d '{"job_description":"Paste job description here"}' http://localhost:8000/api/resumes/<id>/match
```

Example response (parse):

```json
{
  "resume_id": 1,
  "filename": "test_resume.pdf",
  "resume_text": "...",
  "extracted_skills": ["python","fastapi"]
}
```

Example response (match):

```json
{
  "ats_score": 82.35,
  "similarity_score": 0.7432,
  "matched_skills": ["python"],
  "missing_skills": ["docker","sql"],
  "suggestions": ["Add project or experience details for: docker, sql.", "Align your summary ..."]
}
```

**Database**
- The project defaults to SQLite using `database_url` in `backend/app/config.py`.
- For production use, set `DATABASE_URL` to a PostgreSQL-compatible connection string. The SQLAlchemy models will work with Postgres.

**Testing**

Backend unit tests (pytest):

```bash
cd backend
source .venv/bin/activate
pytest -q
```

Frontend lint/build:

```bash
cd frontend
npm run lint
npm run build
```

**Troubleshooting — Upload or analysis failed**
- Symptom: Frontend shows `Upload or analysis failed.` or `Unable to extract text from resume`.
- Quick checklist:
  - **Server running**: Ensure the backend is active on port `8000`. If you started Uvicorn in a different terminal, confirm with `ss -ltnp | grep 8000`.
  - **CORS**: Confirm `CORS_ORIGINS` in [backend/app/config.py](backend/app/config.py) or `backend/.env` includes your frontend origin (e.g. `http://localhost:5173`).
  - **File type**: Only PDF is accepted by the parser endpoint.
  - **Permissions**: Ensure `UPLOAD_DIR` (defaults to `uploads/` in repo root) is writable by the process.
  - **Model availability**: If sentence-transformers fails to load, the analyzer falls back to TF-IDF. Missing model will not break endpoint but may affect similarity quality.
  - **Check logs**: Watch Uvicorn logs where you started the backend. Reproduce the error and inspect the traceback.

If you want me to inspect logs, tell me when the error happens and I will tail the backend output and reproduce the request.

**Deployment notes**
- Production recommendation:
  - Use a process manager (systemd, supervisord) or containerize with Docker.
  - Use PostgreSQL for concurrency and persistence.
  - Serve static frontend assets from a CDN or host and point `VITE_API_BASE_URL` to the API gateway.
  - Use HTTPS and proper secret management for `DATABASE_URL` and any keys.

**Contributing**
- Fork and create a feature branch. Run tests before opening a PR. Keep changes focused and add tests for new behavior.

**License**
- Check repository root for license file. If none exists, add a `LICENSE` to declare terms.
