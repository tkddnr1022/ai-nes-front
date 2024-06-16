import { GoogleAuthProvider, getIdToken, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "../config_firebase";
import axios from "axios";

interface AuthRequest {
    id: string;
    password: string;
}

interface AuthResult {
    status: number;
    jwt_token?: string;
    id?: string;
    provider?: string;
}

// 보류
interface KakaoToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    id_token: number;
    expires_in: string;
    scope: string;
    refresh_token_expires_in: string;
}

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
        /*
        // 인가 코드로 유저 정보 획득
        const response = await axios.post<KakaoUser>(ServiceUri + "auth/getToken", { code: code });
        const kakaoUser = response.data;
        */

        // 보안 정책 문제 검토 필요

        // Debug
        console.log(code);
        // 인가 코드로 카카오 토큰 요청
        const tokenResponse = await axios.post<KakaoToken>("/service/auth/getToken", { auth_code: code });
        const kakaoToken = tokenResponse.data;
        const token = kakaoToken.access_token;

        //window.localStorage.kakaoToken = kakaoToken.access_token;
        if (tokenResponse.status != 201) {
            console.log(tokenResponse);
            return { status: tokenResponse.status };
        }

        // 카카오 토큰으로 유저 정보 요청
        const userResponse = await axios.post<KakaoUser>("/service/auth/getUser", { access_token: token });
        const kakaoUser = userResponse.data;
        // Debug
        // window.localStorage.kakaoUser = JSON.stringify(kakaoUser);
        if (userResponse.status != 201) {
            console.log(userResponse);
            return { status: userResponse.status };
        }

        // 인증 결과 반환
        const authResult: AuthResult = {
            status: 201,
            jwt_token: kakaoUser.jwt_token,
            id: kakaoUser.kakao_account.email,
            provider: "kakao"
        };
        return authResult;
    } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
            return {
                status: err.response?.status as number
            };
        }
        else {
            return {
                status: 500
            };
        }
    }
}

async function GoogleAuth(): Promise<AuthResult> {
    const provider = new GoogleAuthProvider();
    try {
        const data = await signInWithPopup(FirebaseAuth, provider);
        const token = await data.user.getIdToken();
        // Debug
        // console.log(data);

        const response = await axios.post<string>("service/auth/save", {
            id: data.user.uid,
            email: data.user.email,
            token: token
        })

        if (response.status != 201) {
            console.log(response);
            return { status: response.status };
        }

        const authResult: AuthResult = {
            status: 201,
            jwt_token: response.data,
            id: data.user.uid,
            provider: "google"
        }
        return authResult;
    } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
            return {
                status: err.response?.status as number
            };
        }
        else {
            return {
                status: 500
            };
        }
    }
}

async function NativeAuth(authRequest: AuthRequest): Promise<AuthResult> {
    try {
        // Debug
        // await new Promise(resolve => setTimeout(resolve, 4000));

        const response = await axios.post<string>("/service/auth/login", authRequest);
        if (response.status != 201 || !response.data) {
            console.log(response);
            return { status: response.status };
        }

        // 인증 결과 반환
        return {
            status: 201,
            jwt_token: response.data,
            id: authRequest.id,
            provider: "native"
        };
    } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
            return {
                status: err.response?.status as number
            };
        }
        else {
            return {
                status: 500
            };
        }
    }
}

export { KakaoAuth, GoogleAuth, NativeAuth };
