import { useState } from 'react'
import api from '../api/client'

function UploadPage({ onAnalysisUpdate }) {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!file) {
      setError('Please select a PDF resume file.')
      return
    }

    try {
      setLoading(true)
      setError('')
      const formData = new FormData()
      formData.append('file', file)

      const parseRes = await api.post('/resumes/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const matchRes = await api.post(`/resumes/${parseRes.data.resume_id}/match`, {
        job_description: jobDescription,
      })

      onAnalysisUpdate({ ...parseRes.data, ...matchRes.data })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Upload or analysis failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-shell max-w-4xl">
      <div className="surface-card">
        <h2 className="page-title text-2xl sm:text-3xl">Resume Upload</h2>
        <p className="page-subtitle mt-1">
          Add your PDF resume and target role description to receive ATS scoring, skills matching,
          and tailored suggestions.
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="resume-file" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Resume file (PDF)
            </label>
            <input
              id="resume-file"
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="input-field file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200 dark:file:bg-slate-800 dark:file:text-slate-200 dark:hover:file:bg-slate-700"
              aria-describedby="resume-file-hint"
            />
            <p id="resume-file-hint" className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Only PDF files are supported.
            </p>
          </div>

          <div>
            <label htmlFor="job-description" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Job description
            </label>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              placeholder="Paste job description here..."
              className="textarea-field"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="primary-btn">
            {loading ? 'Analyzing...' : 'Upload & Analyze'}
          </button>
        </form>

        {error ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default UploadPage
