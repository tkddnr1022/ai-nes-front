import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../config_firebase";
import axios from "axios";
import { ServiceUri } from "../config_native";


interface AuthResult {
    success: boolean;
    token: string | null;
    email: string | null;
    expiresIn: number | null;
    error?: string;
}

/*
interface KakaoToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    id_token: number;
    expires_in: string;
    scope: string;
    refresh_token_expires_in: string;
}
*/

interface KakaoUser {
    "id": string;
    "connected_at": Date;
    "kakao_account": {
        "has_email": boolean;
        "email_needs_agreement": boolean;
        "is_email_valid": boolean;
        "is_email_verified": boolean;
        "email": string;
        "has_gender": boolean;
        "gender_needs_agreement": boolean;
        "gender": string
    },
    "jwt_token": string
}

async function KakaoAuth(code: string): Promise<AuthResult> {
    try {
        console.log(code); // 카카오 인가 코드 표시

        // 카카오 정책상 문제로 아래 부분은 사용하지 않음
        /*
        // 인가 코드로 카카오 토큰 요청
        const tokenResponse = await axios.get<KakaoToken>(ServiceUri + "api/getToken", { params: { code: code } });
        const kakaoToken = tokenResponse.data;
        const token = kakaoToken.access_token;

        // 카카오 토큰으로 유저 정보 요청
        const userResponse = await axios.get<KakaoUser>(ServiceUri + "api/getUser", { params: { token: token } });
        const kakaoUser = userResponse.data;
        */

        // 인가 코드로 유저 정보 획득
        const response = await axios.post<KakaoUser>(ServiceUri + "api/getToken", {code: code});
        const kakaoUser = response.data;

        // Debug
        // window.localStorage.kakaoToken = JSON.stringify(kakaoToken);
        window.localStorage.kakaoUser = JSON.stringify(kakaoUser);

        // 인증 결과 반환
        const authResult: AuthResult = {
            success: true,
            token: kakaoUser.jwt_token,
            email: kakaoUser.kakao_account.email,
            expiresIn: 7
        };
        return authResult;
    } catch (err) {
        console.error(err);

        // 오류 결과 반환
        const authResult: AuthResult = {
            success: false,
            token: null,
            email: null,
            expiresIn: null,
            error: JSON.stringify(err)
        };
        return authResult;
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
