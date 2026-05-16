from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Resume Analyzer"
    api_prefix: str = "/api"
    database_url: str = "sqlite:///./resume_analyzer.db"
    upload_dir: str = str(Path(__file__).resolve().parents[2] / "uploads")
    sentence_model_name: str = "all-MiniLM-L6-v2"
    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
