import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Settings,
  Check,
  X,
  Clock,
  Search,
  Eye
} from 'lucide-react'
import { mockReviews, mockCompanies, mockStatistics } from '../data/mockData'

type Tab = 'overview' | 'reviews' | 'companies' | 'users' | 'settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'overview' as const, label: '概览', icon: LayoutDashboard },
    { id: 'reviews' as const, label: '评价审核', icon: FileText, badge: mockStatistics.pendingReviews },
    { id: 'companies' as const, label: '企业管理', icon: Building2 },
    { id: 'users' as const, label: '用户管理', icon: Users },
    { id: 'settings' as const, label: '系统设置', icon: Settings },
  ]

  const filteredReviews = mockReviews.filter(r => {
    if (reviewFilter !== 'all' && r.status !== reviewFilter) return false
    const companyName = mockCompanies.find(c => c.id === r.companyId)?.name || ''
    if (searchQuery && !companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
          <h2 className="font-semibold text-gray-900 mb-4 px-2">管理后台</h2>
          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {label}
                </div>
                {badge !== undefined && badge > 0 && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold text-gray-900">数据概览</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">企业总数</span>
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{mockStatistics.totalCompanies}</p>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">评价总数</span>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{mockStatistics.totalReviews.toLocaleString()}</p>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">待审核</span>
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{mockStatistics.pendingReviews}</p>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">今日新增</span>
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">+128</p>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">最近评价</h3>
                <div className="space-y-4">
                  {mockReviews.slice(0, 5).map(review => {
                    const company = mockCompanies.find(c => c.id === review.companyId)
                    return (
                      <div key={review.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{company?.name}</p>
                          <p className="text-sm text-gray-500">
                            {review.userNickname} · {review.position}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status === 'approved' ? 'bg-green-100 text-green-700' :
                          review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {review.status === 'approved' ? '已通过' :
                           review.status === 'rejected' ? '已拒绝' : '待审核'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">评价审核</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索企业..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setReviewFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      reviewFilter === status
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'pending' ? '待审核' :
                     status === 'approved' ? '已通过' :
                     status === 'rejected' ? '已拒绝' : '全部'}
                  </button>
                ))}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.map(review => {
                  const company = mockCompanies.find(c => c.id === review.companyId)
                  return (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{company?.name}</h3>
                          <p className="text-sm text-gray-500">
                            {review.userNickname} · {review.position} · {review.workYears}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status === 'approved' ? 'bg-green-100 text-green-700' :
                          review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {review.status === 'approved' ? '已通过' :
                           review.status === 'rejected' ? '已拒绝' : '待审核'}
                        </span>
                      </div>

                      <div className="space-y-3 text-sm">
                        <p><span className="text-green-600 font-medium">优点：</span>{review.pros}</p>
                        <p><span className="text-red-600 font-medium">缺点：</span>{review.cons}</p>
                        <p><span className="text-primary-600 font-medium">建议：</span>{review.advice}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">附件：</span>
                          {review.attachments.length > 0 ? (
                            <span className="text-sm text-primary-600">
                              {review.attachments.length} 个文件
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">无</span>
                          )}
                        </div>
                        {review.status === 'pending' && (
                          <div className="flex gap-2">
                            <button className="btn btn-secondary text-sm py-1.5">
                              <Eye className="w-4 h-4 mr-1" />
                              查看详情
                            </button>
                            <button className="btn bg-green-600 hover:bg-green-700 text-white text-sm py-1.5">
                              <Check className="w-4 h-4 mr-1" />
                              通过
                            </button>
                            <button className="btn btn-danger text-sm py-1.5">
                              <X className="w-4 h-4 mr-1" />
                              拒绝
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Companies Tab */}
          {activeTab === 'companies' && (
            <motion.div
              key="companies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">企业管理</h1>
                <button className="btn btn-primary">添加企业</button>
              </div>

              <div className="card overflow-hidden p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">企业名称</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">行业</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">规模</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">评分</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">评价数</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockCompanies.map(company => (
                      <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600">
                              {company.name[0]}
                            </div>
                            <span className="font-medium text-gray-900">{company.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{company.industry}</td>
                        <td className="px-6 py-4 text-gray-600">{company.scale}</td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${
                            company.avgRating >= 4 ? 'text-green-600' :
                            company.avgRating >= 3 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {company.avgRating.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{company.ratingCount}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mr-3">
                            编辑
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            删除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Users & Settings - Placeholder */}
          {(activeTab === 'users' || activeTab === 'settings') && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center py-20"
            >
              <p className="text-gray-500">此功能正在开发中...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
