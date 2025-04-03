"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Trash2, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"


// 메시지 타입 정의
interface Message {
  id: string
  name: string
  message: string
  timestamp: Date
}

export function MessageBoard() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/v2/messages");
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && message.trim()) {
      const newMessage = { name, message }

      const res = await fetch("/api/v2/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if(res.ok){
        const createdMessage: Message = await res.json(); // POST 응답 데이터 타입 적용
        setMessages([...messages, createdMessage])
        setName("")
        setMessage("")
      }

      
    }
  }

  const handleDelete = async (id: string) => {

    const res = await fetch("/api/v2/messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: id}),
    });

    if(res.ok){
      setMessages(messages.filter((msg) => msg.id !== id))
      setName("")
      setMessage("")
    }
    
  }

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-500 mb-8">축하 메시지</h2>

          <div className="bg-pink-50 rounded-2xl p-6 md:p-8 shadow-md mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  축하 메시지
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 min-h-[100px]"
                  placeholder="축하 메시지를 남겨주세요"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors"
              >
                <Send size={18} />
                메시지 남기기
              </button>
            </form>
          </div>

          <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: -100,
                    scale: 0.8,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  transition={{ duration: 0.4 }}
                  layout
                className="bg-white border border-pink-100 rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-pink-600">{msg.name}</p>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 group"
                    aria-label="메시지 삭제"
                  >
                    <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <p className="text-gray-700 my-2">{msg.message}</p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Clock size={12} className="mr-1" />
                  <time dateTime={new Date(msg.timestamp).toISOString()}>
                    {formatDate(new Date(msg.timestamp))} ({formatDistanceToNow(msg.timestamp, { addSuffix: true, locale: ko })})
                  </time>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

