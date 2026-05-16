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
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
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
