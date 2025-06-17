'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { TokenTransaction } from '@/types';
import { TOKEN_REWARDS } from '@/lib/constants';

interface TokenContextType {
  balance: number;
  transactions: TokenTransaction[];
  addTokens: (amount: number, reason: string, relatedId?: string) => void;
  spendTokens: (amount: number, reason: string, relatedId?: string) => boolean;
  getTransactionHistory: () => TokenTransaction[];
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

interface TokenProviderProps {
  children: ReactNode;
}

export function TokenProvider({ children }: TokenProviderProps) {
  const { user, updateProfile } = useAuth();
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);

  useEffect(() => {
    if (user) {
      // localStorage からトランザクション履歴を復元
      const savedTransactions = localStorage.getItem(`token_transactions_${user.id}`);
      if (savedTransactions) {
        try {
          const parsed = JSON.parse(savedTransactions);
          setTransactions(parsed.map((t: TokenTransaction & { createdAt: string }) => ({
            ...t,
            createdAt: new Date(t.createdAt)
          })));
        } catch (error) {
          console.error('Failed to parse token transactions:', error);
          setTransactions([]);
        }
      }
    }
  }, [user]);

  const saveTransactions = (newTransactions: TokenTransaction[]) => {
    if (user) {
      localStorage.setItem(
        `token_transactions_${user.id}`, 
        JSON.stringify(newTransactions)
      );
    }
  };

  const addTokens = (amount: number, reason: string, relatedId?: string) => {
    if (!user || amount <= 0) return;

    const transaction: TokenTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      amount,
      type: 'earn',
      reason,
      relatedId,
      createdAt: new Date(),
    };

    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);

    // ユーザーのトークン残高を更新
    updateProfile({ tokens: user.tokens + amount });
  };

  const spendTokens = (amount: number, reason: string, relatedId?: string): boolean => {
    if (!user || amount <= 0 || user.tokens < amount) {
      return false;
    }

    const transaction: TokenTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      amount,
      type: 'spend',
      reason,
      relatedId,
      createdAt: new Date(),
    };

    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);

    // ユーザーのトークン残高を更新
    updateProfile({ tokens: user.tokens - amount });
    return true;
  };

  const getTransactionHistory = (): TokenTransaction[] => {
    return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  // 定期的な報酬の自動付与（デモ用）
  useEffect(() => {
    if (!user) return;

    // 最後のログイン報酬チェック
    const lastDailyReward = localStorage.getItem(`last_daily_reward_${user.id}`);
    const today = new Date().toDateString();
    
    if (lastDailyReward !== today) {
      // 日次ログイン報酬
      setTimeout(() => {
        addTokens(TOKEN_REWARDS.DAILY_LOGIN, 'デイリーログインボーナス');
        localStorage.setItem(`last_daily_reward_${user.id}`, today);
      }, 1000);
    }
  }, [user]);

  const value: TokenContextType = {
    balance: user?.tokens || 0,
    transactions,
    addTokens,
    spendTokens,
    getTransactionHistory,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}

// トークン獲得のヘルパー関数
export const tokenRewards = {
  post: (addTokens: (amount: number, reason: string, relatedId?: string) => void, postId: string) => {
    addTokens(TOKEN_REWARDS.POST_CREATION, '投稿作成', postId);
  },
  comment: (addTokens: (amount: number, reason: string, relatedId?: string) => void, commentId: string) => {
    addTokens(TOKEN_REWARDS.COMMENT, 'コメント投稿', commentId);
  },
  review: (addTokens: (amount: number, reason: string, relatedId?: string) => void, reviewId: string) => {
    addTokens(TOKEN_REWARDS.REVIEW, 'レビュー投稿', reviewId);
  },
  eventParticipation: (addTokens: (amount: number, reason: string, relatedId?: string) => void, eventId: string) => {
    addTokens(TOKEN_REWARDS.EVENT_PARTICIPATION, 'イベント参加', eventId);
  },
  questionAnswer: (addTokens: (amount: number, reason: string, relatedId?: string) => void, answerId: string) => {
    addTokens(TOKEN_REWARDS.QUESTION_ANSWER, '質問回答', answerId);
  },
  bestAnswer: (addTokens: (amount: number, reason: string, relatedId?: string) => void, answerId: string) => {
    addTokens(TOKEN_REWARDS.BEST_ANSWER, 'ベストアンサー選出', answerId);
  },
};