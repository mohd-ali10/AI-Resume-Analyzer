from datetime import datetime

from pydantic import BaseModel, Field


class ParseResumeResponse(BaseModel):
    resume_id: int
    filename: str
    resume_text: str
    extracted_skills: list[str]


class MatchRequest(BaseModel):
    job_description: str = Field(min_length=20)


class MatchResponse(BaseModel):
    resume_id: int
    ats_score: float
    similarity_score: float
    missing_skills: list[str]
    suggestions: list[str]


class ATSScoreRequest(BaseModel):
    resume_text: str = Field(min_length=20)
    job_description: str = Field(min_length=20)


class ATSScoreResponse(BaseModel):
    ats_score: float
    similarity_score: float
    matched_skills: list[str]
    missing_skills: list[str]
    suggestions: list[str]


class ResumeRecord(BaseModel):
    id: int
    filename: str
    extracted_skills: list[str]
    ats_score: float | None
    similarity_score: float | None
    missing_skills: list[str]
    suggestions: list[str]
    created_at: datetime

    class Config:
        from_attributes = True
