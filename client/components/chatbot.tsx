"use client"

import React, { useState, useRef, useEffect } from 'react'
import { UserCircleIcon, CpuChipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import SearchNews from '@/scripts/api/search_news'
import classNames from 'classnames'
import useChatbotStore from '@/scripts/chatbot_store'
import { Spinner } from 'flowbite-react'

const Chatbot: React.FC = () => {
  const { messages, setMessages, disableHint, setDisableHint } = useChatbotStore();
  const [disableButton, setDisableButton] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    const message = inputRef.current!.value
    inputRef.current!.value = ''
    setDisableButton(true)
    setDisableHint(true)
    setMessages([...messages, { text: message, sender: 'user' }, { text: '', sender: 'loading' }])

    const searchResult = await SearchNews(message);
    if (searchResult.status != 201) {
      console.error(searchResult.status);
    } else {
      const news = searchResult.result;
      //setMessages(messages.slice(0, -1));
      if (!news || news.length === 0) {
        setMessages([...messages, { text: message, sender: 'user' }, { text: "검색 결과가 없습니다.", sender: 'bot' }])
      } else {
        setMessages([...messages, { text: message, sender: 'user' }, { text: news, sender: 'bot' }])
      }
    }
    setDisableButton(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])
	
	// todo: 히스토리 삭제 버튼
	// todo: 채팅 로딩바 수정
	// todo: 챗봇 정보 작성
  // todo: 메시지 z-index 수정

  return (
    <div className='mt-6 mx-auto max-w-4xl px-6 lg:px-12 h-[80vh]'>
      <ul role="list" className="relative overflow-y-auto h-full">
        {messages.map((message, index) => (
          <li key={index} className="relative flex justify-between gap-x-6 py-5 z-50">
            <div className="flex min-w-0 gap-x-4">
              {message.sender === 'user' ? (
                <UserCircleIcon className="h-12 w-12 flex-none" />
              ) : (
                <CpuChipIcon className="h-12 w-12 flex-none" />
              )}
              <div className="min-w-0 flex-auto">
                <div className="font-semibold leading-6 text-gray-900">
                  {message.sender === 'user' ? (<p>유저</p>) : (<p>챗봇</p>)}
                </div>
                <p className="mt-1 whitespace-normal break-all leading-5 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: message.text }}></p>
                {message.sender === 'loading' ? (
                  <Spinner color="purple" aria-label="loading.." size="md"/>
                ) : ''}
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            </div>
          </li>
        ))}
        <div ref={messagesEndRef} />
        <div className="absolute inset-0">
          {disableHint ?
            (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-sm text-gray-300">AI-NES</p>
            </div>) :
            (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <CpuChipIcon className='mx-auto h-16 m-2' />
              <p className="text-2xl font-semibold">챗봇에게 물어보세요.</p>
              <p className="mt-0.5 text-sm text-gray-400">{"오늘 주목할만한 뉴스 분석해줘"}</p>
            </div>)}
        </div>
      </ul>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500">-</span>
          </div>
          <input
            type="text"
            placeholder="메시지 입력"
            ref={inputRef}
            disabled={disableButton}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disableButton) {
                handleSendMessage();
              }
            }}
            className="block w-full rounded-2xl border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              disabled={disableButton}
              className="h-3/5 rounded-lg border-0 bg-indigo-600 mr-3 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-700"
              onClick={handleSendMessage}
            >
              <PaperAirplaneIcon className='h-full w-full' />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="mt-5 text-xs text-gray-400">챗봇 정보</p>
      </div>

    </div>
  )
}

export default Chatbot
