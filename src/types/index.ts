// 企业评分维度
export interface Rating {
  salary: number;        // 薪资待遇 1-5
  workLifeBalance: number; // 加班文化 1-5
  growth: number;        // 晋升空间 1-5
  management: number;    // 管理氛围 1-5
  environment: number;   // 办公环境 1-5
}

// 企业信息
export interface Company {
  id: string;
  name: string;
  industry: string;
  scale: '0-20' | '20-99' | '100-499' | '500-999' | '1000+' | '10000+';
  location: string;
  logo?: string;
  website?: string;
  description: string;
  avgRating: number;
  ratingCount: number;
  ratings: Rating;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 评价内容
export interface Review {
  id: string;
  companyId: string;
  userId: string;
  userNickname: string;
  position: string;
  workYears: string;
  pros: string;           // 优点
  cons: string;           // 缺点
  advice: string;         // 给求职者的建议
  ratings: Rating;
  overallRating: number;  // 总体评价 1-5
  tags: string[];
  attachments: Attachment[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewerId?: string;
}

// 附件材料
export interface Attachment {
  id: string;
  type: 'social_security' | 'contract' | 'screenshot' | 'photo' | 'other';
  name: string;
  url: string;
  uploadedAt: string;
}

// 用户
export interface User {
  id: string;
  nickname: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'reviewer';
  reviewCount: number;
  createdAt: string;
}

// 统计数据
export interface Statistics {
  totalCompanies: number;
  totalReviews: number;
  pendingReviews: number;
  industryStats: { industry: string; count: number; avgRating: number }[];
  salaryDistribution: { range: string; count: number }[];
  topTags: { tag: string; count: number }[];
  recentTrends: { date: string; reviews: number }[];
}

// 筛选条件
export interface FilterOptions {
  industry?: string;
  scale?: string;
  location?: string;
  minRating?: number;
  tags?: string[];
  search?: string;
  sortBy?: 'rating' | 'reviews' | 'latest';
}
