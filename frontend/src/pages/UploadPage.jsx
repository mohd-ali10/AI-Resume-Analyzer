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
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h2 className="text-2xl font-bold">Resume Upload</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full rounded-lg border border-slate-300 bg-white p-2 dark:border-slate-700 dark:bg-slate-900"
        />
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          placeholder="Paste job description here..."
          className="w-full rounded-lg border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </form>
      {error ? <p className="mt-4 text-red-500">{error}</p> : null}
    </section>
  )
}

export default UploadPage
