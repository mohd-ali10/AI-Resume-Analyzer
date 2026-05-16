function SkillsGapPage({ analysis }) {
  if (!analysis) {
    return <p className="mx-auto max-w-3xl px-4 py-12">No analysis yet. Upload a resume first.</p>
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="text-2xl font-bold">Skills Gap Analysis</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold">Matched Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(analysis.extracted_skills || []).map((skill) => (
              <span key={skill} className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold">Missing Skills</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {(analysis.missing_skills || []).map((skill) => (
              <span key={skill} className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                {skill}
              </span>
            ))}
            {analysis.missing_skills?.length === 0 ? <p className="text-sm text-slate-500">No missing skills detected.</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsGapPage
