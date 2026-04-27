import { useState, useCallback } from 'react'
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
  Eye,
  AlertTriangle
} from 'lucide-react'

// 内联数据（避免循环依赖问题）
const mockCompanies = [
  {
    id: '1', name: '字节跳动', industry: '互联网', scale: '10000+', location: '北京',
    description: '字节跳动是一家全球化互联网科技公司，旗下产品包括抖音、今日头条等。',
    avgRating: 3.8, ratingCount: 1256,
    ratings: { salary: 4.2, workLifeBalance: 2.8, growth: 4.0, management: 3.5, environment: 4.2 },
    tags: ['成长快', '压力大', '福利好', '技术氛围浓', '996'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '2', name: '腾讯', industry: '互联网', scale: '10000+', location: '深圳',
    description: '腾讯是中国领先的互联网增值服务提供商。',
    avgRating: 4.1, ratingCount: 2341,
    ratings: { salary: 4.5, workLifeBalance: 3.5, growth: 4.2, management: 3.8, environment: 4.5 },
    tags: ['福利好', '稳定', '内卷', '大厂光环', '加班适中'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '3', name: '阿里巴巴', industry: '互联网', scale: '10000+', location: '杭州',
    description: '阿里巴巴集团是全球领先的电子商务公司。',
    avgRating: 3.6, ratingCount: 1876,
    ratings: { salary: 4.0, workLifeBalance: 2.5, growth: 4.2, management: 3.2, environment: 4.0 },
    tags: ['996', '成长快', '福利还可以', '技术好', '压力大'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '4', name: '小红书', industry: '互联网', scale: '1000+', location: '上海',
    description: '小红书是一个生活方式平台和消费决策入口。',
    avgRating: 3.9, ratingCount: 456,
    ratings: { salary: 4.0, workLifeBalance: 3.2, growth: 4.0, management: 3.6, environment: 4.3 },
    tags: ['氛围轻松', '年轻化', '福利好', '发展快'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '5', name: '华为', industry: '通信', scale: '10000+', location: '深圳',
    description: '华为是全球领先的ICT基础设施和智能终端提供商。',
    avgRating: 3.5, ratingCount: 1523,
    ratings: { salary: 4.3, workLifeBalance: 2.2, growth: 4.0, management: 3.0, environment: 3.8 },
    tags: ['加班多', '薪资高', '狼性文化', '技术强', '稳定'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '6', name: '拼多多', industry: '互联网', scale: '10000+', location: '上海',
    description: '拼多多是新电商平台开创者。',
    avgRating: 3.2, ratingCount: 892,
    ratings: { salary: 4.5, workLifeBalance: 1.8, growth: 3.8, management: 2.8, environment: 3.5 },
    tags: ['薪资高', '996', '压力大', '股票好', '节奏快'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '7', name: '美团', industry: '互联网', scale: '10000+', location: '北京',
    description: '美团是中国领先的生活服务电子商务平台。',
    avgRating: 3.7, ratingCount: 1345,
    ratings: { salary: 3.8, workLifeBalance: 3.0, growth: 3.9, management: 3.4, environment: 4.0 },
    tags: ['业务多', '加班一般', '福利还行', '发展稳定'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
  {
    id: '8', name: '小米', industry: '电子', scale: '10000+', location: '北京',
    description: '小米是一家以手机、智能硬件和IoT平台为核心的互联网公司。',
    avgRating: 3.8, ratingCount: 987,
    ratings: { salary: 3.8, workLifeBalance: 3.5, growth: 3.8, management: 3.6, environment: 4.2 },
    tags: ['氛围好', '福利一般', '加班不多', '扁平化'],
    createdAt: '2024-01-01', updatedAt: '2024-12-01',
  },
]

type ReviewStatus = 'pending' | 'approved' | 'rejected'

interface Review {
  id: string
  companyId: string
  userId: string
  userNickname: string
  position: string
  workYears: string
  pros: string
  cons: string
  advice: string
  ratings: Record<string, number>
  overallRating: number
  tags: string[]
  attachments: Array<{ id: string; type: string; name: string; url: string; uploadedAt: string }>
  status: ReviewStatus
  createdAt: string
  reviewedAt?: string
}

// 初始评价数据
const initialReviews: Review[] = [
  {
    id: 'r1', companyId: '1', userId: 'u1', userNickname: '匿名用户***123',
    position: '后端开发工程师', workYears: '1-3年',
    pros: '技术氛围很好，同事都很nice，能学到很多东西。福利待遇不错，食堂好吃。',
    cons: '加班确实多，基本996，压力比较大。晋升竞争激烈。',
    advice: '技术好的同学可以考虑，但要做好加班的心理准备。',
    ratings: { salary: 4, workLifeBalance: 2, growth: 4, management: 3, environment: 4 },
    overallRating: 3, tags: ['技术氛围好', '加班多'],
    attachments: [{ id: 'a1', type: 'social_security', name: '社保缴纳证明.pdf', url: '/files/a1.pdf', uploadedAt: '2024-06-01' }],
    status: 'approved', createdAt: '2024-06-15', reviewedAt: '2024-06-16',
  },
  {
    id: 'r2', companyId: '2', userId: 'u2', userNickname: '匿名用户***456',
    position: '产品经理', workYears: '3-5年',
    pros: '大厂光环，薪资待遇好，福利完善。平台大，能接触到的业务也多。',
    cons: '部门之间协调有时候很累，某些领导风格一般。',
    advice: '适合想稳定发展的人，但也需要主动寻找机会。',
    ratings: { salary: 5, workLifeBalance: 4, growth: 4, management: 3, environment: 5 },
    overallRating: 4, tags: ['福利好', '稳定'],
    attachments: [{ id: 'a2', type: 'contract', name: '劳动合同照片.jpg', url: '/files/a2.jpg', uploadedAt: '2024-05-20' }],
    status: 'approved', createdAt: '2024-05-25', reviewedAt: '2024-05-26',
  },
  {
    id: 'r3', companyId: '5', userId: 'u3', userNickname: '匿名用户***789',
    position: '硬件工程师', workYears: '5-10年',
    pros: '技术实力强，能接触到核心项目。薪资在行业内算高的。',
    cons: '加班非常多，基本没有个人时间。管理比较僵化。',
    advice: '想赚钱、学技术的可以来，但要做好牺牲生活的准备。',
    ratings: { salary: 5, workLifeBalance: 1, growth: 4, management: 2, environment: 3 },
    overallRating: 3, tags: ['薪资高', '加班多', '技术强'],
    attachments: [], status: 'approved', createdAt: '2024-04-10', reviewedAt: '2024-04-11',
  },
  {
    id: 'r4', companyId: '6', userId: 'u4', userNickname: '匿名用户***321',
    position: '前端开发', workYears: '1-3年',
    pros: '薪资确实高，期权有机会。',
    cons: '11-11-6，几乎没有个人生活。团队流动率很高。',
    advice: '年轻想赚快钱的可以来，不建议长期待。',
    ratings: { salary: 5, workLifeBalance: 1, growth: 3, management: 2, environment: 3 },
    overallRating: 2, tags: ['薪资高', '996', '压力大'],
    attachments: [{ id: 'a3', type: 'screenshot', name: '工时截图.png', url: '/files/a3.png', uploadedAt: '2024-03-15' }],
    status: 'pending', createdAt: '2024-03-20',
  },
  {
    id: 'r5', companyId: '1', userId: 'u5', userNickname: '匿名用户***555',
    position: '算法工程师', workYears: '应届',
    pros: '团队氛围很好，mentor带得很认真。免费三餐和下午茶真的很香。',
    cons: '校招进来base不算高，需要熬年限。有时候要处理一些脏活累活。',
    advice: '校招进来的同学建议先好好学技术，不要急着跳槽。',
    ratings: { salary: 3, workLifeBalance: 3, growth: 5, management: 4, environment: 4 },
    overallRating: 4, tags: ['氛围好', '导师制', '免费三餐'],
    attachments: [{ id: 'a4', type: 'social_security', name: '入职证明.pdf', url: '/files/a4.pdf', uploadedAt: '2024-07-01' }],
    status: 'pending', createdAt: '2024-07-02',
  },
  {
    id: 'r6', companyId: '3', userId: 'u6', userNickname: '匿名用户***666',
    position: 'Java开发', workYears: '3-5年',
    pros: '阿里系的技术体系确实强，中间件用起来很爽。年终奖一般都不错。',
    cons: '361制度让人压力很大，P8以上政治斗争严重。',
    advice: '去之前要想清楚自己能不能接受高压环境，身体是革命的本钱。',
    ratings: { salary: 4, workLifeBalance: 2, growth: 4, management: 2, environment: 3 },
    overallRating: 3, tags: ['技术强', '361', '年终奖'],
    attachments: [],
    status: 'pending', createdAt: '2024-07-10',
  },
  {
    id: 'r7', companyId: '4', userId: 'u7', userNickname: '匿名用户***777',
    position: 'UI设计师', workYears: '1-3年',
    pros: '公司氛围超级好，年轻人很多。设计团队很有话语权，产品尊重设计。',
    cons: '相比大厂薪资略低，期权不太值钱。',
    advice: '重视工作体验和成长的设计师推荐来，这里真的不一样。',
    ratings: { salary: 3, workLifeBalance: 4, growth: 4, management: 5, environment: 5 },
    overallRating: 4, tags: ['氛围好', '年轻化', '设计话语权'],
    attachments: [{ id: 'a5', type: 'photo', name: '办公环境.jpg', url: '/files/a5.jpg', uploadedAt: '2024-07-15' }],
    status: 'pending', createdAt: '2024-07-16',
  },
  {
    id: 'r8', companyId: '7', userId: 'u8', userNickname: '匿名用户***888',
    position: '运营专员', workYears: '应届',
    pros: '美团业务线多，可以接触不同领域。转岗机会相对容易。',
    cons: '运营岗位加班也不少，KPI压力比较大。',
    advice: '应届生可以先来积累经验，了解互联网运营的全貌。',
    ratings: { salary: 3, workLifeBalance: 3, growth: 4, management: 3, environment: 4 },
    overallRating: 3, tags: ['业务多', '转岗灵活'],
    attachments: [],
    status: 'rejected', createdAt: '2024-06-20', reviewedAt: '2024-06-22',
  },
]

type Tab = 'overview' | 'reviews' | 'companies' | 'users' | 'settings'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [reviewFilter, setReviewFilter] = useState<ReviewStatus | 'all'>('pending')
  const [searchQuery, setSearchQuery] = useState('')
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedReview, setSelectedReview] = useState<Review | null>(null)

  // 统计数据（动态计算）
  const stats = {
    totalCompanies: mockCompanies.length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter(r => r.status === 'pending').length,
    approvedReviews: reviews.filter(r => r.status === 'approved').length,
    rejectedReviews: reviews.filter(r => r.status === 'rejected').length,
    todayNew: 3,
  }

  const tabs = [
    { id: 'overview' as const, label: '概览', icon: LayoutDashboard },
    { id: 'reviews' as const, label: '评价审核', icon: FileText, badge: stats.pendingReviews },
    { id: 'companies' as const, label: '企业管理', icon: Building2 },
    { id: 'users' as const, label: '用户管理', icon: Users },
    { id: 'settings' as const, label: '系统设置', icon: Settings },
  ]

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // 审核操作：通过
  const handleApprove = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId
        ? { ...r, status: 'approved' as ReviewStatus, reviewedAt: new Date().toISOString().split('T')[0] }
        : r
    ))
    showToast('✅ 评价已通过审核', 'success')
  }

  // 审核操作：拒绝
  const handleReject = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId
        ? { ...r, status: 'rejected' as ReviewStatus, reviewedAt: new Date().toISOString().split('T')[0] }
        : r
    ))
    showToast('❌ 评价已拒绝', 'error')
  }

  // 批量通过
  const handleBatchApprove = () => {
    setReviews(prev => prev.map(r =>
      r.status === 'pending'
        ? { ...r, status: 'approved' as ReviewStatus, reviewedAt: new Date().toISOString().split('T')[0] }
        : r
    ))
    showToast(`✅ 已批量通过 ${stats.pendingReviews} 条评价`, 'success')
  }

  const filteredReviews = reviews.filter(r => {
    if (reviewFilter !== 'all' && r.status !== reviewFilter) return false
    const companyName = mockCompanies.find(c => c.id === r.companyId)?.name || ''
    if (searchQuery && !companyName.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex gap-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
          <h2 className="font-semibold text-gray-900 mb-4 px-2">🛡️ 管理后台</h2>
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
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full animate-pulse">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-gray-100 px-2">
            <p className="text-xs text-gray-400 mb-2">快速统计</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">待审核</span>
                <span className="font-medium text-orange-600">{stats.pendingReviews}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">已通过</span>
                <span className="font-medium text-green-600">{stats.approvedReviews}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">已拒绝</span>
                <span className="font-medium text-red-600">{stats.rejectedReviews}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">📊 数据概览</h1>
              
              <div className="grid grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">企业总数</span>
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</p>
                  <p className="text-xs text-gray-400 mt-1">+2 本月新增</p>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">评价总数</span>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalReviews}</p>
                  <p className="text-xs text-green-500 mt-1">+{stats.todayNew} 今日新增</p>
                </div>
                <div className="card bg-orange-50 border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">⏳ 待审核</span>
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingReviews}</p>
                  <p className="text-xs text-orange-400 mt-1">需要尽快处理</p>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">今日新增</span>
                    <Users className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">+{stats.todayNew}</p>
                  <p className="text-xs text-gray-400 mt-1">较昨日 +28%</p>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">📝 最近评价</h3>
                  <button onClick={() => setActiveTab('reviews')} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    查看全部 →
                  </button>
                </div>
                <div className="space-y-4">
                  {reviews.slice(0, 5).map(review => {
                    const company = mockCompanies.find(c => c.id === review.companyId)
                    return (
                      <div key={review.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{company?.name}</p>
                          <p className="text-sm text-gray-500">{review.userNickname} · {review.position}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status === 'approved' ? 'bg-green-100 text-green-700' :
                          review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700 animate-pulse'
                        }`}>
                          {review.status === 'approved' ? '✅ 已通过' :
                           review.status === 'rejected' ? '❌ 已拒绝' : '⏳ 待审核'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">⚡ 快捷操作</h3>
                <div className="flex gap-3">
                  {stats.pendingReviews > 0 && (
                    <button
                      onClick={handleBatchApprove}
                      className="btn bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      一键全部通过 ({stats.pendingReviews})
                    </button>
                  )}
                  <button onClick={() => setActiveTab('reviews')} className="btn btn-secondary">
                    <Eye className="w-4 h-4 mr-1" />
                    进入审核中心
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">📋 评价审核中心</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索企业名称..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10 w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => {
                  const count = status === 'all' 
                    ? reviews.length 
                    : reviews.filter(r => r.status === status).length
                  return (
                    <button
                      key={status}
                      onClick={() => setReviewFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        reviewFilter === status
                          ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'pending' ? `⏳ 待审核 (${count})` :
                       status === 'approved' ? `✅ 已通过 (${count})` :
                       status === 'rejected' ? `❌ 已拒绝 (${count})` :
                       `📄 全部 (${count})`}
                    </button>
                  )
                })}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.length > 0 ? filteredReviews.map(review => {
                  const company = mockCompanies.find(c => c.id === review.companyId)
                  return (
                    <motion.div
                      key={review.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`card ${review.status === 'pending' ? 'border-l-4 border-l-yellow-400' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{company?.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            👤 {review.userNickname} · 💼 {review.position} · 📅 {review.workYears} · 🗓️ 提交于 {review.createdAt}
                            {review.reviewedAt && <span className="ml-2">· ✅ 审核于 {review.reviewedAt}</span>}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${
                          review.status === 'approved' ? 'bg-green-100 text-green-700' :
                          review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {review.status === 'approved' ? '✅ 已通过' :
                           review.status === 'rejected' ? '❌ 已拒绝' : '⏳ 待审核'}
                        </span>
                      </div>

                      {/* Rating Summary */}
                      <div className="flex gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        {Object.entries(review.ratings).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            salary: '💰 薪资', workLifeBalance: '⏰ 加班', growth: '📈 晋升',
                            management: '👔 管理', environment: '🏢 环境',
                          }
                          return (
                            <div key={key} className="text-center">
                              <p className="text-xs text-gray-500">{labels[key]}</p>
                              <p className="text-lg font-bold">{value}/5</p>
                            </div>
                          )
                        })}
                        <div className="text-center ml-auto border-l pl-4">
                          <p className="text-xs text-gray-500">综合评分</p>
                          <p className="text-lg font-bold text-primary-600">{review.overallRating}/5</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 text-sm">
                        <div className="flex gap-3">
                          <span className="shrink-0 w-14 text-green-600 font-medium">✅ 优点</span>
                          <p className="text-gray-700">{review.pros}</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="shrink-0 w-14 text-red-600 font-medium">❌ 缺点</span>
                          <p className="text-gray-700">{review.cons}</p>
                        </div>
                        <div className="flex gap-3">
                          <span className="shrink-0 w-14 text-blue-600 font-medium">💡 建议</span>
                          <p className="text-gray-700">{review.advice}</p>
                        </div>
                      </div>

                      {/* Tags & Attachments */}
                      {(review.tags.length > 0 || review.attachments.length > 0) && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {review.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                          {review.attachments.length > 0 && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                              📎 {review.attachments.length} 个附件
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedReview(review)}
                            className="btn btn-secondary text-sm py-1.5"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            查看详情
                          </button>
                        </div>
                        {review.status === 'pending' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(review.id)}
                              className="btn btn-danger text-sm py-1.5"
                            >
                              <X className="w-4 h-4 mr-1" />
                              拒绝
                            </button>
                            <button
                              onClick={() => handleApprove(review.id)}
                              className="btn bg-green-600 hover:bg-green-700 text-white text-sm py-1.5"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              通过
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            {review.status === 'approved' ? '已于 ' + review.reviewedAt + ' 通过审核' : '已于 ' + review.reviewedAt + ' 拒绝'}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )
                }) : (
                  <div className="card text-center py-16">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">暂无符合条件的评价</p>
                    <p className="text-gray-400 text-sm mt-2">试试切换筛选条件</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Companies Tab */}
          {activeTab === 'companies' && (
            <motion.div key="companies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">🏢 企业管理</h1>
                <button className="btn btn-primary" onClick={() => showToast('➕ 添加企业功能开发中...', 'success')}>
                  ＋ 添加企业
                </button>
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
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center font-bold text-primary-700">
                              {company.name[0]}
                            </div>
                            <div>
                              <span className="font-medium text-gray-900">{company.name}</span>
                              <p className="text-xs text-gray-400">{company.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">{company.industry}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{company.scale}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <span className={`font-bold text-lg ${
                              company.avgRating >= 4 ? 'text-green-600' :
                              company.avgRating >= 3 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {company.avgRating.toFixed(1)}
                            </span>
                            <span className="text-gray-400 text-sm">/5</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{company.ratingCount.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mr-3"
                            onClick={() => showToast(`📝 编辑 ${company.name} 功能开发中...`, 'success')}>
                            编辑
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium"
                            onClick={() => showToast(`🗑️ 删除 ${company.name} 功能开发中...`, 'error')}>
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

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">👥 用户管理</h1>
              
              <div className="card">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">用户</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">角色</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">评价数</th>
                        <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">注册时间</th>
                        <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">状态</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { nickname: '匿名用户***123', role: '普通用户', count: 3, date: '2024-05-01', active: true },
                        { nickname: '匿名用户***456', role: '普通用户', count: 5, date: '2024-04-15', active: true },
                        { nickname: '匿名用户***789', role: '活跃贡献者', count: 12, date: '2024-03-20', active: true },
                        { nickname: '匿名用户***321', role: '普通用户', count: 1, date: '2024-07-01', active: false },
                        { nickname: '管理员', role: '管理员', count: 0, date: '2024-01-01', active: true },
                      ].map((user, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                {user.nickname[0]}
                              </div>
                              <span className="font-medium text-gray-900">{user.nickname}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.role === '管理员' ? 'bg-purple-100 text-purple-700' :
                              user.role === '活跃贡献者' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>{user.role}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{user.count} 条</td>
                          <td className="px-6 py-4 text-gray-500">{user.date}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              user.active ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${user.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                              {user.active ? '正常' : '已禁用'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">⚙️ 系统设置</h1>

              <div className="card space-y-6">
                {/* Site Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">站点信息</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="label">站点名称</label>
                      <input type="text" defaultValue="求职者反背调调查网" className="input" />
                    </div>
                    <div>
                      <label className="label">站点描述</label>
                      <textarea defaultValue="让求职者看清企业真实面貌" className="input min-h-20 resize-none" rows={2} />
                    </div>
                  </div>
                </div>

                {/* Review Settings */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">审核设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">自动审核</p>
                        <p className="text-sm text-gray-500">信用分高于阈值的用户提交的评价自动通过</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">匿名保护</p>
                        <p className="text-sm text-gray-500">默认隐藏用户昵称的后三位</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">附件必填</p>
                        <p className="text-sm text-gray-500">要求用户必须上传至少一份证明材料</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> 危险区域
                  </h3>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">清空所有数据</p>
                        <p className="text-sm text-red-600">此操作不可逆，请谨慎操作</p>
                      </div>
                      <button className="btn btn-danger text-sm" onClick={() => {
                        if (confirm('确定要清空所有数据吗？此操作不可逆！')) {
                          setReviews([])
                          showToast('⚠️ 所有数据已清空', 'error')
                        }
                      }}>
                        清空数据
                      </button>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={() => showToast('✅ 设置已保存', 'success')}>
                  保存设置
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
