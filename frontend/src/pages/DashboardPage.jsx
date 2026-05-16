function DashboardPage({ analysis }) {
  if (!analysis) {
    return <p className="mx-auto max-w-3xl px-4 py-12">Upload a resume to see ATS insights.</p>
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-2xl font-bold">ATS Analysis Dashboard</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">ATS Score</p>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">{analysis.ats_score}%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Similarity</p>
          <p className="mt-2 text-3xl font-bold">{Math.round((analysis.similarity_score || 0) * 100)}%</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Detected Skills</p>
          <p className="mt-2 text-lg font-semibold">{analysis.extracted_skills?.length || 0}</p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-semibold">AI Suggestions</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {(analysis.suggestions || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DashboardPage
