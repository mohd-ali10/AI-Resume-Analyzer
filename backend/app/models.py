from datetime import datetime

from sqlalchemy import DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import JSON

from .database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analyses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    resume_text: Mapped[str] = mapped_column(Text, nullable=False)
    extracted_skills: Mapped[list[str]] = mapped_column(JSON, default=list)
    job_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    ats_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    similarity_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    missing_skills: Mapped[list[str]] = mapped_column(JSON, default=list)
    suggestions: Mapped[list[str]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
