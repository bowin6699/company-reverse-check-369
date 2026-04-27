import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Building2, 
  Star,
  TrendingUp
} from 'lucide-react'
import { mockCompanies, industries, scales, locations, mockStatistics } from '../data/mockData'
import CompanyCard from '../components/CompanyCard'
import FilterPanel from '../components/FilterPanel'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    industry: '全部',
    scale: '全部',
    location: '全部',
    minRating: 0,
  })

  // 筛选企业
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter(company => {
      // 搜索匹配
      if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // 行业筛选
      if (filters.industry !== '全部' && company.industry !== filters.industry) {
        return false
      }
      // 规模筛选
      if (filters.scale !== '全部' && company.scale !== filters.scale) {
        return false
      }
      // 地点筛选
      if (filters.location !== '全部' && company.location !== filters.location) {
        return false
      }
      // 评分筛选
      if (filters.minRating > 0 && company.avgRating < filters.minRating) {
        return false
      }
      return true
    })
  }, [searchQuery, filters])

  // 排序
  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => b.ratingCount - a.ratingCount)
  }, [filteredCompanies])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-primary-500/5 to-transparent rounded-3xl" />
        <div className="relative py-12 px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              求职前，先<span className="text-primary-600">反背调</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              真实的企业评价，来自真实的求职者。让你在面试前看清企业的真实面貌。
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-6 mt-8"
          >
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockStatistics.totalCompanies}</p>
                  <p className="text-sm text-gray-500">家企业</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockStatistics.totalReviews.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">条评价</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{mockStatistics.pendingReviews}</p>
                  <p className="text-sm text-gray-500">待审核</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索企业名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12 pr-4 py-3 text-base"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-secondary flex items-center gap-2 ${showFilters ? 'bg-primary-50 text-primary-700 border-primary-200' : ''}`}
          >
            <Filter className="w-4 h-4" />
            筛选
          </motion.button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                industries={industries}
                scales={scales}
                locations={locations}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Company List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            企业列表
            <span className="text-sm font-normal text-gray-500 ml-2">
              共 {sortedCompanies.length} 家
            </span>
          </h2>
          <div className="text-sm text-gray-500">
            按评价数量排序
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {sortedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CompanyCard company={company} onClick={() => navigate(`/company/${company.id}`)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">没有找到匹配的企业</p>
              <p className="text-gray-400 text-sm mt-2">尝试调整筛选条件或搜索其他关键词</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Hot Tags Section */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          热门标签
        </h3>
        <div className="flex flex-wrap gap-2">
          {mockStatistics.topTags.map((item, index) => (
            <motion.button
              key={item.tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gray-100 hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-full text-sm transition-colors"
            >
              {item.tag}
              <span className="ml-1 text-xs text-gray-400">{item.count}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  )
}
