import { ServiceUri } from "../config_native"
import axios from "axios";

interface News {
    "title": string,
    "originallink": string,
    "link": string,
    "description": string,
    "pubDate": Date
}

interface SearchResponse {
    "lastBuildDate": Date | null,
    "total": number | null,
    "start": number | null,
    "display": number | null,
    "items": News[] | null
}

interface SearchResult{
    "status": number,
    "result": string
}

function formatNews(news: News){
    return `
    ${news.title}</br>
    ${news.pubDate}</br>
    <a href=${news.link}>링크</a></br>
    ${news.description}
    `;
}

export default async function SearchNews(query: string): Promise<SearchResult> {
    const searchResult = { status: 500, result: "" };
    const storage = JSON.parse(window.localStorage.authStorage);
    const token = storage.state.jwt_token;
    const isLoggedIn = storage.state.isLoggedIn;
    try {
        if (!token || !isLoggedIn) {
            searchResult.status = 401;
            return searchResult;
        }
        const response = await axios.post<SearchResponse>(ServiceUri + "api/news",
            { chatbot_query: query }, { headers: { jwt_token: "Bearer " + token } });
        searchResult.status = response.status;
        if(response.status == 200 && response.data.items != null){
            searchResult.result = formatNews(response.data.items[0]);
        }
        // Debug
        await new Promise(resolve => setTimeout(resolve, 2000));
        return searchResult;
    }
    catch (err) {
        console.error(err);
        return searchResult;
    }
}