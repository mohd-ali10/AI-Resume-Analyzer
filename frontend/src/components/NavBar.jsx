import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload Resume' },
  { to: '/dashboard', label: 'ATS Dashboard' },
  { to: '/skills-gap', label: 'Skills Gap' },
]

function NavBar({ darkMode, setDarkMode }) {
  return (
    <header className="border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-bold text-indigo-600 dark:text-indigo-400">
          AI Resume Analyzer
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-1.5 text-sm ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
