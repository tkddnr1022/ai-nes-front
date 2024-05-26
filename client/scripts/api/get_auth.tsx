import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../config_firebase";

interface AuthResult {
    success: boolean;
    token: string | null;
    email: string | null;
    expiresIn: number | null;
    error?: string;
}

interface KakaoToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    id_token: number;
    expires_in: string;
    scope: string;
    refresh_token_expires_in: string;
}

async function KakaoAuth(code: string): Promise<AuthResult> {
    try {
        console.log(code); // 카카오 인가 코드 표시

        // 카카오 토큰 얻는 코드 필요
        const kakaoToken = {
            "access_token": "ACCESS_TOKEN",
            "token_type": "bearer",
            "refresh_token": "REFRESH_TOKEN",
            "id_token": "TOKEN_VALUE",
            "expires_in": 21599,
            "scope": "openid",
            "refresh_token_expires_in": 5183999
        };

        // 백엔드로부터 auth 얻는 코드 필요
        const authResult = {
            success: true,
            token: "sample_token",
            email: "sample_email",
            expiresIn: 1234
        }

        return authResult;
    } catch (error) {
        console.log(error);
        return { success: false, token: null, email: null, expiresIn: null, error: "error" };
    }
}

async function GoogleAuth(): Promise<AuthResult> {
    const provider = new GoogleAuthProvider();
    try {
        const data = await signInWithPopup(FirebaseAuth, provider);
        console.log(data);

        // 백엔드로부터 auth 얻는 코드 필요
        const authResult = {
            success: true,
            token: "sample_token",
            email: "sample_email",
            expiresIn: 1234
        }

        return authResult;
    } catch (error) {
        console.log(error);
        return { success: false, token: null, email: null, expiresIn: null, error: "error" };
    }
}

async function NativeAuth(email: string, password: string): Promise<AuthResult> {
    
    try {
        console.log(email);
        // Debug
        // await new Promise(resolve => setTimeout(resolve, 4000));

        // 백엔드로부터 auth 얻는 코드 필요
        const authResult = {
            success: true,
            token: "sample_token",
            email: "sample_email",
            expiresIn: 1234
        }
        return authResult;
    } catch (error) {
        console.log(error);
        return { success: false, token: null, email: null, expiresIn: null, error: "error" };
    }
}

export { KakaoAuth, GoogleAuth, NativeAuth };
