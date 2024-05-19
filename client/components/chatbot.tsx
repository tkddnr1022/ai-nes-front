"use client"

import React, { useState, useRef } from 'react'
import { UserCircleIcon, CpuChipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
  text: string
  sender: 'user' | 'bot'
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [disableEnter, setDisableEnter] = useState<Boolean>(false)
  const [disableHint, setDisableHint] = useState<Boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleSendMessage = () => {
    const message = inputRef.current!.value
    inputRef.current!.value = ''
    buttonRef.current!.disabled = true
    setDisableEnter(true)
    setDisableHint(true)
    setMessages([...messages, { text: message, sender: 'user' }])

    setTimeout(() => {
      setMessages(messages => [
        ...messages,
        { text: '메시지를 받았습니다.', sender: 'bot' }
      ]);
      buttonRef.current!.disabled = false
      setDisableEnter(false)
    }, 1000);
  };


  return (
    <div className='mt-6 mx-auto max-w-4xl px-12 lg:px-24 h-screen'>
      <div className='h-full'> {/* Border 구현 예정 */}
        <ul role="list" className="relative overflow-y-auto h-4/5">
          {messages.map((message, index) => (
            <li key={index} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                {message.sender === 'user' ? (<UserCircleIcon className="h-12 w-12 flex-none" />) : (<CpuChipIcon className="h-12 w-12 flex-none" />)}
                <div className="min-w-0 flex-auto">
                  <p className="font-semibold leading-6 text-gray-900">
                    {message.sender === 'user' ? (<p>유저</p>) : (<p>챗봇</p>)}
                  </p>
                  <p className="mt-1 truncate leading-5 text-gray-500">{message.text}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              </div>
            </li>
          ))}
          <div className="absolute inset-0">
            {disableHint ?
              (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-sm text-gray-300">AI-NES</p>
              </div>) :
              (<div className="absolute p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <CpuChipIcon className='mx-auto h-16 m-2' />
                <p className="text-2xl font-semibold">챗봇에게 물어보세요.</p>
                <p className="mt-0.5 text-sm text-gray-400">"오늘 주목할만한 뉴스 분석해줘"</p>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !disableEnter) {
                  handleSendMessage();
                }
              }}
              className="block w-full rounded-2xl border-0 py-4 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 outline-none"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                ref={buttonRef}
                className="h-3/5 rounded-lg border-0 bg-indigo-600 mr-3 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSendMessage}
              >
                <PaperAirplaneIcon className='h-full w-full' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
