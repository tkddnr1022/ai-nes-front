import { ServiceUri } from "../config_native"
import axios from "axios";

interface News {
    "title": string,
    "originallink": string,
    "link": string,
    "description": string,
    "pubDate": Date
}

interface SearchResult {
    "status": number | null,
    "lastBuildDate": Date | null,
    "total": number | null,
    "start": number | null,
    "display": number | null,
    "items": News[] | null
}

// 테스트 안해봤음
export default async function SearchNews(query: string): Promise<SearchResult> {
    const searchResult = { status: 500, lastBuildDate: null, total: null, start: null, display: null, items: null };
    const storage = JSON.parse(window.localStorage.authStorage);
    const token = storage.state.token;
    const isLoggedIn = storage.state.isLoggedIn;
    try {
        if (!token || !isLoggedIn) {
            searchResult.status = 401;
            return searchResult;
        }
        const response = await axios.post<SearchResult>(ServiceUri + "api/news",
            { chatbot_query: query }, { headers: { jwt_token: "Bearer " + token } });
        response.data.status = response.status;
        // Debug
        await new Promise(resolve => setTimeout(resolve, 4000));
        return response.data;
    }
    catch (err) {
        console.error(err);
        return searchResult;
    }
}