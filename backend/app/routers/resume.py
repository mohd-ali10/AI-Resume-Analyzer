from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..models import ResumeAnalysis
from ..schemas import (
    ATSScoreRequest,
    ATSScoreResponse,
    MatchRequest,
    MatchResponse,
    ParseResumeResponse,
    ResumeRecord,
)
from ..services.analyzer import analyze_resume_match
from ..services.resume_parser import extract_skills, extract_text_from_pdf

router = APIRouter(prefix="/resumes", tags=["resumes"])


@router.post("/parse", response_model=ParseResumeResponse)
async def parse_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    upload_path = Path(settings.upload_dir)
    upload_path.mkdir(parents=True, exist_ok=True)
    file_path = upload_path / f"{uuid4()}-{file.filename}"
    file_path.write_bytes(await file.read())

    resume_text = extract_text_from_pdf(file_path)
    if not resume_text:
        raise HTTPException(status_code=400, detail="Unable to extract text from resume")

    skills = extract_skills(resume_text)
    record = ResumeAnalysis(
        filename=file.filename,
        file_path=str(file_path),
        resume_text=resume_text,
        extracted_skills=skills,
        missing_skills=[],
        suggestions=[],
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return ParseResumeResponse(
        resume_id=record.id,
        filename=record.filename,
        resume_text=record.resume_text,
        extracted_skills=record.extracted_skills,
    )


@router.post("/{resume_id}/match", response_model=MatchResponse)
def match_resume(resume_id: int, payload: MatchRequest, db: Session = Depends(get_db)):
    record = db.query(ResumeAnalysis).filter(ResumeAnalysis.id == resume_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Resume not found")

    result = analyze_resume_match(record.resume_text, payload.job_description)

    record.job_description = payload.job_description
    record.ats_score = result["ats_score"]
    record.similarity_score = result["similarity_score"]
    record.missing_skills = result["missing_skills"]
    record.suggestions = result["suggestions"]
    db.commit()

    return MatchResponse(resume_id=resume_id, **{k: result[k] for k in ["ats_score", "similarity_score", "missing_skills", "suggestions"]})


@router.post("/ats-score", response_model=ATSScoreResponse)
def ats_score(payload: ATSScoreRequest):
    result = analyze_resume_match(payload.resume_text, payload.job_description)
    return ATSScoreResponse(**result)


@router.get("", response_model=list[ResumeRecord])
def list_analyses(db: Session = Depends(get_db)):
    return db.query(ResumeAnalysis).order_by(ResumeAnalysis.created_at.desc()).all()


@router.get("/{resume_id}", response_model=ResumeRecord)
def get_analysis(resume_id: int, db: Session = Depends(get_db)):
    record = db.query(ResumeAnalysis).filter(ResumeAnalysis.id == resume_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Resume not found")
    return record
