import { Link } from 'react-router-dom'

function HomePage() {
  const highlights = [
    'PDF resume parsing with PyMuPDF',
    'NLP semantic matching with open-source models',
    'Skills gap dashboard with improvement tips',
  ]

  return (
    <section className="page-shell">
      <div className="surface-card overflow-hidden p-7 sm:p-10">
        <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          AI career tooling
        </p>
        <h1 className="page-title mt-4">AI-Powered Resume Analyzer</h1>
        <p className="page-subtitle">
          Upload your resume, compare it against any job description, and receive ATS score,
          missing skill insights, and actionable suggestions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/upload" className="primary-btn">
            Start analysis
          </Link>
          <Link to="/dashboard" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            View dashboard
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item} className="surface-card h-full">
            <p className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">{item}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
