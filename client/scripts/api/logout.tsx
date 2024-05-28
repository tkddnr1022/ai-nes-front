import axios from "axios";
import { ServiceUri } from "../config_native";

// 토큰 요구하므로 보류
/*
async function KakaoLogout(token: string): Promise<string>{
    const response = await axios.post<string>(ServiceUri + "api/logout", {access_token: token});
    return response.data.id;
}
*/

async function NativeLogout(id: string): Promise<Boolean> {
    try {
        const storage = JSON.parse(window.localStorage.authStorage);
        const token = storage.state.token;
        const response = await axios.post<Boolean>(ServiceUri + "auth/logout", { id: id, headers: { jwt_token: token } });
        return response.data;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

export { NativeLogout };