import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import SkillsGapPage from './pages/SkillsGapPage'
import UploadPage from './pages/UploadPage'

function App() {
  const [analysis, setAnalysis] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-indigo-700">
        Skip to content
      </a>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content" className="pb-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage onAnalysisUpdate={setAnalysis} />} />
          <Route path="/dashboard" element={<DashboardPage analysis={analysis} />} />
          <Route path="/skills-gap" element={<SkillsGapPage analysis={analysis} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
