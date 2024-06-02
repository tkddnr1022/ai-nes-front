import axios from "axios";

export interface Article {
    id?: number;
    link: string;
    description: string;
    press: string;
    section: string;
    title: string;
    summary?: string;
    date?: string;
}

interface GetArticlesResult {
    status: number;
    items?: Article[];
}

export default async function GetArticles(): Promise<GetArticlesResult> {
    try {
        const response = await axios.get<Article[]>("/service/api/getData");
        if (response.status != 201 || response.data == null) {
            return { status: response.status };
        }

        const today = new Date();
        let index = 0;
        for (const article of response.data) {
            article.id = index++;
            article.date = `${today.getFullYear()}년 ${today.getMonth() + 1
                }월 ${today.getDate()}일`;
            // todo: 실제 요약 구현
            article.summary = "기사 내용 요약";
        }
        const getArticlesResult = { status: response.status, items: response.data };
        return getArticlesResult;
    } catch (err) {
        console.error(err);
        return { status: 500 };
    }
}
