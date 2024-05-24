import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    login: (token: string, expiresIn: number) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    login: (token, expiresIn) => {
        // expiresIn 처리 필요
        Cookies.set('token', token, { expires: 7 });
        set({ isLoggedIn: true });
    },
    logout: () => {
        Cookies.remove('token');
        set({ isLoggedIn: false });
    },
}));

export default useAuthStore;
