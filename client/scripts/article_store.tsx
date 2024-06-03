import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Article } from '@/scripts/api/get_articles';

interface LoadedArticles {
    articles: Article[];
    setArticles: (data: Article[]) => void;
}

const useArticleStore = create(persist<LoadedArticles>((set) => ({
    articles: [],
    setArticles: (data) => { set({ articles: data }); }
}), {
    name: 'articleStorage'
}));

export default useArticleStore;

