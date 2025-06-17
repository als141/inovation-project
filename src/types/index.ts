export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  major: string;
  year: number;
  avatar: string;
  tokens: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  section: 'sports' | 'food' | 'marketplace' | 'research' | 'career';
  title: string;
  content: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface SportsEvent {
  id: string;
  title: string;
  sport: string;
  date: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: User[];
  description: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  startDate: Date;
  endDate: Date;
  maxTeams: number;
  currentTeams: number;
  registrationDeadline: Date;
  status: 'registration' | 'ongoing' | 'completed';
}

export interface Sport {
  id: string;
  name: string;
  category: string;
  participants: number;
  difficulty: string;
}

export interface Participation {
  id: string;
  userId: string;
  eventId: string;
  status: 'registered' | 'attended' | 'absent';
  registeredAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  category: string;
  rating: number;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  authorId: string;
  menuItemId: string;
  rating: number;
  comment: string;
  photos: string[];
  tags: string[];
  createdAt: Date;
  helpful: number;
}

export interface MealInvitation {
  id: string;
  authorId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  datetime: Date;
  restaurant: string;
  maxPeople: number;
  currentPeople: number;
  message: string;
  participants: User[];
  status: 'open' | 'full' | 'closed';
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  priceRange: string;
  image: string;
  description: string;
}

export interface MarketItem {
  id: string;
  title: string;
  sellerId: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  price: number;
  description: string;
  photos: string[];
  location: string;
  deliveryMethods: string[];
  status: 'available' | 'sold' | 'reserved';
  createdAt: Date;
  views: number;
  favorites: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export interface Question {
  id: string;
  authorId: string;
  itemId: string;
  content: string;
  answer?: string;
  createdAt: Date;
  answeredAt?: Date;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  field: string;
  keywords: string[];
  files: string[];
  accessLevel: 'public' | 'protected' | 'private';
  password?: string;
  publishedAt: Date;
  downloads: number;
  citations: number;
}

export interface Discussion {
  id: string;
  title: string;
  field: string;
  authorId: string;
  content: string;
  replies: Reply[];
  createdAt: Date;
  lastActiveAt: Date;
  participants: string[];
}

export interface Reply {
  id: string;
  discussionId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface ResearchQuestion {
  id: string;
  title: string;
  field: string;
  difficulty: 'undergraduate' | 'graduate' | 'expert';
  content: string;
  bounty: number;
  tags: string[];
  authorId: string;
  answers: Answer[];
  status: 'open' | 'answered' | 'closed';
  createdAt: Date;
}

export interface Answer {
  id: string;
  questionId: string;
  authorId: string;
  content: string;
  isAccepted: boolean;
  votes: number;
  createdAt: Date;
}

export interface Field {
  id: string;
  name: string;
  description: string;
  color: string;
  participantCount: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  description: string;
  website: string;
  logo: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export interface JobPosting {
  id: string;
  companyId: string;
  title: string;
  type: 'fulltime' | 'parttime' | 'internship' | 'contract';
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  deadline: Date;
  status: 'open' | 'closed';
  applicants: number;
}

export interface CareerEvent {
  id: string;
  title: string;
  type: 'seminar' | 'jobfair' | 'workshop' | 'networking';
  companyId?: string;
  date: Date;
  location: string;
  description: string;
  maxAttendees: number;
  currentAttendees: number;
  registrationRequired: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Internship {
  id: string;
  companyId: string;
  title: string;
  duration: string;
  stipend?: number;
  location: string;
  description: string;
  requirements: string[];
  applicationDeadline: Date;
  startDate: Date;
  status: 'open' | 'closed';
}

export interface CompanyReview {
  id: string;
  companyId: string;
  authorId: string;
  position: string;
  rating: number;
  pros: string;
  cons: string;
  advice: string;
  workLifeBalance: number;
  culture: number;
  salary: number;
  createdAt: Date;
  helpful: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'template' | 'guide';
  url: string;
  description: string;
  tags: string[];
  rating: number;
  downloads: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'post' | 'comment' | 'like' | 'participation' | 'review';
  section: 'sports' | 'food' | 'marketplace' | 'research' | 'career';
  description: string;
  targetId: string;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  type: 'sports' | 'food' | 'research' | 'career' | 'other';
  date: Date;
  location: string;
  description: string;
  attendees: string[];
}

export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  reason: string;
  createdAt: Date;
  relatedId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface UserProfile {
  basicInfo: {
    name: string;
    email: string;
    studentId: string;
    major: string;
    year: number;
    bio: string;
    avatar: string;
  };
  activityStats: {
    postsCount: number;
    commentsCount: number;
    eventsAttended: number;
    itemsSold: number;
    reviewsWritten: number;
  };
  achievements: Achievement[];
  privacy: PrivacySettings;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showEmail: boolean;
  showStudentId: boolean;
  showActivityFeed: boolean;
  allowDirectMessages: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  sportsUpdates: boolean;
  foodUpdates: boolean;
  marketplaceUpdates: boolean;
  researchUpdates: boolean;
  careerUpdates: boolean;
  directMessages: boolean;
  eventReminders: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'en';
  compactMode: boolean;
}

export interface AccountSettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  dataExport: boolean;
  accountDeletion: boolean;
}

export interface Settings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
  account: AccountSettings;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface SearchResult {
  type: 'post' | 'event' | 'item' | 'paper' | 'company';
  id: string;
  title: string;
  description: string;
  section: string;
  score: number;
  highlight: string[];
}

export interface DashboardData {
  recentActivities: Activity[];
  upcomingEvents: Event[];
  notifications: Notification[];
  tokenBalance: number;
  quickStats: {
    unreadMessages: number;
    activeApplications: number;
    upcomingDeadlines: number;
  };
}

export interface SportsData {
  activeEvents: SportsEvent[];
  upcomingTournaments: Tournament[];
  popularSports: Sport[];
  myParticipations: Participation[];
}

export interface FoodData {
  todayMenu: MenuItem[];
  recentReviews: Review[];
  mealInvitations: MealInvitation[];
  nearbyRestaurants: Restaurant[];
}

export interface MarketplaceData {
  featuredItems: MarketItem[];
  categories: Category[];
  recentListings: MarketItem[];
  myListings: MarketItem[];
}

export interface ResearchData {
  featuredPapers: ResearchPaper[];
  activeDiscussions: Discussion[];
  recentQuestions: ResearchQuestion[];
  researchFields: Field[];
}

export interface CareerData {
  upcomingEvents: CareerEvent[];
  companySpotlight: Company[];
  internshipOpportunities: Internship[];
  careerResources: Resource[];
}