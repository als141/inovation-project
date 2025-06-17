'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Post, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  author: User;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  isLiked?: boolean;
}

export function PostCard({ 
  post, 
  author, 
  onLike, 
  onComment, 
  onShare, 
  isLiked = false 
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const getSectionColor = (section: string) => {
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

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{author.name}</span>
                <Badge variant="secondary" className={getSectionColor(post.section)}>
                  {getSectionLabel(post.section)}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { 
                  addSuffix: true, 
                  locale: ja 
                })}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>報告</DropdownMenuItem>
              <DropdownMenuItem>非表示</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Link href={`/${post.section}/${post.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-3 line-clamp-3">
            {post.content}
          </p>
        </Link>

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mb-3">
            <div className="grid grid-cols-2 gap-2">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt={`投稿画像 ${index + 1}`}
                    width={200}
                    height={113}
                    className="w-full h-full object-cover"
                  />
                  {post.images.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                      +{post.images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`gap-1 ${liked ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(post.id)}
              className="gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments.length}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post.id)}
            className="gap-1"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-sm">シェア</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}