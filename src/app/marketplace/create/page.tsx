'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
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
import { MARKETPLACE_CATEGORIES, ITEM_CONDITIONS } from '@/lib/constants';
import type { MarketItem } from '@/types';

export default function CreateMarketItemPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTokens } = useTokens();
  const { addNotification } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    location: '大学内',
    deliveryMethods: [] as string[],
  });

  const deliveryOptions = [
    { id: 'pickup', name: '手渡し' },
    { id: 'oncampus', name: '学内配送' },
    { id: 'shipping', name: '配送' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // モックとして画像URLを生成（実際の実装ではファイルアップロードAPI使用）
    const newPhotos = Array.from(files).map((file, index) => 
      `/items/mock-item-${Date.now()}-${index}.jpg`
    );
    
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 5)); // 最大5枚まで
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeliveryMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.includes(method)
        ? prev.deliveryMethods.filter(m => m !== method)
        : [...prev.deliveryMethods, method]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      // モックデータとして商品を作成
      const newItem: Partial<MarketItem> = {
        id: `item-${Date.now()}`,
        title: formData.title,
        sellerId: user.id,
        category: formData.category,
        condition: formData.condition as 'new' | 'like-new' | 'good' | 'fair',
        price: parseInt(formData.price) || 0,
        description: formData.description,
        photos: photos,
        location: formData.location,
        deliveryMethods: formData.deliveryMethods,
        status: 'available',
        createdAt: new Date(),
        views: 0,
        favorites: 0,
      };

      // 商品投稿でトークン獲得
      addTokens(5, '商品投稿');
      
      // 通知を追加
      addNotification({
        type: 'success',
        title: '商品投稿完了',
        message: `「${formData.title}」の出品が完了しました`,
        read: false,
        actionUrl: `/marketplace/${newItem.id}`,
      });

      // 成功メッセージを表示してリダイレクト
      setTimeout(() => {
        router.push('/marketplace');
      }, 1000);

    } catch (error) {
      addNotification({
        type: 'error',
        title: '投稿エラー',
        message: '商品の投稿に失敗しました。もう一度お試しください。',
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
            商品を出品するにはログインしてください。
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
          <h1 className="text-2xl font-bold">商品を出品</h1>
          <p className="text-muted-foreground">
            不要になったものを出品して、他の学生に譲りましょう
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>商品写真</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                  <Image
                    src={photo}
                    alt={`商品写真 ${index + 1}`}
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
                    <Upload className="h-8 w-8" />
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
              最大5枚まで追加できます。最初の写真がメイン画像になります。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>商品情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">商品名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="商品名を入力してください"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリー *</Label>
                <Select value={formData.category} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                } required>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKETPLACE_CATEGORIES.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">状態 *</Label>
                <Select value={formData.condition} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, condition: value }))
                } required>
                  <SelectTrigger>
                    <SelectValue placeholder="状態を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEM_CONDITIONS.map(condition => (
                      <SelectItem key={condition.id} value={condition.id}>
                        {condition.name} - {condition.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">価格（円）*</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0円の場合は無料"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">商品説明 *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="商品の詳細説明を入力してください"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>受け渡し方法</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">受け渡し場所</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="受け渡し場所を入力してください"
              />
            </div>

            <div className="space-y-2">
              <Label>受け渡し方法（複数選択可）</Label>
              <div className="flex flex-wrap gap-2">
                {deliveryOptions.map(option => (
                  <Badge
                    key={option.id}
                    variant={formData.deliveryMethods.includes(option.name) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleDeliveryMethodToggle(option.name)}
                  >
                    {formData.deliveryMethods.includes(option.name) && <Plus className="h-3 w-3 mr-1" />}
                    {option.name}
                  </Badge>
                ))}
              </div>
            </div>
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
            disabled={isLoading || !formData.title || !formData.category || !formData.condition || !formData.description}
          >
            {isLoading ? '投稿中...' : '商品を出品'}
          </Button>
        </div>
      </form>
    </div>
  );
}