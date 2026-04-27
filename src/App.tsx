import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes, Route, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Search, 
  BarChart3, 
  PenTool, 
  Shield,
  Menu,
  X,
  LogOut
} from 'lucide-react'
import Home from './pages/Home'
import CompanyDetail from './pages/CompanyDetail'
import SubmitReview from './pages/SubmitReview'
import AdminDashboard from './pages/AdminDashboard'
import DataAnalytics from './pages/DataAnalytics'
import Login from './pages/Login'


function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // 检查登录状态
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('loginTime')
    setIsLoggedIn(false)
    navigate('/')
  }

  const handleAdminClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      navigate('/login')
    }
  }

  const navItems = [
    { to: '/', label: '首页', icon: Building2 },
    { to: '/analytics', label: '数据分析', icon: BarChart3 },
    { to: '/submit', label: '提交评价', icon: PenTool },
    { to: isLoggedIn ? '/admin' : '/login', label: '后台管理', icon: Shield, protected: true },
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
              {navItems.map(({ to, label, icon: Icon, protected: isProtected }) => (
                <div key={to} className="relative group">
                  <NavLink
                    to={to}
                    onClick={isProtected ? handleAdminClick : undefined}
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
                    {isProtected && isLoggedIn && (
                      <span className="w-2 h-2 bg-green-500 rounded-full" title="已登录" />
                    )}
                  </NavLink>
                  {!isLoggedIn && isProtected && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      需要登录 🔒
                    </span>
                  )}
                </div>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all ml-2"
                  title="退出登录"
                >
                  <LogOut className="w-4 h-4" />
                  退出
                </button>
              )}
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
              {navItems.map(({ to, label, icon: Icon, protected: isProtected }) => (
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
                  {isProtected && !isLoggedIn && <span className="text-xs text-gray-400">🔒</span>}
                </NavLink>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              )}
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
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            isLoggedIn ? <AdminDashboard /> : <Login />
          } />
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
                所有评价均经过人工审核，保护用户隐私 · 已收录 {8} 家企业 · {9833}+ 条真实评价
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
