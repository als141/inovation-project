'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Heart, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockMarketItems, mockUsers } from '@/lib/mock-data';
import { MARKETPLACE_CATEGORIES } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const filteredItems = mockMarketItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return '新品';
      case 'like-new': return '美品';
      case 'good': return '良好';
      case 'fair': return '普通';
      default: return condition;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">フリマ</h1>
          <p className="text-muted-foreground">
            不要になったものを売って、必要なものを安く手に入れよう！
          </p>
        </div>
        <Button asChild>
          <Link href="/marketplace/create">
            <Plus className="h-4 w-4 mr-2" />
            商品を出品
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">お得な商品がたくさん！</h2>
            <p className="text-purple-100 mb-4">
              教科書からガジェットまで、学生生活に必要なものが見つかります。
            </p>
            <Button variant="secondary" asChild>
              <Link href="/marketplace/search">商品を探す</Link>
            </Button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{mockMarketItems.length}</div>
            <div className="text-purple-100">出品中の商品</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="商品を検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            すべて
          </Button>
          {MARKETPLACE_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const seller = getUserById(item.sellerId);
          if (!seller) return null;

          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden relative">
                    {item.photos.length > 0 ? (
                      <Image 
                        src={item.photos[0]} 
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-text')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-text absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted flex-col';
                            fallback.innerHTML = '<span class="text-2xl">📸</span><span class="text-sm mt-1">画像なし</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground flex-col">
                        <span className="text-2xl">📸</span>
                        <span className="text-sm mt-1">画像なし</span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleToggleFavorite(item.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        favorites.has(item.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-500'
                      }`} 
                    />
                  </Button>
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant="secondary" 
                      className={getConditionColor(item.condition)}
                    >
                      {getConditionLabel(item.condition)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-2 mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {item.price === 0 ? '無料' : `¥${item.price.toLocaleString()}`}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{item.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={seller.avatar} alt={seller.name} />
                    <AvatarFallback className="text-xs">
                      {seller.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {seller.name}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.createdAt), { 
                    addSuffix: true, 
                    locale: ja 
                  })}
                </div>

                <Button 
                  className="w-full" 
                  size="sm" 
                  asChild
                  disabled={item.status !== 'available'}
                >
                  <Link href={`/marketplace/${item.id}`}>
                    {item.status === 'sold' ? '売り切れ' : 
                     item.status === 'reserved' ? '予約済み' : '詳細を見る'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            {searchTerm ? '検索条件に一致する商品が見つかりませんでした' : '商品がありません'}
          </div>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              検索をクリア
            </Button>
          )}
        </div>
      )}
    </div>
  );
}