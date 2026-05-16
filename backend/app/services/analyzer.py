from functools import lru_cache

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from .resume_parser import extract_skills

try:
    from sentence_transformers import SentenceTransformer
except Exception:  # pragma: no cover
    SentenceTransformer = None


@lru_cache(maxsize=1)
def get_sentence_model():
    if SentenceTransformer is None:
        return None
    try:
        return SentenceTransformer("all-MiniLM-L6-v2")
    except Exception:
        return None


def compute_similarity(resume_text: str, job_description: str) -> float:
    model = get_sentence_model()
    if model is not None:
        embeddings = model.encode([resume_text, job_description])
        return float(cosine_similarity([embeddings[0]], [embeddings[1]])[0][0])

    vectorizer = TfidfVectorizer(stop_words="english")
    matrix = vectorizer.fit_transform([resume_text, job_description])
    return float(cosine_similarity(matrix[0:1], matrix[1:2])[0][0])


def analyze_resume_match(resume_text: str, job_description: str) -> dict:
    resume_skills = set(extract_skills(resume_text))
    jd_skills = set(extract_skills(job_description))

    matched_skills = sorted(resume_skills & jd_skills)
    missing_skills = sorted(jd_skills - resume_skills)

    similarity_score = compute_similarity(resume_text, job_description)

    # Weighted ATS score: similarity (70%) + skill match ratio (30%)
    skill_ratio = len(matched_skills) / len(jd_skills) if jd_skills else 1.0
    ats_score = round(((similarity_score * 0.7) + (skill_ratio * 0.3)) * 100, 2)

    suggestions = (
        [
            f"Add project or experience details for: {', '.join(missing_skills[:5])}.",
            "Align your summary with measurable impact and role-specific keywords.",
        ]
        if missing_skills
        else [
            "Great skill alignment. Add quantifiable achievements to strengthen your profile.",
        ]
    )

    return {
        "ats_score": max(0.0, min(100.0, ats_score)),
        "similarity_score": round(similarity_score, 4),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }
