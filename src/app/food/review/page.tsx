'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Star, Upload, X, Plus, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useTokens } from '@/context/TokenContext';
import { useNotifications } from '@/context/NotificationContext';
import { mockMenuItems, mockRestaurants } from '@/lib/mock-data';
import type { Review } from '@/types';

export default function CreateReviewPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTokens } = useTokens();
  const { addNotification } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [formData, setFormData] = useState({
    menuItemId: '',
    comment: '',
    restaurant: '',
    visitDate: new Date().toISOString().split('T')[0],
  });

  const suggestedTags = [
    'ボリューム満点', '美味しい', 'コスパ良し', 'ヘルシー', 'インスタ映え',
    '辛い', '甘い', '濃厚', 'あっさり', '温かい', '冷たい', 'サクサク',
    'もちもち', 'ジューシー', 'クリーミー', '香ばしい'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // モックとして画像URLを生成（実際の実装ではファイルアップロードAPI使用）
    const newPhotos = Array.from(files).map((file, index) => 
      `/reviews/mock-review-${Date.now()}-${index}.jpg`
    );
    
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5)); // 最大5枚まで
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags(prev => [...prev, tag]);
    }
  };

  const addCustomTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;

    setIsLoading(true);

    try {
      // モックデータとしてレビューを作成
      const newReview: Partial<Review> = {
        id: `review-${Date.now()}`,
        authorId: user.id,
        menuItemId: formData.menuItemId,
        rating: rating,
        comment: formData.comment,
        photos: photos,
        tags: tags,
        createdAt: new Date(),
        helpful: 0,
      };

      // レビュー投稿でトークン獲得
      addTokens(8, 'レビュー投稿');
      
      // 通知を追加
      const menuItem = mockMenuItems.find(item => item.id === formData.menuItemId);
      addNotification({
        type: 'success',
        title: 'レビュー投稿完了',
        message: `「${menuItem?.name || '料理'}」のレビューを投稿しました`,
        read: false,
        actionUrl: `/food/menu/${formData.menuItemId}`,
      });

      // 成功メッセージを表示してリダイレクト
      setTimeout(() => {
        router.push('/food');
      }, 1000);

    } catch (error) {
      addNotification({
        type: 'error',
        title: '投稿エラー',
        message: 'レビューの投稿に失敗しました。もう一度お試しください。',
        read: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            レビューを投稿するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">レビュー投稿</h1>
          <p className="text-muted-foreground">
            食事の感想を共有して、他の人の参考にしてもらいましょう
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>料理・レストラン情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="menuItem">料理 *</Label>
              <Select value={formData.menuItemId} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, menuItemId: value }))
              } required>
                <SelectTrigger>
                  <SelectValue placeholder="レビューする料理を選択" />
                </SelectTrigger>
                <SelectContent>
                  {mockMenuItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {item.restaurant} - ¥{item.price}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visitDate">訪問日</Label>
              <Input
                id="visitDate"
                type="date"
                value={formData.visitDate}
                onChange={(e) => setFormData(prev => ({ ...prev, visitDate: e.target.value }))}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>評価</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>総合評価 *</Label>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <Star
                      key={index}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        starValue <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-300'
                      }`}
                      onClick={() => handleRatingClick(starValue)}
                      onMouseEnter={() => setHoveredRating(starValue)}
                      onMouseLeave={() => setHoveredRating(0)}
                    />
                  );
                })}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating === 0 ? '評価を選択してください' : 
                   rating === 1 ? '1 - 残念' :
                   rating === 2 ? '2 - 普通' :
                   rating === 3 ? '3 - 良い' :
                   rating === 4 ? '4 - とても良い' :
                   '5 - 最高'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>写真</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`レビュー写真 ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => {}}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {photos.length < 5 && (
                <div className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                  <Label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Camera className="h-6 w-6" />
                    <span className="text-sm">写真を追加</span>
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              料理の写真を追加してください（最大5枚）
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>コメント</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">感想・詳細レビュー *</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="料理の味、ボリューム、コストパフォーマンス、サービス等について詳しく教えてください"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>タグ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>おすすめタグ</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                  >
                    {tags.includes(tag) && <Plus className="h-3 w-3 mr-1" />}
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>カスタムタグ</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="独自のタグを追加"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                />
                <Button type="button" variant="outline" onClick={addCustomTag}>
                  追加
                </Button>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="space-y-2">
                <Label>選択されたタグ</Label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading || !formData.menuItemId || !formData.comment || rating === 0}
          >
            {isLoading ? '投稿中...' : 'レビューを投稿'}
          </Button>
        </div>
      </form>
    </div>
  );
}