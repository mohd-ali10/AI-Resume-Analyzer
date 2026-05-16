function HomePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        AI-Powered Resume Analyzer
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-300">
        Upload your resume, compare it against any job description, and receive ATS score,
        missing skill insights, and actionable suggestions.
      </p>
      <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
        {[
          'PDF resume parsing with PyMuPDF',
          'NLP semantic matching with open-source models',
          'Skills gap dashboard with improvement tips',
        ].map((item) => (
          <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePage
