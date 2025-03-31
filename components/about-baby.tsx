"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function AboutBaby() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8">우리 아이를 소개합니다</h2>

          <div className="bg-pink-50 rounded-2xl p-6 md:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-left space-y-4 flex-1">
                <p className="text-lg text-gray-700">
                  <span className="font-medium">이름:</span> 김세아
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">생년월일:</span> 2024년 7월 25일
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">아빠:</span> 김수민
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">엄마:</span> 박지연
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">특기:</span> 엄마 찾기, 엎드러뻗쳐
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-medium">좋아하는것:</span> 엄마
                </p>
              </div>

              <div className="flex-1">
                <p className="text-lg text-gray-700 italic">
                  "우리 세아가 세상에 온 지 벌써 1년이 되었습니다. 매일매일 새로운 모습을 보여주며 자라는 세아의 첫 번째
                  생일을 함께 축하해 주세요."
                </p>
                <div className="flex justify-center mt-4">
                  <Heart className="text-pink-400" />
                  <Heart className="text-pink-500 mx-2" />
                  <Heart className="text-pink-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

