import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/upload', label: 'Upload Resume' },
  { to: '/dashboard', label: 'ATS Dashboard' },
  { to: '/skills-gap', label: 'Skills Gap' },
]

function NavBar({ darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="rounded-lg text-base font-bold text-indigo-700 transition hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200">
          AI Resume Analyzer
        </Link>
        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-pressed={darkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
