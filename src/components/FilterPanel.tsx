import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  filters: {
    industry: string
    scale: string
    location: string
    minRating: number
  }
  onFilterChange: (filters: Props['filters']) => void
  industries: string[]
  scales: string[]
  locations: string[]
}

export default function FilterPanel({ filters, onFilterChange, industries, scales, locations }: Props) {
  const updateFilter = (key: keyof Props['filters'], value: string | number) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      industry: '全部',
      scale: '全部',
      location: '全部',
      minRating: 0,
    })
  }

  const hasActiveFilters = 
    filters.industry !== '全部' ||
    filters.scale !== '全部' ||
    filters.location !== '全部' ||
    filters.minRating > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">筛选条件</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
            清除筛选
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Industry Filter */}
        <div>
          <label className="label">行业</label>
          <select
            value={filters.industry}
            onChange={(e) => updateFilter('industry', e.target.value)}
            className="input"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Scale Filter */}
        <div>
          <label className="label">企业规模</label>
          <select
            value={filters.scale}
            onChange={(e) => updateFilter('scale', e.target.value)}
            className="input"
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>{scale}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="label">所在城市</label>
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="input"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="label">最低评分</label>
          <select
            value={filters.minRating}
            onChange={(e) => updateFilter('minRating', Number(e.target.value))}
            className="input"
          >
            <option value={0}>不限</option>
            <option value={3}>3分以上</option>
            <option value={3.5}>3.5分以上</option>
            <option value={4}>4分以上</option>
            <option value={4.5}>4.5分以上</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
