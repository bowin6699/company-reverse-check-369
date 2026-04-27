import { motion } from 'framer-motion'
import { MapPin, Users, Star, ChevronRight } from 'lucide-react'
import type { Company } from '../types'

interface Props {
  company: Company
  onClick: () => void
}

export default function CompanyCard({ company, onClick }: Props) {
  // 计算评分颜色
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 bg-green-50'
    if (rating >= 3) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      onClick={onClick}
      className="card cursor-pointer group hover:shadow-lg transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-lg font-bold text-gray-600">
            {company.name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {company.name}
            </h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {company.location}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {company.scale}人
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getRatingColor(company.avgRating)}`}>
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold">{company.avgRating.toFixed(1)}</span>
        </div>
        <span className="text-sm text-gray-400">{company.ratingCount} 条评价</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {company.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs"
          >
            {tag}
          </span>
        ))}
        {company.tags.length > 4 && (
          <span className="px-2 py-1 text-gray-400 text-xs">
            +{company.tags.length - 4}
          </span>
        )}
      </div>

      {/* Mini Rating Bars */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(company.ratings).map(([key, value]) => {
            const labels: Record<string, string> = {
              salary: '薪资',
              workLifeBalance: '加班',
              growth: '晋升',
              management: '管理',
              environment: '环境',
            }
            return (
              <div key={key} className="text-center">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 5) * 100}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      value >= 4 ? 'bg-green-500' : value >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-400">{labels[key]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
