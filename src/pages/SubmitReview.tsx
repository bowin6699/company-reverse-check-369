import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  AlertTriangle,
  Plus,
  Search
} from 'lucide-react'

// 内联数据（避免循环依赖）
const mockCompanies = [
  { id: '1', name: '字节跳动', industry: '互联网', location: '北京' },
  { id: '2', name: '腾讯', industry: '互联网', location: '深圳' },
  { id: '3', name: '阿里巴巴', industry: '互联网', location: '杭州' },
  { id: '4', name: '小红书', industry: '互联网', location: '上海' },
  { id: '5', name: '华为', industry: '通信', location: '深圳' },
  { id: '6', name: '拼多多', industry: '互联网', location: '上海' },
  { id: '7', name: '美团', industry: '互联网', location: '北京' },
  { id: '8', name: '小米', industry: '电子', location: '北京' },
  { id: '9', name: '京东', industry: '电商', location: '北京' },
  { id: '10', name: '网易', industry: '互联网', location: '杭州' },
  { id: '11', name: '百度', industry: '互联网', location: '北京' },
  { id: '12', name: '滴滴', industry: '出行', location: '北京' },
]

const tagOptions = [
  '福利好', '薪资高', '加班多', '996', '氛围好', '成长快', '技术强', 
  '稳定', '压力小', '扁平化', '狼性文化', '内卷', '晋升难', '管理混乱',
  '导师制', '免费三餐', '年终奖', '期权好', '远程办公', '弹性工作制'
]

const attachmentTypes = [
  { value: 'social_security', label: '📋 社保缴纳记录' },
  { value: 'contract', label: '📄 劳动合同/offer' },
  { value: 'screenshot', label: '💻 软件截图' },
  { value: 'photo', label: '📷 现场照片' },
  { value: 'payslip', label: '💰 工资条' },
  { value: 'other', label: '📁 其他证明材料' },
]

interface Attachment {
  id: string
  type: string
  name: string
}

interface Rating {
  salary: number
  workLifeBalance: number
  growth: number
  management: number
  environment: number
}

export default function SubmitReview() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedCompany, setSelectedCompany] = useState('')
  const [customCompanyName, setCustomCompanyName] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    position: '',
    workYears: '',
    pros: '',
    cons: '',
    advice: '',
    ratings: { salary: 0, workLifeBalance: 0, growth: 0, management: 0, environment: 0 } as Rating,
    tags: [] as string[],
    attachments: [] as Attachment[],
    agreeToTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredCompanies = mockCompanies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const ratingLabels: Record<keyof Rating, string> = {
    salary: '💰 薪资待遇',
    workLifeBalance: '⏰ 加班文化',
    growth: '📈 晋升空间',
    management: '👔 管理氛围',
    environment: '🏢 办公环境',
  }

  const updateRating = (key: keyof Rating, value: number) => {
    setFormData(prev => ({ ...prev, ratings: { ...prev.ratings, [key]: value } }))
    if (errors.ratings) setErrors(prev => { const e = {...prev}; delete e.ratings; return e })
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }))
  }

  const handleFileUpload = (type: string) => {
    const newAttachment: Attachment = {
      id: `a${Date.now()}`,
      type,
      name: `${attachmentTypes.find(t => t.value === type)?.label?.replace(/^[^\s]+\s/, '') || '文件'}_${Date.now()}.pdf`,
    }
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, newAttachment] }))
  }

  const removeAttachment = (id: string) => {
    setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(a => a.id !== id) }))
  }

  // 验证第一步
  const validateStep1 = () => {
    if (!selectedCompany && !customCompanyName.trim()) {
      return { company: '请选择或输入企业名称' } as Record<string, string>
    }
    return {} as Record<string, string>
  }

  // 验证第二步
  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (!formData.position.trim()) errs.position = '请输入您的职位'
    if (!formData.workYears) errs.workYears = '请选择工作年限'
    if (formData.pros.trim().length < 10) errs.pros = '优点至少写10个字'
    if (formData.cons.trim().length < 10) errs.cons = '缺点至少写10个字'
    const hasRating = Object.values(formData.ratings).some(v => v > 0)
    if (!hasRating) errs.ratings = '请至少给一个维度评分'
    return errs
  }

  const nextStep = () => {
    if (step === 1) {
      const errs = validateStep1()
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
    }
    if (step === 2) {
      const errs = validateStep2()
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
    }
    setErrors({})
    setStep(s => Math.min(s + 1, 4))
  }

  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      setErrors({ terms: '请先同意用户协议' })
      return
    }
    setSubmitted(true)
  }

  const getSelectedName = () => {
    if (customCompanyName.trim()) return customCompanyName.trim()
    return mockCompanies.find(c => c.id === selectedCompany)?.name || ''
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto text-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 提交成功！</h2>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-left">
          <p className="text-green-800 font-medium mb-2">评价摘要：</p>
          <p className="text-sm text-green-700">📌 企业：<strong>{getSelectedName()}</strong></p>
          <p className="text-sm text-green-700">💼 职位：{formData.position}</p>
          <p className="text-sm text-green-700">⭐ 综合评分：{(Object.values(formData.ratings).reduce((a,b)=>a+b, 0) / 5).toFixed(1)} 分</p>
          <p className="text-sm text-green-700">📎 附件：{formData.attachments.length} 份</p>
        </div>
        <p className="text-gray-600 mb-8">您已成功提交对 <strong>{getSelectedName()}</strong> 的评价，审核通过后将在 1-3 个工作日内显示。感谢您的贡献！</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/')} className="btn btn-primary">返回首页</button>
          <button onClick={() => { setSubmitted(false); setStep(1); setSelectedCompany(''); setCustomCompanyName(''); setFormData({ position:'', workYears:'', pros:'', cons:'', advice:'', ratings:{salary:0,workLifeBalance:0,growth:0,management:0,environment:0}, tags:[], attachments:[], agreeToTerms:false }); }}
            className="btn btn-secondary">继续评价其他企业</button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${s <= step ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-1 rounded transition-colors ${s < step ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-12 md:gap-16 text-sm">
          {['选择企业', '填写评价', '上传证明', '确认提交'].map((label, i) => (
            <span key={label} className={step >= i+1 ? 'text-primary-600 font-medium' : 'text-gray-400'}>{label}</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Company */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">🏢 选择要评价的企业</h2>
            
            {errors.company && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-4">
                <AlertCircle className="w-4 h-4" />
                {errors.company}
              </div>
            )}

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="搜索企业名称..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="input pl-10" />
            </div>

            {/* Company List */}
            <div className="space-y-2 max-h-72 overflow-y-auto mb-4">
              {filteredCompanies.map(company => (
                <motion.button key={company.id} whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={() => { setSelectedCompany(company.id); setShowCustomInput(false); setCustomCompanyName(''); setErrors(p => { const e={...p}; delete e.company; return e; }) }}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all ${selectedCompany === company.id ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center font-bold text-primary-700">{company.name[0]}</div>
                    <div>
                      <p className="font-medium text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.industry} · {company.location}</p>
                    </div>
                    {selectedCompany === company.id && <CheckCircle className="w-5 h-5 text-primary-600 ml-auto" />}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Add Custom Company */}
            {!showCustomInput ? (
              <button onClick={() => { setShowCustomInput(true); setSelectedCompany(''); }}
                className="w-full p-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                列表中没有？手动输入企业名称
              </button>
            ) : (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-3">
                <label className="text-sm font-medium text-blue-800">输入企业名称</label>
                <input type="text" placeholder="例如：某某科技有限公司" value={customCompanyName}
                  onChange={(e) => { setCustomCompanyName(e.target.value); setErrors(p => { const e={...p}; delete e.company; return e; }) }}
                  className="input" autoFocus />
                <div className="flex gap-2">
                  <button onClick={() => { setShowCustomInput(false); setCustomCompanyName(''); }} className="btn btn-secondary text-sm py-1.5">取消</button>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button onClick={nextStep} disabled={!selectedCompany && !customCompanyName.trim()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                下一步 <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Fill Review */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📝 填写评价详情</h2>
            <p className="text-sm text-gray-500 mb-6">正在评价：<strong className="text-primary-600">{getSelectedName()}</strong></p>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">您的职位 *</label>
                  <input type="text" placeholder="如：后端开发工程师" value={formData.position}
                    onChange={(e) => { setFormData({...formData, position:e.target.value}); setErrors(p => { const e={...p}; delete e.position; return e; }) }}
                    className={`input ${errors.position ? 'border-red-400 focus:ring-red-500' : ''}`} />
                  {errors.position && <p className="text-xs text-red-500 mt-1">{errors.position}</p>}
                </div>
                <div>
                  <label className="label">工作年限 *</label>
                  <select value={formData.workYears}
                    onChange={(e) => { setFormData({...formData, workYears:e.target.value}); setErrors(p => { const e={...p}; delete e.workYears; return e; }) }}
                    className={`input ${errors.workYears ? 'border-red-400 focus:ring-red-500' : ''}`}>
                    <option value="">请选择</option>
                    <option value="实习">实习</option><option value="应届">应届</option>
                    <option value="1-3年">1-3年</option><option value="3-5年">3-5年</option>
                    <option value="5-10年">5-10年</option><option value="10年以上">10年以上</option>
                  </select>
                  {errors.workYears && <p className="text-xs text-red-500 mt-1">{errors.workYears}</p>}
                </div>
              </div>

              {/* Ratings */}
              <div>
                <label className="label mb-4">综合评分 * <span className="font-normal text-gray-400">(点击星星打分)</span></label>
                {errors.ratings && <p className="text-xs text-red-500 mb-2">{errors.ratings}</p>}
                <div className="space-y-3">
                  {(Object.keys(formData.ratings) as Array<keyof Rating>).map(key => (
                    <div key={key} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                      <span className="w-32 text-sm text-gray-600 shrink-0">{ratingLabels[key]}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => updateRating(key, star)}
                            className="p-0.5 transition-transform hover:scale-125 focus:outline-none">
                            <Star className={`w-7 h-7 transition-colors ${star <= formData.ratings[key] ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 hover:text-yellow-300'}`} />
                          </button>
                        ))}
                      </div>
                      <span className={`text-sm font-medium min-w-[4rem] ${formData.ratings[key] > 0 ? (formData.ratings[key] >= 4 ? 'text-green-600' : formData.ratings[key] >= 3 ? 'text-yellow-600' : 'text-red-600') : 'text-gray-400'}`}>
                        {formData.ratings[key] > 0 ? `${formData.ratings[key]}分 - ${formData.ratings[key] >= 4 ? '满意' : formData.ratings[key] >= 3 ? '一般' : '不满意'}` : '未评分'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div>
                <label className="label">✅ 优点 * <span className="font-normal text-gray-400">(至少10个字)</span></label>
                <textarea placeholder="这家公司有哪些值得称赞的地方？比如团队氛围、福利待遇、技术成长等..." value={formData.pros}
                  onChange={(e) => { setFormData({...formData, pros:e.target.value}); setErrors(p => { const e={...p}; delete e.pros; return e; }) }}
                  className={`input min-h-24 resize-none ${errors.pros ? 'border-red-400 focus:ring-red-500' : ''}`} rows={3} />
                {errors.pros && <p className="text-xs text-red-500 mt-1">{errors.pros}</p>}
                <p className="text-xs text-gray-400 mt-1 text-right">{formData.pros.length}/10 字符</p>
              </div>

              <div>
                <label className="label">❌ 缺点 * <span className="font-normal text-gray-400">(至少10个字)</span></label>
                <textarea placeholder="这家公司有哪些需要改进的地方？客观描述即可..." value={formData.cons}
                  onChange={(e) => { setFormData({...formData, cons:e.target.value}); setErrors(p => { const e={...p}; delete e.cons; return e; }) }}
                  className={`input min-h-24 resize-none ${errors.cons ? 'border-red-400 focus:ring-red-500' : ''}`} rows={3} />
                {errors.cons && <p className="text-xs text-red-500 mt-1">{errors.cons}</p>}
                <p className="text-xs text-gray-400 mt-1 text-right">{formData.cons.length}/10 字符</p>
              </div>

              <div>
                <label className="label">💡 给求职者的建议</label>
                <textarea placeholder="您对想加入这家公司的求职者有什么建议？" value={formData.advice}
                  onChange={(e) => setFormData({...formData, advice:e.target.value})} className="input min-h-20 resize-none" rows={2} />
              </div>

              {/* Tags */}
              <div>
                <label className="label mb-3">选择标签（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        formData.tags.includes(tag) ? 'bg-primary-100 text-primary-700 border-2 border-primary-500' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                      }`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="btn btn-secondary"><ChevronLeft className="w-4 h-4 mr-1" />上一步</button>
              <button onClick={nextStep} className="btn btn-primary">下一步 <ChevronRight className="w-4 h-4 ml-1" /></button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Upload Proofs */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl mb-6">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">为什么需要证明材料？</p>
                <p>为了确保评价的真实性，建议上传相关证明。所有材料仅用于审核，不会公开显示。</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">📎 上传证明材料（可选）</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {attachmentTypes.map(({ value, label }) => (
                <button key={value} onClick={() => handleFileUpload(value)}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/50 transition-all group">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                </button>
              ))}
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-700">已上传文件 ({formData.attachments.length})：</p>
                {formData.attachments.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button onClick={() => removeAttachment(file.id)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="btn btn-secondary"><ChevronLeft className="w-4 h-4 mr-1" />上一步</button>
              <button onClick={() => setStep(4)} className="btn btn-primary">下一步 <ChevronRight className="w-4 h-4 ml-1" /></button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">📋 确认提交</h2>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">评价信息确认</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">📌 企业</span><span className="font-medium">{getSelectedName()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">💼 职位</span><span className="font-medium">{formData.position}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">📅 年限</span><span className="font-medium">{formData.workYears}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">⭐ 综合评分</span><span className="font-bold text-primary-600">{(Object.values(formData.ratings).reduce((a,b)=>a+b,0)/5).toFixed(1)}分</span></div>
                  <div className="col-span-2"><span className="text-gray-500">✅ 优点：</span><span className="ml-2">{formData.pros.slice(0,60)}{formData.pros.length>60?'...':''}</span></div>
                  <div className="col-span-2"><span className="text-gray-500">❌ 缺点：</span><span className="ml-2">{formData.cons.slice(0,60)}{formData.cons.length>60?'...':''}</span></div>
                  <div className="col-span-2"><span className="text-gray-500"># 标签：</span><span className="ml-2">{formData.tags.join('、')||'无'}</span></div>
                  <div className="col-span-2"><span className="text-gray-500">📎 附件：</span><span className="ml-2 font-medium">{formData.attachments.length}份证明材料</span></div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" checked={formData.agreeToTerms}
                  onChange={(e) => { setFormData({...formData, agreeToTerms:e.target.checked}); setErrors(p => { const e={...p}; delete e.terms; return e; }) }}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-0.5" />
                <span className="text-sm text-gray-600">
                  我确认以上信息真实准确，并同意<a href="#" className="text-primary-600 hover:underline">《用户协议》</a>和<a href="#" className="text-primary-600 hover:underline">《隐私政策》</a>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 ml-8">{errors.terms}</p>}

              <div className="p-4 bg-yellow-50 rounded-xl flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">请确保评价客观真实。虚假评价可能导致账号被封禁。</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="btn btn-secondary"><ChevronLeft className="w-4 h-4 mr-1" />上一步</button>
              <button onClick={handleSubmit} disabled={!formData.agreeToTerms}
                className="btn btn-primary py-3 px-8 text-base disabled:opacity-50 disabled:cursor-not-allowed">
                🚀 提交评价
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
