'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X, Lock, Globe, Shield } from 'lucide-react';
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
import { RESEARCH_FIELDS } from '@/lib/constants';
import type { ResearchPaper } from '@/types';

export default function CreateResearchPaperPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTokens } = useTokens();
  const { addNotification } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  const [newCoAuthor, setNewCoAuthor] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    field: '',
    accessLevel: 'public' as 'public' | 'protected' | 'private',
    password: '',
  });

  const accessLevelOptions = [
    { 
      id: 'public', 
      name: '公開', 
      description: '誰でも閲覧・ダウンロード可能',
      icon: Globe 
    },
    { 
      id: 'protected', 
      name: '制限公開', 
      description: 'パスワードが必要',
      icon: Shield 
    },
    { 
      id: 'private', 
      name: '非公開', 
      description: '自分のみ閲覧可能',
      icon: Lock 
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    // モックとしてファイルURLを生成（実際の実装ではファイルアップロードAPI使用）
    const newFiles = Array.from(uploadedFiles).map((file, index) => 
      `/papers/mock-paper-${Date.now()}-${index}.pdf`
    );
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const addCoAuthor = () => {
    if (newCoAuthor.trim() && !coAuthors.includes(newCoAuthor.trim())) {
      setCoAuthors(prev => [...prev, newCoAuthor.trim()]);
      setNewCoAuthor('');
    }
  };

  const removeCoAuthor = (author: string) => {
    setCoAuthors(prev => prev.filter(a => a !== author));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      // モックデータとして論文を作成
      const newPaper: Partial<ResearchPaper> = {
        id: `paper-${Date.now()}`,
        title: formData.title,
        authors: [user.name, ...coAuthors],
        abstract: formData.abstract,
        field: formData.field,
        keywords: keywords,
        files: files,
        accessLevel: formData.accessLevel,
        password: formData.accessLevel === 'protected' ? formData.password : undefined,
        publishedAt: new Date(),
        downloads: 0,
        citations: 0,
      };

      // 論文投稿でトークン獲得
      addTokens(20, '論文投稿');
      
      // 通知を追加
      addNotification({
        type: 'success',
        title: '論文投稿完了',
        message: `「${formData.title}」の投稿が完了しました`,
        read: false,
        actionUrl: `/research/papers/${newPaper.id}`,
      });

      // 成功メッセージを表示してリダイレクト
      setTimeout(() => {
        router.push('/research');
      }, 1000);

    } catch {
      addNotification({
        type: 'error',
        title: '投稿エラー',
        message: '論文の投稿に失敗しました。もう一度お試しください。',
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
            論文を投稿するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">論文投稿</h1>
          <p className="text-muted-foreground">
            研究成果を学術コミュニティと共有しましょう
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">論文タイトル *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="論文のタイトルを入力してください"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field">研究分野 *</Label>
              <Select value={formData.field} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, field: value }))
              } required>
                <SelectTrigger>
                  <SelectValue placeholder="研究分野を選択" />
                </SelectTrigger>
                <SelectContent>
                  {RESEARCH_FIELDS.map(field => (
                    <SelectItem key={field.id} value={field.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: field.color }}
                        />
                        {field.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abstract">アブストラクト *</Label>
              <Textarea
                id="abstract"
                value={formData.abstract}
                onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
                placeholder="研究の概要・目的・手法・結果・結論を簡潔に記述してください"
                rows={6}
                required
              />
              <p className="text-sm text-muted-foreground">
                200-500文字程度で記述することを推奨します
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>著者情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>主著者</Label>
              <div className="p-3 bg-muted rounded-lg">
                <Badge variant="default">{user.name}</Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  ログインユーザーが主著者として登録されます
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>共著者</Label>
              <div className="flex gap-2">
                <Input
                  value={newCoAuthor}
                  onChange={(e) => setNewCoAuthor(e.target.value)}
                  placeholder="共著者名を入力"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCoAuthor())}
                />
                <Button type="button" variant="outline" onClick={addCoAuthor}>
                  追加
                </Button>
              </div>
              {coAuthors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {coAuthors.map((author) => (
                    <Badge key={author} variant="secondary" className="cursor-pointer" onClick={() => removeCoAuthor(author)}>
                      {author}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>キーワード</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="キーワードを入力"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                追加
              </Button>
            </div>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword} variant="outline" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                    {keyword}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
            
            <p className="text-sm text-muted-foreground">
              研究内容に関連するキーワードを追加してください（検索性が向上します）
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ファイル</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center space-y-4">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <Label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">
                    ファイルを選択
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF、Word文書、PowerPoint等をアップロード
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>アップロード済みファイル</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">{file.split('/').pop()}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>公開設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {accessLevelOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.accessLevel === option.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted hover:border-muted-foreground/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, accessLevel: option.id as 'public' | 'protected' | 'private' }))}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.accessLevel === option.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {formData.accessLevel === 'protected' && (
              <div className="space-y-2">
                <Label htmlFor="password">アクセスパスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="パスワードを設定してください"
                  required={formData.accessLevel === 'protected'}
                />
                <p className="text-sm text-muted-foreground">
                  このパスワードを知っている人のみ論文を閲覧できます
                </p>
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
            disabled={isLoading || !formData.title || !formData.field || !formData.abstract}
          >
            {isLoading ? '投稿中...' : '論文を投稿'}
          </Button>
        </div>
      </form>
    </div>
  );
}