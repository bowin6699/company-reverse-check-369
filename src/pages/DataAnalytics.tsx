import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  Star,
  BarChart3
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { mockStatistics, mockCompanies } from '../data/mockData'

export default function DataAnalytics() {
  // 行业分布颜色
  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  // 薪资分布数据
  const salaryData = mockStatistics.salaryDistribution

  // 趋势数据
  const trendData = mockStatistics.recentTrends

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">数据分析</h1>
        <span className="text-sm text-gray-500">更新时间：2024-12-01</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">企业总数</span>
            <Building2 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockStatistics.totalCompanies}</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            +12 本周
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">评价总数</span>
            <Star className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockStatistics.totalReviews.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            +456 本周
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">待审核</span>
            <Users className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{mockStatistics.pendingReviews}</p>
          <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
            <TrendingDown className="w-4 h-4" />
            -8 本周
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">平均评分</span>
            <BarChart3 className="w-5 h-5 text-primary-400" />
          </div>
          <p className="text-3xl font-bold text-primary-600">3.7</p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            +0.1 本周
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-8">
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">评价趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="reviews"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#colorReviews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Industry Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">行业分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPie>
              <Pie
                data={mockStatistics.industryStats.filter(s => s.count > 0)}
                dataKey="count"
                nameKey="industry"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ industry, percent }) => `${industry} ${(percent * 100).toFixed(0)}%`}
              >
                {mockStatistics.industryStats.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </RechartsPie>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-8">
        {/* Salary Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">薪资区间分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="range" type="category" width={80} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: 'none', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="count" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Companies by Rating */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <h3 className="font-semibold text-gray-900 mb-4">评分排行</h3>
          <div className="space-y-4">
            {mockCompanies
              .sort((a, b) => b.avgRating - a.avgRating)
              .slice(0, 5)
              .map((company, index) => (
                <div key={company.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{company.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className={`w-4 h-4 ${
                      company.avgRating >= 4 ? 'text-green-500 fill-green-500' :
                      company.avgRating >= 3 ? 'text-yellow-500 fill-yellow-500' :
                      'text-red-500 fill-red-500'
                    }`} />
                    <span className={`font-semibold ${
                      company.avgRating >= 4 ? 'text-green-600' :
                      company.avgRating >= 3 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {company.avgRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Hot Tags Cloud */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h3 className="font-semibold text-gray-900 mb-6">热门标签云</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {mockStatistics.topTags.map((item, index) => {
            const size = Math.max(14, Math.min(28, 14 + item.count / 50))
            const isPositive = ['福利好', '氛围好', '成长快', '技术强', '薪资高', '稳定', '扁平化', '发展稳定', '氛围轻松', '年轻化'].includes(item.tag)
            return (
              <motion.button
                key={item.tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  isPositive 
                    ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
                style={{ fontSize: `${size}px` }}
              >
                {item.tag}
                <span className="ml-1 opacity-60">{item.count}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
