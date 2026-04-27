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
  Info
} from 'lucide-react'
import { mockCompanies, tagOptions, attachmentTypes } from '../data/mockData'
import type { Rating, Attachment } from '../types'

export default function SubmitReview() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedCompany, setSelectedCompany] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    position: '',
    workYears: '',
    pros: '',
    cons: '',
    advice: '',
    ratings: {
      salary: 0,
      workLifeBalance: 0,
      growth: 0,
      management: 0,
      environment: 0,
    } as Rating,
    tags: [] as string[],
    attachments: [] as Attachment[],
    agreeToTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const filteredCompanies = mockCompanies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const ratingLabels: Record<keyof Rating, string> = {
    salary: '薪资待遇',
    workLifeBalance: '工作生活平衡',
    growth: '晋升空间',
    management: '管理氛围',
    environment: '办公环境',
  }

  const updateRating = (key: keyof Rating, value: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: value }
    }))
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleFileUpload = (type: Attachment['type']) => {
    // 模拟文件上传
    const newAttachment: Attachment = {
      id: `a${Date.now()}`,
      type,
      name: `${attachmentTypes.find(t => t.value === type)?.label}.pdf`,
      url: `/files/${Date.now()}.pdf`,
      uploadedAt: new Date().toISOString().split('T')[0],
    }
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, newAttachment]
    }))
  }

  const removeAttachment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(a => a.id !== id)
    }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">提交成功！</h2>
        <p className="text-gray-600 mb-8">
          您的评价已提交审核，审核通过后将在 1-3 个工作日内显示。
          感谢您为求职者社区做出的贡献！
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            返回首页
          </button>
          <button onClick={() => {
            setSubmitted(false)
            setStep(1)
            setSelectedCompany('')
            setFormData({
              position: '',
              workYears: '',
              pros: '',
              cons: '',
              advice: '',
              ratings: { salary: 0, workLifeBalance: 0, growth: 0, management: 0, environment: 0 },
              tags: [],
              attachments: [],
              agreeToTerms: false,
            })
          }} className="btn btn-secondary">
            继续评价
          </button>
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
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                  s <= step
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-1 rounded transition-colors ${
                    s < step ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            选择企业
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            填写评价
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            上传证明
          </span>
          <span className={step >= 4 ? 'text-primary-600 font-medium' : 'text-gray-400'}>
            确认提交
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Company */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">选择要评价的企业</h2>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="搜索企业名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-4"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <motion.button
                  key={company.id}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedCompany === company.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-600">
                        {company.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{company.name}</p>
                        <p className="text-sm text-gray-500">
                          {company.industry} · {company.location}
                        </p>
                      </div>
                    </div>
                    {selectedCompany === company.id && (
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => selectedCompany && setStep(2)}
                disabled={!selectedCompany}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Fill Review */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              填写评价详情
              <span className="text-sm font-normal text-gray-500 ml-2">
                评价 {mockCompanies.find(c => c.id === selectedCompany)?.name}
              </span>
            </h2>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">您的职位</label>
                  <input
                    type="text"
                    placeholder="如：后端开发工程师"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">工作年限</label>
                  <select
                    value={formData.workYears}
                    onChange={(e) => setFormData({ ...formData, workYears: e.target.value })}
                    className="input"
                  >
                    <option value="">请选择</option>
                    <option value="实习">实习</option>
                    <option value="应届">应届</option>
                    <option value="1-3年">1-3年</option>
                    <option value="3-5年">3-5年</option>
                    <option value="5-10年">5-10年</option>
                    <option value="10年以上">10年以上</option>
                  </select>
                </div>
              </div>

              {/* Ratings */}
              <div>
                <label className="label mb-4">综合评分</label>
                <div className="space-y-4">
                  {(Object.keys(formData.ratings) as Array<keyof Rating>).map((key) => (
                    <div key={key} className="flex items-center gap-4">
                      <span className="w-32 text-sm text-gray-600">{ratingLabels[key]}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => updateRating(key, star)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formData.ratings[key]
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formData.ratings[key] > 0 ? `${formData.ratings[key]}分` : '未评分'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div>
                <label className="label">优点</label>
                <textarea
                  placeholder="这家公司有哪些值得称赞的地方？"
                  value={formData.pros}
                  onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
                  className="input min-h-24 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="label">缺点</label>
                <textarea
                  placeholder="这家公司有哪些需要改进的地方？"
                  value={formData.cons}
                  onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
                  className="input min-h-24 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="label">给求职者的建议</label>
                <textarea
                  placeholder="您对想加入这家公司的求职者有什么建议？"
                  value={formData.advice}
                  onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                  className="input min-h-24 resize-none"
                  rows={3}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="label mb-3">选择标签（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        formData.tags.includes(tag)
                          ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                          : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="btn btn-secondary">
                上一步
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.position || !formData.workYears || formData.pros.length < 20}
                className="btn btn-primary disabled:opacity-50"
              >
                下一步
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Upload Proofs */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl mb-6">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">为什么需要证明材料？</p>
                <p>为了确保评价的真实性，我们要求用户提供相关证明材料。您的材料仅用于审核，不会公开显示。所有信息都会严格保密。</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">上传证明材料（可选但建议）</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {attachmentTypes.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleFileUpload(value)}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/50 transition-all group"
                >
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-primary-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                </button>
              ))}
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-gray-700">已上传文件：</p>
                {formData.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeAttachment(file.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="btn btn-secondary">
                上一步
              </button>
              <button onClick={() => setStep(4)} className="btn btn-primary">
                下一步
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">确认提交</h2>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">企业</span>
                  <span className="font-medium">{mockCompanies.find(c => c.id === selectedCompany)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">职位</span>
                  <span className="font-medium">{formData.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">工作年限</span>
                  <span className="font-medium">{formData.workYears}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">证明材料</span>
                  <span className="font-medium">{formData.attachments.length} 份</span>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  我确认以上信息真实准确，并同意
                  <a href="#" className="text-primary-600 hover:underline">《用户协议》</a>
                  和
                  <a href="#" className="text-primary-600 hover:underline">《隐私政策》</a>
                </span>
              </label>

              <div className="p-4 bg-yellow-50 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
                <p className="text-sm text-yellow-800">
                  请确保您的评价客观真实。虚假评价可能导致账号被封禁，并承担相应法律责任。
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(3)} className="btn btn-secondary">
                上一步
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms}
                className="btn btn-primary disabled:opacity-50"
              >
                提交评价
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
