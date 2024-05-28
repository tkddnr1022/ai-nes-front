import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    id: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (token: string, id: string) => void;
    logout: () => void;
}

const useAuthStore = create(persist<AuthState>((set) => ({
    isLoggedIn: false,
    token: null,
    id: null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    login: (t, i) => {
        set({ token: t, id: i});
        // expiresIn 처리 필요
        set({ isLoggedIn: true });
        window.location.reload();
    },
    logout: () => {
        set({ token: null, id: null});
        // expiresIn 처리 필요
        set({ isLoggedIn: false });
        window.location.reload();
    },
}), {
    name: 'authStorage'
}));

export default useAuthStore;
