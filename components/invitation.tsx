"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Gift } from "lucide-react"

export function Invitation() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-8">첫 생일 파티에 초대합니다</h2>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-pink-100">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <div className="bg-pink-50 p-4 rounded-full">
                  <Calendar className="text-pink-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">날짜</h3>
                  <p className="text-gray-600">2025년 7월 25일 (금요일)</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <div className="bg-pink-50 p-4 rounded-full">
                  <Clock className="text-pink-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">시간</h3>
                  <p className="text-gray-600">오후 12시 ~ 오후 3시</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <div className="bg-pink-50 p-4 rounded-full">
                  <MapPin className="text-pink-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">장소</h3>
                  <p className="text-gray-600">서울시 강남구 테헤란로 123 파티룸</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <div className="bg-pink-50 p-4 rounded-full">
                  <Gift className="text-pink-500 w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">선물 안내</h3>
                  <p className="text-gray-600">아이에게 필요한 것은 여러분의 축복과 사랑입니다.</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors">
                참석 여부 알려주기
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

