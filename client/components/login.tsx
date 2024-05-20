"use client"

import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { KakaoAuthUri } from "@/scripts/login_kakao";
import { FirebaseAuth } from '@/scripts/login_firebase';
import { SetStateAction, useState } from 'react';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import RegisterModal from './register_modal';


export default function Login() {
    const params = useSearchParams();
    const KakaoAuthCode = params.get('code');
    const [userData, setUserData] = useState<User>();
    console.log(`카카오 인가 코드: ${KakaoAuthCode}`);
    console.log(`구글 이메일: ${userData?.email}`);

    function GoogleLoginHandler() {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        signInWithPopup(FirebaseAuth, provider) // popup을 이용한 signup
            .then((data) => {
                setUserData(data.user); // user data 설정
                console.log(data) // console로 들어온 데이터 표시
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        계정에 로그인
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
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
