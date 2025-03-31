"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function MessageBoard() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{name: string; message: string}[]>([])

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && message.trim()) {
      const newMessage = { name, message }

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if(res.ok){
        setMessages([...messages, { name, message }])
        setName("")
        setMessage("")
      }

      
    }
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
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-pink-100 rounded-lg p-4 shadow-sm"
              >
                <p className="font-medium text-pink-600 mb-1">{msg.name}</p>
                <p className="text-gray-700">{msg.message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

