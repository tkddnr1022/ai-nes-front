import axios from "axios";

interface KakaoLogoutResult {
    id: string;
}

// 토큰 요구하므로 보류
async function KakaoLogout(token: string): Promise<string> {
    try {
        const response = await axios.post<KakaoLogoutResult>("/service/auth/logout", { access_token: token, headers: { Authorization: "Bearer " + token } });
        return response.data.id;
    }
    catch (err) {
        console.error(err);
        return "error";
    }
}

// native logout
// 백엔드에서 별도의 처리가 필요 없을 것으로 예상되어 사용하지 않음
/*
async function NativeLogout(id: string): Promise<Boolean> {
    try {
        const storage = JSON.parse(window.localStorage.authStorage);
        const token = storage.state.jwt_token;
        const response = await axios.post<Boolean>("/auth/logout", { id: id, headers: { Authorization: "Bearer " + token } });
        return response.data;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
    */

export { KakaoLogout };