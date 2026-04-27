import type { Company, Review, Statistics, Attachment } from '../types';

// 模拟企业数据
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: '字节跳动',
    industry: '互联网',
    scale: '10000+',
    location: '北京',
    description: '字节跳动是一家全球化互联网科技公司，旗下产品包括抖音、今日头条等。',
    avgRating: 3.8,
    ratingCount: 1256,
    ratings: { salary: 4.2, workLifeBalance: 2.8, growth: 4.0, management: 3.5, environment: 4.2 },
    tags: ['成长快', '压力大', '福利好', '技术氛围浓', '996'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '2',
    name: '腾讯',
    industry: '互联网',
    scale: '10000+',
    location: '深圳',
    description: '腾讯是中国领先的互联网增值服务提供商。',
    avgRating: 4.1,
    ratingCount: 2341,
    ratings: { salary: 4.5, workLifeBalance: 3.5, growth: 4.2, management: 3.8, environment: 4.5 },
    tags: ['福利好', '稳定', '内卷', '大厂光环', '加班适中'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '3',
    name: '阿里巴巴',
    industry: '互联网',
    scale: '10000+',
    location: '杭州',
    description: '阿里巴巴集团是全球领先的电子商务公司。',
    avgRating: 3.6,
    ratingCount: 1876,
    ratings: { salary: 4.0, workLifeBalance: 2.5, growth: 4.2, management: 3.2, environment: 4.0 },
    tags: ['996', '成长快', '福利还可以', '技术好', '压力大'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '4',
    name: '小红书',
    industry: '互联网',
    scale: '1000+',
    location: '上海',
    description: '小红书是一个生活方式平台和消费决策入口。',
    avgRating: 3.9,
    ratingCount: 456,
    ratings: { salary: 4.0, workLifeBalance: 3.2, growth: 4.0, management: 3.6, environment: 4.3 },
    tags: ['氛围轻松', '年轻化', '福利好', '发展快'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '5',
    name: '华为',
    industry: '通信',
    scale: '10000+',
    location: '深圳',
    description: '华为是全球领先的ICT（信息与通信）基础设施和智能终端提供商。',
    avgRating: 3.5,
    ratingCount: 1523,
    ratings: { salary: 4.3, workLifeBalance: 2.2, growth: 4.0, management: 3.0, environment: 3.8 },
    tags: ['加班多', '薪资高', '狼性文化', '技术强', '稳定'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '6',
    name: '拼多多',
    industry: '互联网',
    scale: '10000+',
    location: '上海',
    description: '拼多多是新电商平台开创者。',
    avgRating: 3.2,
    ratingCount: 892,
    ratings: { salary: 4.5, workLifeBalance: 1.8, growth: 3.8, management: 2.8, environment: 3.5 },
    tags: ['薪资高', '996', '压力大', '股票好', '节奏快'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '7',
    name: '美团',
    industry: '互联网',
    scale: '10000+',
    location: '北京',
    description: '美团是中国领先的生活服务电子商务平台。',
    avgRating: 3.7,
    ratingCount: 1345,
    ratings: { salary: 3.8, workLifeBalance: 3.0, growth: 3.9, management: 3.4, environment: 4.0 },
    tags: ['业务多', '加班一般', '福利还行', '发展稳定'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
  {
    id: '8',
    name: '小米',
    industry: '电子',
    scale: '10000+',
    location: '北京',
    description: '小米是一家以手机、智能硬件和IoT平台为核心的互联网公司。',
    avgRating: 3.8,
    ratingCount: 987,
    ratings: { salary: 3.8, workLifeBalance: 3.5, growth: 3.8, management: 3.6, environment: 4.2 },
    tags: ['氛围好', '福利一般', '加班不多', '扁平化'],
    createdAt: '2024-01-01',
    updatedAt: '2024-12-01',
  },
];

// 模拟评价数据
export const mockReviews: Review[] = [
  {
    id: 'r1',
    companyId: '1',
    userId: 'u1',
    userNickname: '匿名用户***123',
    position: '后端开发工程师',
    workYears: '1-3年',
    pros: '技术氛围很好，同事都很nice，能学到很多东西。福利待遇不错，食堂好吃。',
    cons: '加班确实多，基本996，压力比较大。晋升竞争激烈。',
    advice: '技术好的同学可以考虑，但要做好加班的心理准备。',
    ratings: { salary: 4, workLifeBalance: 2, growth: 4, management: 3, environment: 4 },
    overallRating: 3,
    tags: ['技术氛围好', '加班多'],
    attachments: [
      { id: 'a1', type: 'social_security', name: '社保缴纳证明.pdf', url: '/files/a1.pdf', uploadedAt: '2024-06-01' }
    ],
    status: 'approved',
    createdAt: '2024-06-15',
    reviewedAt: '2024-06-16',
  },
  {
    id: 'r2',
    companyId: '2',
    userId: 'u2',
    userNickname: '匿名用户***456',
    position: '产品经理',
    workYears: '3-5年',
    pros: '大厂光环，薪资待遇好，福利完善。平台大，能接触到的业务也多。',
    cons: '部门之间协调有时候很累，某些领导风格一般。',
    advice: '适合想稳定发展的人，但也需要主动寻找机会。',
    ratings: { salary: 5, workLifeBalance: 4, growth: 4, management: 3, environment: 5 },
    overallRating: 4,
    tags: ['福利好', '稳定'],
    attachments: [
      { id: 'a2', type: 'contract', name: '劳动合同照片.jpg', url: '/files/a2.jpg', uploadedAt: '2024-05-20' }
    ],
    status: 'approved',
    createdAt: '2024-05-25',
    reviewedAt: '2024-05-26',
  },
  {
    id: 'r3',
    companyId: '5',
    userId: 'u3',
    userNickname: '匿名用户***789',
    position: '硬件工程师',
    workYears: '5-10年',
    pros: '技术实力强，能接触到核心项目。薪资在行业内算高的。',
    cons: '加班非常多，基本没有个人时间。管理比较僵化。',
    advice: '想赚钱、学技术的可以来，但要做好牺牲生活的准备。',
    ratings: { salary: 5, workLifeBalance: 1, growth: 4, management: 2, environment: 3 },
    overallRating: 3,
    tags: ['薪资高', '加班多', '技术强'],
    attachments: [],
    status: 'approved',
    createdAt: '2024-04-10',
    reviewedAt: '2024-04-11',
  },
  {
    id: 'r4',
    companyId: '6',
    userId: 'u4',
    userNickname: '匿名用户***321',
    position: '前端开发',
    workYears: '1-3年',
    pros: '薪资确实高，期权有机会。',
    cons: '11-11-6，几乎没有个人生活。团队流动率很高。',
    advice: '年轻想赚快钱的可以来，不建议长期待。',
    ratings: { salary: 5, workLifeBalance: 1, growth: 3, management: 2, environment: 3 },
    overallRating: 2,
    tags: ['薪资高', '996', '压力大'],
    attachments: [
      { id: 'a3', type: 'screenshot', name: '工时截图.png', url: '/files/a3.png', uploadedAt: '2024-03-15' }
    ],
    status: 'pending',
    createdAt: '2024-03-20',
  },
];

// 模拟统计数据
export const mockStatistics: Statistics = {
  totalCompanies: 8,
  totalReviews: 9833,
  pendingReviews: 47,
  industryStats: [
    { industry: '互联网', count: 5, avgRating: 3.7 },
    { industry: '通信', count: 1, avgRating: 3.5 },
    { industry: '电子', count: 1, avgRating: 3.8 },
    { industry: '金融', count: 0, avgRating: 0 },
    { industry: '教育', count: 0, avgRating: 0 },
  ],
  salaryDistribution: [
    { range: '10K以下', count: 523 },
    { range: '10-20K', count: 2134 },
    { range: '20-30K', count: 3456 },
    { range: '30-50K', count: 2890 },
    { range: '50K以上', count: 830 },
  ],
  topTags: [
    { tag: '福利好', count: 1234 },
    { tag: '加班多', count: 987 },
    { tag: '薪资高', count: 876 },
    { tag: '氛围好', count: 654 },
    { tag: '成长快', count: 543 },
    { tag: '996', count: 432 },
    { tag: '稳定', count: 321 },
    { tag: '技术强', count: 234 },
  ],
  recentTrends: [
    { date: '2024-06-01', reviews: 45 },
    { date: '2024-06-02', reviews: 52 },
    { date: '2024-06-03', reviews: 38 },
    { date: '2024-06-04', reviews: 61 },
    { date: '2024-06-05', reviews: 55 },
    { date: '2024-06-06', reviews: 48 },
    { date: '2024-06-07', reviews: 67 },
  ],
};

// 行业列表
export const industries = [
  '全部', '互联网', '通信', '电子', '金融', '教育', '医疗', '房地产', '零售', '制造业', '其他'
];

// 企业规模
export const scales = ['全部', '0-20', '20-99', '100-499', '500-999', '1000+', '10000+'];

// 热门城市
export const locations = ['全部', '北京', '上海', '深圳', '杭州', '广州', '成都', '武汉', '南京', '西安'];

// 标签选项
export const tagOptions = [
  '福利好', '薪资高', '加班多', '996', '氛围好', '成长快', '技术强', 
  '稳定', '压力小', '扁平化', '狼性文化', '内卷', '晋升难', '管理混乱'
];

// 附件类型
export const attachmentTypes: { value: Attachment['type']; label: string }[] = [
  { value: 'social_security', label: '社保缴纳记录' },
  { value: 'contract', label: '劳动合同/offer' },
  { value: 'screenshot', label: '软件截图' },
  { value: 'photo', label: '现场照片' },
  { value: 'other', label: '其他证明材料' },
];
