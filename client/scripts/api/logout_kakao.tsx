// 토큰 요구하므로 보류
/*
import axios from "axios";
import { ServiceUri } from "../config_native";

interface LogoutId{
    id: string
}

export default async function KakaoLogout(token: string): Promise<string>{
    const response = await axios.post<LogoutId>(ServiceUri + "api/logout", {access_token: token});
    return response.data.id;
}
*/