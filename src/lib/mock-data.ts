import { 
  User, SportsEvent, Tournament, Sport, Participation, MenuItem, Review, MealInvitation, 
  Restaurant, MarketItem, Category, ResearchPaper, Discussion, ResearchQuestion, Field, 
  Company, JobPosting, CareerEvent, Internship, Notification, Activity, Event, Achievement
} from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    studentId: 'N22001234',
    major: '情報工学科',
    year: 3,
    avatar: '/avatars/tanaka.jpg',
    tokens: 150,
    createdAt: new Date('2024-04-01'),
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    studentId: 'N22001235',
    major: '電気電子工学科',
    year: 2,
    avatar: '/avatars/sato.jpg',
    tokens: 230,
    createdAt: new Date('2024-04-02'),
  },
  {
    id: '3',
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    studentId: 'N21001100',
    major: '経済学部',
    year: 4,
    avatar: '/avatars/suzuki.jpg',
    tokens: 89,
    createdAt: new Date('2023-04-01'),
  },
  {
    id: '4',
    name: '高橋美咲',
    email: 'takahashi@example.com',
    studentId: 'N23001456',
    major: '文学部',
    year: 1,
    avatar: '/avatars/takahashi.jpg',
    tokens: 45,
    createdAt: new Date('2024-04-01'),
  },
  {
    id: '5',
    name: '山田健二',
    email: 'yamada@example.com',
    studentId: 'N22001789',
    major: '機械工学科',
    year: 3,
    avatar: '/avatars/yamada.jpg',
    tokens: 312,
    createdAt: new Date('2024-04-01'),
  },
];

export const mockSportsEvents: SportsEvent[] = [
  {
    id: '1',
    title: 'バスケットボール定期戦',
    sport: 'basketball',
    date: new Date('2025-06-15T15:00:00'),
    location: '第一体育館',
    maxParticipants: 10,
    currentParticipants: mockUsers.slice(0, 6),
    description: '毎週土曜日の定期戦です。初心者歓迎！一緒に汗を流しましょう。',
    skillLevel: 'beginner',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'テニスサークル練習会',
    sport: 'tennis',
    date: new Date('2025-06-12T16:00:00'),
    location: 'テニスコート',
    maxParticipants: 8,
    currentParticipants: mockUsers.slice(1, 4),
    description: '基礎から応用まで、レベルに合わせて練習します。',
    skillLevel: 'intermediate',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'サッカー練習試合',
    sport: 'soccer',
    date: new Date('2025-06-18T14:00:00'),
    location: 'グラウンド',
    maxParticipants: 22,
    currentParticipants: mockUsers.slice(0, 15),
    description: '他大学との練習試合です。観戦も歓迎！',
    skillLevel: 'advanced',
    status: 'upcoming',
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '唐揚げ定食',
    restaurant: '学食A',
    price: 450,
    category: 'japanese',
    rating: 4.2,
    description: 'ボリューム満点の人気メニュー',
    image: '/food/karaage.jpg',
  },
  {
    id: '2',
    name: 'カレーライス',
    restaurant: '学食B',
    price: 380,
    category: 'japanese',
    rating: 3.8,
    description: 'スパイシーで本格的な味',
    image: '/food/curry.jpg',
  },
  {
    id: '3',
    name: 'パスタランチ',
    restaurant: 'カフェテリア',
    price: 520,
    category: 'western',
    rating: 4.5,
    description: '日替わりパスタセット',
    image: '/food/pasta.jpg',
  },
];

export const mockMarketItems: MarketItem[] = [
  {
    id: '1',
    title: 'プログラミング入門書セット',
    sellerId: '3',
    category: 'textbooks',
    condition: 'good',
    price: 2500,
    description: 'C言語とJavaの入門書です。書き込み少しありますが、十分使えます。',
    photos: ['/items/programming-books.jpg'],
    location: '大学内',
    deliveryMethods: ['手渡し', '学内配送'],
    status: 'available',
    createdAt: new Date('2025-06-08'),
    views: 45,
    favorites: 12,
  },
  {
    id: '2',
    title: 'ノートパソコン（ThinkPad）',
    sellerId: '2',
    category: 'electronics',
    condition: 'like-new',
    price: 45000,
    description: '研究用に使っていましたが、新しいものを購入したため出品します。',
    photos: ['/items/thinkpad.jpg'],
    location: '大学近辺',
    deliveryMethods: ['手渡し'],
    status: 'available',
    createdAt: new Date('2025-06-09'),
    views: 123,
    favorites: 28,
  },
];

export const mockResearchPapers: ResearchPaper[] = [
  {
    id: '1',
    title: '機械学習を用いた画像認識システムの改良',
    authors: ['田中太郎', '指導教員名'],
    abstract: '深層学習を用いた画像認識の精度向上について研究しました...',
    field: 'computer-science',
    keywords: ['機械学習', '画像認識', '深層学習'],
    files: ['/papers/ml-image-recognition.pdf'],
    accessLevel: 'public',
    publishedAt: new Date('2025-06-01'),
    downloads: 234,
    citations: 12,
  },
  {
    id: '2',
    title: '量子計算における誤り訂正手法の検討',
    authors: ['佐藤花子'],
    abstract: '量子コンピュータの実用化に向けた誤り訂正について...',
    field: 'physics',
    keywords: ['量子計算', '誤り訂正', '量子情報'],
    files: ['/papers/quantum-error-correction.pdf'],
    accessLevel: 'protected',
    password: 'quantum2025',
    publishedAt: new Date('2025-05-28'),
    downloads: 89,
    citations: 5,
  },
];

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'テックソリューション株式会社',
    industry: 'tech',
    size: '中規模（100-500名）',
    description: 'AIとクラウドサービスを専門とするIT企業',
    website: 'https://techsolution.example.com',
    logo: '/companies/techsolution.png',
    location: '東京都渋谷区',
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: '2',
    name: '未来金融グループ',
    industry: 'finance',
    size: '大企業（1000名以上）',
    description: 'フィンテックソリューションを提供する金融会社',
    website: 'https://mirai-finance.example.com',
    logo: '/companies/mirai-finance.png',
    location: '東京都千代田区',
    rating: 3.9,
    reviewCount: 89,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'info',
    title: '新しいイベント',
    message: 'バスケットボール定期戦への参加者を募集中です',
    read: false,
    createdAt: new Date('2025-06-10T10:00:00'),
    actionUrl: '/sports/1',
  },
  {
    id: '2',
    userId: '1',
    type: 'success',
    title: 'トークン獲得',
    message: '投稿へのいいねで5トークン獲得しました',
    read: false,
    createdAt: new Date('2025-06-10T09:30:00'),
  },
  {
    id: '3',
    userId: '1',
    type: 'warning',
    title: '申込期限',
    message: '企業説明会の申込期限が近づいています',
    read: true,
    createdAt: new Date('2025-06-09T15:00:00'),
    actionUrl: '/career/events',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '2',
    type: 'post',
    section: 'sports',
    description: '新しいテニス練習会を投稿しました',
    targetId: '2',
    createdAt: new Date('2025-06-10T14:30:00'),
  },
  {
    id: '2',
    userId: '3',
    type: 'review',
    section: 'food',
    description: '学食Aの唐揚げ定食をレビューしました',
    targetId: '1',
    createdAt: new Date('2025-06-10T12:15:00'),
  },
  {
    id: '3',
    userId: '1',
    type: 'participation',
    section: 'sports',
    description: 'バスケットボール定期戦に参加申込しました',
    targetId: '1',
    createdAt: new Date('2025-06-10T11:00:00'),
  },
];

export const mockUpcomingEvents: Event[] = [
  {
    id: '1',
    title: 'バスケットボール定期戦',
    type: 'sports',
    date: new Date('2025-06-15T15:00:00'),
    location: '第一体育館',
    description: '毎週土曜日の定期戦',
    attendees: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    title: '企業説明会 - テックソリューション',
    type: 'career',
    date: new Date('2025-06-16T13:00:00'),
    location: '大講義室A',
    description: 'AI企業による技術職説明会',
    attendees: ['1', '3'],
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: '初投稿',
    description: '初めての投稿を作成しました',
    icon: '📝',
    color: '#10B981',
    requirement: '投稿を1回する',
    rarity: 'common',
  },
  {
    id: '2',
    title: 'スポーツ愛好家',
    description: '10回のスポーツイベントに参加しました',
    icon: '🏆',
    color: '#F59E0B',
    requirement: 'スポーツイベントに10回参加',
    rarity: 'uncommon',
  },
  {
    id: '3',
    title: 'レビューマスター',
    description: '50件のレビューを投稿しました',
    icon: '⭐',
    color: '#8B5CF6',
    requirement: 'レビューを50件投稿',
    rarity: 'rare',
  },
];

export const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: '春季バスケットボール大会',
    sport: 'basketball',
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-07-03'),
    maxTeams: 16,
    currentTeams: 12,
    registrationDeadline: new Date('2025-06-25'),
    status: 'registration',
  },
];

export const mockSports: Sport[] = [
  {
    id: '1',
    name: 'バスケットボール',
    category: '球技',
    participants: 145,
    difficulty: '初級〜上級',
  },
  {
    id: '2',
    name: 'テニス',
    category: 'ラケット',
    participants: 89,
    difficulty: '初級〜中級',
  },
];

export const mockParticipations: Participation[] = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    status: 'registered',
    registeredAt: new Date('2025-06-10'),
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    authorId: '1',
    menuItemId: '1',
    rating: 4,
    comment: 'ボリュームがあって美味しかったです！',
    photos: ['/reviews/karaage-review.jpg'],
    tags: ['ボリューム満点', '美味しい'],
    createdAt: new Date('2025-06-10'),
    helpful: 12,
  },
];

export const mockMealInvitations: MealInvitation[] = [
  {
    id: '1',
    authorId: '2',
    mealType: 'lunch',
    datetime: new Date('2025-06-12T12:00:00'),
    restaurant: '学食A',
    maxPeople: 4,
    currentPeople: 2,
    message: 'お昼一緒に食べませんか？',
    participants: mockUsers.slice(0, 2),
    status: 'open',
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '学食A',
    category: 'japanese',
    location: '1号館1階',
    rating: 4.1,
    priceRange: '300-600円',
    image: '/restaurants/gakushoku-a.jpg',
    description: '定食メニューが豊富な学食',
  },
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: '教科書・参考書',
    icon: '📚',
    itemCount: 156,
  },
  {
    id: '2',
    name: '家電・電子機器',
    icon: '📱',
    itemCount: 89,
  },
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: '量子コンピュータの将来性について',
    field: 'physics',
    authorId: '2',
    content: '量子コンピュータの実用化について議論しましょう',
    replies: [],
    createdAt: new Date('2025-06-08'),
    lastActiveAt: new Date('2025-06-10'),
    participants: ['2', '1', '3'],
  },
];

export const mockResearchQuestions: ResearchQuestion[] = [
  {
    id: '1',
    title: 'Pythonでの並列処理の最適化方法',
    field: 'computer-science',
    difficulty: 'undergraduate',
    content: 'マルチプロセシングとマルチスレッドの使い分けについて教えてください',
    bounty: 50,
    tags: ['Python', '並列処理', '最適化'],
    authorId: '1',
    answers: [],
    status: 'open',
    createdAt: new Date('2025-06-09'),
  },
];

export const mockFields: Field[] = [
  {
    id: '1',
    name: '情報工学',
    description: 'コンピュータサイエンス・プログラミング',
    color: '#3B82F6',
    participantCount: 234,
  },
  {
    id: '2',
    name: '物理学',
    description: '理論物理・実験物理',
    color: '#8B5CF6',
    participantCount: 156,
  },
];

export const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    companyId: '1',
    title: 'ソフトウェアエンジニア（新卒）',
    type: 'fulltime',
    location: '東京都渋谷区',
    description: 'WebアプリケーションやAIシステムの開発',
    requirements: ['プログラミング経験', 'チーム開発経験'],
    salary: '月給25万円〜',
    deadline: new Date('2025-07-31'),
    status: 'open',
    applicants: 45,
  },
];

export const mockCareerEvents: CareerEvent[] = [
  {
    id: '1',
    title: 'テックソリューション企業説明会',
    type: 'seminar',
    companyId: '1',
    date: new Date('2025-06-16T13:00:00'),
    location: '大講義室A',
    description: 'AI・クラウド事業について詳しく説明します',
    maxAttendees: 100,
    currentAttendees: 67,
    registrationRequired: true,
    status: 'upcoming',
  },
];

export const mockInternships: Internship[] = [
  {
    id: '1',
    companyId: '1',
    title: 'サマーインターンシップ（エンジニア）',
    duration: '2週間',
    stipend: 100000,
    location: '東京都渋谷区',
    description: '実際の開発プロジェクトに参加していただきます',
    requirements: ['プログラミング基礎', 'Git使用経験'],
    applicationDeadline: new Date('2025-06-30'),
    startDate: new Date('2025-08-01'),
    status: 'open',
  },
];

// Get current user (for demo purposes)
export const getCurrentUser = (): User => mockUsers[0];

// Helper functions for mock data
export const getMockDataBySection = (section: string) => {
  switch (section) {
    case 'sports':
      return {
        events: mockSportsEvents,
        tournaments: mockTournaments,
        sports: mockSports,
        participations: mockParticipations,
      };
    case 'food':
      return {
        menuItems: mockMenuItems,
        reviews: mockReviews,
        invitations: mockMealInvitations,
        restaurants: mockRestaurants,
      };
    case 'marketplace':
      return {
        items: mockMarketItems,
        categories: mockCategories,
      };
    case 'research':
      return {
        papers: mockResearchPapers,
        discussions: mockDiscussions,
        questions: mockResearchQuestions,
        fields: mockFields,
      };
    case 'career':
      return {
        companies: mockCompanies,
        jobs: mockJobPostings,
        events: mockCareerEvents,
        internships: mockInternships,
      };
    default:
      return {};
  }
};