'use client'

import GetArticles, { Article } from "@/scripts/api/get_articles"
import useArticleStore from "@/scripts/article_store"
import { Popover, Transition, PopoverButton, PopoverPanel } from "@headlessui/react"
import { Carousel, CustomFlowbiteTheme } from "flowbite-react"
import { Fragment, useEffect, useState } from "react"

export default function Headline() {

    const { articles, setArticles } = useArticleStore();
    const [articleChunks, setArticleChunks] = useState<Article[][]>();

    const handleGetArticles = async () => {
        const getArticleResult = await GetArticles();
        if (getArticleResult.status != 201) {
            console.error(getArticleResult.status);
        }
        else {
            if (!getArticleResult.items || getArticleResult.items.length == 0) {
                // todo: 당일 기사가 없을 경우 에러 처리
            }
            else {
                setArticles(getArticleResult.items);
            }
        }
    }

    const chunkArray = (array: Article[], size: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        console.log(result);
        return result;
    };

    useEffect(() => {
        if (!articles || articles.length == 0) {
            handleGetArticles();
        }
    }, []);

    useEffect(() => {
        setArticleChunks(chunkArray(articles, Math.floor(articles.length / 5)));
    }, [articles])

    const articleTheme: CustomFlowbiteTheme["carousel"] =
    {
        "root": {
            "base": "px-12 pb-10 bg-gray-100 relative h-full w-full rounded-xl",
            "leftControl": "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
            "rightControl": "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none"
        },
        "indicators": {
            "active": {
                "off": "bg-gray-800/50 hover:bg-gray-800",
                "on": "bg-gray-800"
            },
            "base": "h-3 w-3 rounded-full",
            "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
        },
        "item": {
            "base": "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
            "wrapper": {
                "off": "w-full flex-shrink-0 transform cursor-default snap-center",
                "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
            }
        },
        "control": {
            "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
            "icon": "h-5 w-5 text-gray-500 sm:h-6 sm:w-6"
        },
        "scrollContainer": {
            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
            "snap": "snap-x"
        }
    }

    return (
        <div id="headline" className="bg-white py-24 sm:py-32 relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">이슈 토픽</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        지금 이슈가 되는 기사들을 분석해보세요.
                    </p>
                </div>
                <div className="h-96 sm:h-96 xl:h-[26rem] 2xl:h-[26rem] mt-4">
                    <Carousel slide={false} theme={articleTheme}>
                        {articleChunks ? (articleChunks.map((chunk, index) => (
                            <div key={index} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {chunk.map((article) => (
                                    <article key={article.id} className="flex max-w-xl flex-col items-start justify-between">
                                        <div className="relative flex items-center gap-x-4">
                                            <div className="">
                                                <div className="flex items-center gap-x-4 text-xs">
                                                    <time dateTime={article.date} className="text-gray-500">
                                                        {article.date}
                                                    </time>
                                                    <a
                                                        href="#"
                                                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                                    >
                                                        {article.section}
                                                    </a>
                                                </div>
                                                <div className="mt-2 group relative">
                                                    <h3 className="text-left text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                                        {article.title}
                                                    </h3>
                                                </div>
                                                <div className="mt-3 relative flex items-center gap-x-4">
                                                    <div className="text-sm leading-6">
                                                        <p className="font-semibold text-gray-900">
                                                            <a>
                                                                <span className="absolute inset-0" />
                                                                {article.press}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ))) : (<p>기사 불러오기 실패</p>)}
                    </Carousel>
                </div>
            </div>
        </div >
    )
}

