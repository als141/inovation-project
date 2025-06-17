'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Activity, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { 
  MessageCircle, 
  Heart, 
  Trophy, 
  Star, 
  FileText 
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
  users: User[];
  title?: string;
}

export function ActivityFeed({ activities, users, title = "最近のアクティビティ" }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="h-4 w-4" />;
      case 'comment': return <MessageCircle className="h-4 w-4" />;
      case 'like': return <Heart className="h-4 w-4" />;
      case 'participation': return <Trophy className="h-4 w-4" />;
      case 'review': return <Star className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getActivityColor = (section: string) => {
    switch (section) {
      case 'sports': return 'bg-orange-100 text-orange-800';
      case 'food': return 'bg-green-100 text-green-800';
      case 'marketplace': return 'bg-purple-100 text-purple-800';
      case 'research': return 'bg-indigo-100 text-indigo-800';
      case 'career': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSectionLabel = (section: string) => {
    switch (section) {
      case 'sports': return 'スポーツ';
      case 'food': return 'ごはん';
      case 'marketplace': return 'フリマ';
      case 'research': return '研究';
      case 'career': return '就活';
      default: return section;
    }
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            アクティビティがありません
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const user = getUserById(activity.userId);
          if (!user) return null;

          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{user.name}</span>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getActivityColor(activity.section)}`}
                  >
                    {getSectionLabel(activity.section)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getActivityIcon(activity.type)}
                  <span>{activity.description}</span>
                </div>
                
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(activity.createdAt), { 
                    addSuffix: true, 
                    locale: ja 
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}