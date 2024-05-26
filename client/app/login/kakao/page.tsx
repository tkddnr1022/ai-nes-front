'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function loginKakao() {
    const KakaoAuthCode = useSearchParams().get('code');
    useEffect(() => {
        if (KakaoAuthCode) {
            // 로그인 페이지에 인가 코드 전송
            window.opener.postMessage(KakaoAuthCode, window.location.origin);
        }
        else{
            console.error("Failed to issue authorization code");
        }
        window.close();
    })

    return (<></>);
}