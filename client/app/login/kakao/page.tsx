'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function loginKakao() {
    const KakaoAuthCode = useSearchParams().get('code');
    useEffect(() => {
        if (KakaoAuthCode) {
            window.opener.postMessage(KakaoAuthCode, window.location.origin);
        }
        else{
            console.error("Auth failed");
        }
        window.close();
    })

    return (<></>);
}