from pathlib import Path

import fitz


SKILL_KEYWORDS = {
    "python",
    "java",
    "javascript",
    "typescript",
    "react",
    "fastapi",
    "django",
    "flask",
    "sql",
    "postgresql",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "machine learning",
    "nlp",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "git",
    "ci/cd",
    "tailwind",
}


def extract_text_from_pdf(file_path: Path) -> str:
    doc = fitz.open(file_path)
    text = "\n".join(page.get_text("text") for page in doc)
    doc.close()
    return text.strip()


def extract_skills(text: str) -> list[str]:
    lower_text = text.lower()
    return sorted([skill for skill in SKILL_KEYWORDS if skill in lower_text])
