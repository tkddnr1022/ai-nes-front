import axios from "axios";
import { ServiceUri } from "../config_native";

interface KakaoLogoutResult {
    id: string;
}

// 토큰 요구하므로 보류
async function KakaoLogout(token: string): Promise<string> {
    try {
        const response = await axios.post<KakaoLogoutResult>(ServiceUri + "auth/logout", { access_token: token, headers: { Authorization: "Bearer " + token } });
        return response.data.id;
    }
    catch (err) {
        console.error(err);
        return "error";
    }
}

async function NativeLogout(id: string): Promise<Boolean> {
    try {
        const storage = JSON.parse(window.localStorage.authStorage);
        const token = storage.state.jwt_token;
        const response = await axios.post<Boolean>(ServiceUri + "auth/logout", { id: id, headers: { Authorization: "Bearer " + token } });
        return response.data;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export { KakaoLogout, NativeLogout };