from app.services.analyzer import analyze_resume_match


def test_analyze_resume_match_returns_expected_shape():
    resume = "Python FastAPI React SQL Docker machine learning"
    jd = "We need Python, React, PostgreSQL, and Docker for backend APIs"

    result = analyze_resume_match(resume, jd)

    assert 0 <= result["ats_score"] <= 100
    assert 0 <= result["similarity_score"] <= 1
    assert "python" in result["matched_skills"]
    assert "postgresql" in result["missing_skills"]
    assert result["suggestions"]


def test_analyze_resume_match_handles_no_skill_keywords():
    result = analyze_resume_match(
        "Experienced professional with communication skills",
        "Looking for an adaptable collaborator",
    )

    assert 0 <= result["ats_score"] <= 100
    assert isinstance(result["missing_skills"], list)
