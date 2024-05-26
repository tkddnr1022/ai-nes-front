import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    email: string | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (token: string, email: string) => void;
    logout: () => void;
}

const useAuthStore = create(persist<AuthState>((set) => ({
    isLoggedIn: false,
    token: null,
    email: null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    login: (t, e) => {
        set({ token: t, email: e});
        // expiresIn 처리 필요
        set({ isLoggedIn: true });
        window.location.reload();
    },
    logout: () => {
        set({ token: null, email: null});
        // expiresIn 처리 필요
        set({ isLoggedIn: false });
        window.location.reload();
    },
}), {
    name: 'authStorage'
}));

export default useAuthStore;
