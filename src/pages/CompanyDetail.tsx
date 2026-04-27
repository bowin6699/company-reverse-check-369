import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Users,
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Clock,
  FileText
} from 'lucide-react'
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts'
import { mockCompanies, mockReviews } from '../data/mockData'

export default function CompanyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const company = mockCompanies.find(c => c.id === id)
  const reviews = mockReviews.filter(r => r.companyId === id && r.status === 'approved')

  if (!company) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">企业不存在</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          返回首页
        </button>
      </div>
    )
  }

  // 雷达图数据
  const radarData = [
    { subject: '薪资待遇', value: company.ratings.salary, fullMark: 5 },
    { subject: '工作生活', value: company.ratings.workLifeBalance, fullMark: 5 },
    { subject: '晋升空间', value: company.ratings.growth, fullMark: 5 },
    { subject: '管理氛围', value: company.ratings.management, fullMark: 5 },
    { subject: '办公环境', value: company.ratings.environment, fullMark: 5 },
  ]

  // 评分分布数据
  const ratingDistribution = [
    { rating: '5星', count: 45, color: '#10b981' },
    { rating: '4星', count: 78, color: '#22c55e' },
    { rating: '3星', count: 56, color: '#eab308' },
    { rating: '2星', count: 23, color: '#f97316' },
    { rating: '1星', count: 12, color: '#ef4444' },
  ]

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        返回列表
      </motion.button>

      {/* Company Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Basic Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl font-bold text-gray-600">
                {company.name[0]}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {company.scale}人
                  </span>
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {company.industry}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{company.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {company.tags.map((tag) => {
                const isPositive = ['福利好', '氛围好', '成长快', '技术强', '薪资高', '稳定', '扁平化', '发展稳定', '氛围轻松', '年轻化'].includes(tag)
                return (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      isPositive 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Right: Rating Summary */}
          <div className="w-full md:w-80 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary-700 mb-2">
                {company.avgRating.toFixed(1)}
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(company.avgRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                基于 {company.ratingCount.toLocaleString()} 条评价
              </p>
            </div>
            <button 
              onClick={() => navigate('/submit')}
              className="w-full btn btn-primary"
            >
              我要评价
            </button>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">综合评分雷达图</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" className="text-sm" />
              <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
              <Radar
                name={company.name}
                dataKey="value"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">评分分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingDistribution} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="rating" type="category" width={50} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {ratingDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">用户评价</h2>
          <span className="text-sm text-gray-500">共 {reviews.length} 条</span>
        </div>

        <div className="space-y-6">
          {reviews.length > 0 ? reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              {/* Review Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {review.userNickname[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{review.userNickname}</p>
                    <p className="text-sm text-gray-500">
                      {review.position} · {review.workYears}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.overallRating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-4 ml-13">
                {/* Pros */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-green-600 shrink-0">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">优点</span>
                  </div>
                  <p className="text-gray-700">{review.pros}</p>
                </div>

                {/* Cons */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-red-600 shrink-0">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">缺点</span>
                  </div>
                  <p className="text-gray-700">{review.cons}</p>
                </div>

                {/* Advice */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-primary-600 shrink-0">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-sm font-medium">建议</span>
                  </div>
                  <p className="text-gray-700">{review.advice}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {review.createdAt}
                  </span>
                  {review.attachments.length > 0 && (
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {review.attachments.length} 份证明材料
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">暂无评价</p>
              <button
                onClick={() => navigate('/submit')}
                className="mt-4 btn btn-primary"
              >
                抢先评价
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
