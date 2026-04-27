import { Routes, Route, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Search, 
  BarChart3, 
  PenTool, 
  Shield,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import Home from './pages/Home'
import CompanyDetail from './pages/CompanyDetail'
import SubmitReview from './pages/SubmitReview'
import AdminDashboard from './pages/AdminDashboard'
import DataAnalytics from './pages/DataAnalytics'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: '首页', icon: Building2 },
    { to: '/analytics', label: '数据分析', icon: BarChart3 },
    { to: '/submit', label: '提交评价', icon: PenTool },
    { to: '/admin', label: '后台管理', icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30"
              >
                <Search className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  求职者反背调调查网
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">求职者的企业情报站</p>
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-100 bg-white"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company/:id" element={<CompanyDetail />} />
          <Route path="/submit" element={<SubmitReview />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/analytics" element={<DataAnalytics />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 求职者反背调调查网 · 让求职者看清企业真实面貌
              </p>
              <p className="text-gray-400 text-xs mt-1">
                所有评价均经过人工审核，保护用户隐私
              </p>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-600 transition-colors">关于我们</a>
              <a href="#" className="hover:text-primary-600 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-primary-600 transition-colors">用户协议</a>
              <a href="#" className="hover:text-primary-600 transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
