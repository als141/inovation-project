export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const SECTIONS = {
  SPORTS: 'sports',
  FOOD: 'food',
  MARKETPLACE: 'marketplace',
  RESEARCH: 'research',
  CAREER: 'career',
} as const;

export const SPORTS_CATEGORIES = [
  { id: 'basketball', name: 'バスケットボール', icon: '🏀' },
  { id: 'soccer', name: 'サッカー', icon: '⚽' },
  { id: 'tennis', name: 'テニス', icon: '🎾' },
  { id: 'volleyball', name: 'バレーボール', icon: '🏐' },
  { id: 'badminton', name: 'バドミントン', icon: '🏸' },
  { id: 'table-tennis', name: '卓球', icon: '🏓' },
  { id: 'baseball', name: '野球', icon: '⚾' },
  { id: 'swimming', name: '水泳', icon: '🏊' },
] as const;

export const FOOD_CATEGORIES = [
  { id: 'japanese', name: '和食', icon: '🍱' },
  { id: 'western', name: '洋食', icon: '🍝' },
  { id: 'chinese', name: '中華', icon: '🍜' },
  { id: 'cafe', name: 'カフェ', icon: '☕' },
  { id: 'fast-food', name: 'ファストフード', icon: '🍔' },
  { id: 'dessert', name: 'デザート', icon: '🍰' },
] as const;

export const MARKETPLACE_CATEGORIES = [
  { id: 'textbooks', name: '教科書・参考書', icon: '📚' },
  { id: 'electronics', name: '家電・電子機器', icon: '📱' },
  { id: 'furniture', name: '家具・インテリア', icon: '🪑' },
  { id: 'clothing', name: '衣類・アクセサリー', icon: '👕' },
  { id: 'manga', name: '漫画・小説', icon: '📖' },
  { id: 'sports-gear', name: 'スポーツ用品', icon: '⚽' },
  { id: 'stationery', name: '文房具', icon: '✏️' },
  { id: 'other', name: 'その他', icon: '📦' },
] as const;

export const RESEARCH_FIELDS = [
  { id: 'computer-science', name: '情報工学', color: '#3B82F6' },
  { id: 'physics', name: '物理学', color: '#8B5CF6' },
  { id: 'mathematics', name: '数学', color: '#10B981' },
  { id: 'chemistry', name: '化学', color: '#F59E0B' },
  { id: 'biology', name: '生物学', color: '#EF4444' },
  { id: 'economics', name: '経済学', color: '#6366F1' },
  { id: 'psychology', name: '心理学', color: '#EC4899' },
  { id: 'engineering', name: '工学', color: '#84CC16' },
] as const;

export const CAREER_INDUSTRIES = [
  { id: 'tech', name: 'IT・技術', icon: '💻' },
  { id: 'finance', name: '金融', icon: '💰' },
  { id: 'consulting', name: 'コンサルティング', icon: '📊' },
  { id: 'manufacturing', name: '製造業', icon: '🏭' },
  { id: 'healthcare', name: '医療・福祉', icon: '🏥' },
  { id: 'education', name: '教育', icon: '🎓' },
  { id: 'media', name: 'メディア・広告', icon: '📺' },
  { id: 'government', name: '公務員', icon: '🏛️' },
] as const;

export const SKILL_LEVELS = [
  { id: 'beginner', name: '初心者', color: '#10B981' },
  { id: 'intermediate', name: '中級者', color: '#F59E0B' },
  { id: 'advanced', name: '上級者', color: '#EF4444' },
] as const;

export const ITEM_CONDITIONS = [
  { id: 'new', name: '新品', description: '未使用品' },
  { id: 'like-new', name: '美品', description: 'ほぼ新品同様' },
  { id: 'good', name: '良好', description: '目立った傷なし' },
  { id: 'fair', name: '普通', description: '使用感あり' },
] as const;

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const ACTIVITY_TYPES = {
  POST: 'post',
  COMMENT: 'comment',
  LIKE: 'like',
  PARTICIPATION: 'participation',
  REVIEW: 'review',
} as const;

export const TOKEN_REWARDS = {
  DAILY_LOGIN: 10,
  POST_CREATION: 5,
  COMMENT: 2,
  REVIEW: 8,
  EVENT_PARTICIPATION: 15,
  QUESTION_ANSWER: 20,
  BEST_ANSWER: 50,
} as const;

export const DEFAULT_AVATAR = '/avatars/default.png';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGES_PER_POST = 5;
export const MAX_PARTICIPANTS_DEFAULT = 20;

export const UNIVERSITIES = [
  '東京大学',
  '京都大学',
  '大阪大学',
  '名古屋大学',
  '東北大学',
  '九州大学',
  '北海道大学',
  '慶應義塾大学',
  '早稲田大学',
  '東京工業大学',
] as const;

export const MAJORS = [
  '情報工学科',
  '電気電子工学科',
  '機械工学科',
  '建築学科',
  '化学工学科',
  '物理学科',
  '数学科',
  '経済学部',
  '法学部',
  '文学部',
] as const;