import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (token: string) => void;
    logout: () => void;
}

const useAuthStore = create(persist<AuthState>((set) => ({
    isLoggedIn: false,
    token: null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    login: (t) => {
        set({ token: t});
        // expiresIn 처리 필요
        set({ isLoggedIn: true });
        window.location.reload();
    },
    logout: () => {
        set({ token: null});
        // expiresIn 처리 필요
        set({ isLoggedIn: false });
        window.location.reload();
    },
}), {
    name: 'authStorage'
}));

export default useAuthStore;
