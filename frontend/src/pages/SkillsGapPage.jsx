import { Link } from 'react-router-dom'

function SkillsGapPage({ analysis }) {
  if (!analysis) {
    return (
      <section className="page-shell max-w-4xl">
        <div className="surface-card text-center">
          <h2 className="page-title text-2xl sm:text-3xl">Skills Gap Analysis</h2>
          <p className="page-subtitle mx-auto">No analysis yet. Upload a resume and job description first.</p>
          <Link to="/upload" className="primary-btn mt-6">
            Go to upload
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell">
      <h2 className="page-title text-2xl sm:text-3xl">Skills Gap Analysis</h2>
      <p className="page-subtitle">Compare matched and missing skills to understand where your resume can improve.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="surface-card">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Matched Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(analysis.extracted_skills || []).map((skill) => (
              <span key={skill} className="rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300">
                {skill}
              </span>
            ))}
            {(analysis.extracted_skills || []).length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No matched skills were identified.</p>
            ) : null}
          </div>
        </div>
        <div className="surface-card">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Missing Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(analysis.missing_skills || []).map((skill) => (
              <span key={skill} className="rounded-full border border-rose-200 bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-900/40 dark:text-rose-300">
                {skill}
              </span>
            ))}
            {analysis.missing_skills?.length === 0 ? <p className="text-sm text-slate-500 dark:text-slate-400">No missing skills detected.</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsGapPage
