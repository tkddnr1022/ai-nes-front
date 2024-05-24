"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { KakaoAuthUri } from "@/scripts/config_kakao";
import { useState } from 'react';
import RegisterModal from './register_modal';
import { KakaoAuth, GoogleAuth, NativeAuth } from '@/scripts/api/get_auth';
import useAuthStore from '@/scripts/auth_store';

export default function Login() {

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuthStore();
    const router = useRouter();

    const NativeLoginHandler = async (email: string, password: string) => {
        const authResult = await NativeAuth(email, password);
        if (authResult.success) {
            login(authResult.token as string, authResult.expiresIn as number);
            router.push('/');
        }
        else {
            // 로그인 실패
        }
    };

    const GoogleLoginHandler = async () => {
        const authResult = await GoogleAuth();
        if (authResult.success) {
            login(authResult.token as string, authResult.expiresIn as number);
            router.push('/');
        }
        else {
            // 로그인 실패
        }
    };

    const KakaoLoginHandler = async (code: string) => {
        const authResult = await KakaoAuth(code);
        if (authResult.success) {
            login(authResult.token as string, authResult.expiresIn as number);
            router.push('/');
        }
        else {
            // 로그인 실패
        }
    };
    // code 파라미터 존재시 카카오 인증 진행
    const KakaoAuthCode = useSearchParams().get('code');
    if (KakaoAuthCode) KakaoLoginHandler(KakaoAuthCode);

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        계정에 로그인하기
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                이메일
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    비밀번호
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        비밀번호를 잊어버리셨나요?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={() => NativeLoginHandler(email, password)}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                로그인
                            </button>
                            <a
                                href={KakaoAuthUri}
                                className="relative flex w-full h-10 mx-auto justify-center items-center rounded-md mt-2"
                            >
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <Image src="/images/kakao_login_large_wide.png" alt="Kakao Login" layout="fill" objectFit="contain" />
                                </div>
                            </a>
                            <button
                                type="button"
                                className="relative flex w-full h-10 mx-auto justify-center items-center rounded-md mt-2"
                                onClick={GoogleLoginHandler}
                            >
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <Image src="/images/google_login_SI.png" alt="Google Login" layout="fill" objectFit="contain" />
                                </div>
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        계정이 없으신가요?{' '}
                        <button onClick={() => setIsRegisterOpen(true)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            가입하기
                        </button>
                    </p>
                </div>
            </div>
            <RegisterModal open={isRegisterOpen} setOpen={setIsRegisterOpen} />
        </div>
    )
}
