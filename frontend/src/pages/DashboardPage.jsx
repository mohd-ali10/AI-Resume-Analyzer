import { Link } from 'react-router-dom'

function DashboardPage({ analysis }) {
  if (!analysis) {
    return (
      <section className="page-shell max-w-4xl">
        <div className="surface-card text-center">
          <h2 className="page-title text-2xl sm:text-3xl">ATS Analysis Dashboard</h2>
          <p className="page-subtitle mx-auto">Upload a resume to generate ATS insights and improvement guidance.</p>
          <Link to="/upload" className="primary-btn mt-6">
            Upload resume
          </Link>
        </div>
      </section>
    )
  }

  const similarityScore = Math.round((analysis.similarity_score || 0) * 100)
  const atsScore = analysis.ats_score || 0
  const extractedSkillsCount = analysis.extracted_skills?.length || 0

  return (
    <section className="page-shell">
      <h2 className="page-title text-2xl sm:text-3xl">ATS Analysis Dashboard</h2>
      <p className="page-subtitle">Review score trends, extracted skill coverage, and suggestions to boost your fit.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="surface-card">
          <p className="text-sm text-slate-500 dark:text-slate-400">ATS Score</p>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-300">{atsScore}%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" role="progressbar" aria-label="ATS score" aria-valuemin="0" aria-valuemax="100" aria-valuenow={atsScore}>
            <div className="h-full rounded-full bg-indigo-600 dark:bg-indigo-400" style={{ width: `${atsScore}%` }} />
          </div>
        </div>
        <div className="surface-card">
          <p className="text-sm text-slate-500 dark:text-slate-400">Similarity</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{similarityScore}%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700" role="progressbar" aria-label="Similarity score" aria-valuemin="0" aria-valuemax="100" aria-valuenow={similarityScore}>
            <div className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400" style={{ width: `${similarityScore}%` }} />
          </div>
        </div>
        <div className="surface-card">
          <p className="text-sm text-slate-500 dark:text-slate-400">Detected Skills</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{extractedSkillsCount}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Skills extracted from your uploaded resume.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="surface-card">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">AI Suggestions</h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-200">
            {(analysis.suggestions || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {(analysis.suggestions || []).length === 0 ? (
              <li className="list-none pl-0 text-slate-500 dark:text-slate-400">No suggestions were generated.</li>
            ) : null}
          </ul>
        </article>

        <article className="surface-card">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Extracted Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(analysis.extracted_skills || []).map((skill) => (
              <span key={skill} className="pill">
                {skill}
              </span>
            ))}
            {(analysis.extracted_skills || []).length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No skills were extracted.</p>
            ) : null}
          </div>
        </article>
      </div>

    </section>
  )
}

export default DashboardPage
