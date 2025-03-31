"use client"

import { motion } from "framer-motion"
import { Milestone } from "lucide-react"

export function Timeline() {
  const milestones = [
    { month: 1, title: "첫 미소", description: "처음으로 방긋 웃을 예정이에요" },
    { month: 3, title: "첫 뒤집기", description: "혼자서 뒤집기를 시작할 예정이에요" },
    { month: 6, title: "첫 이유식", description: "단호박으로 첫 이유식을 시작할 예정이에요" },
    { month: 8, title: "첫 기어가기", description: "기어다니기 시작할 예정이에요" },
    { month: 10, title: "첫 걸음마", description: "첫 걸음을 뗄 예정이에요" },
    { month: 12, title: "첫 단어", description: "첫 단어를 말할 예정이에요" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500">첫 1년의 발자취</h2>
          <p className="text-lg text-gray-600 mt-2">우리 아이의 소중한 순간들</p>
        </motion.div>

        <div className="relative">
          {/* 타임라인 중앙선 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-200 transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
              >
                <div className="md:w-1/2 p-4">
                  <div className={`bg-${index % 2 === 0 ? "pink" : "purple"}-100 p-6 rounded-lg shadow-md`}>
                    <h3 className={`text-xl font-bold text-${index % 2 === 0 ? "pink" : "purple"}-600 mb-2`}>
                      {milestone.month}개월 - {milestone.title}
                    </h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>

                <div className="md:w-0 relative flex justify-center my-4 md:my-0">
                  <div className="bg-white rounded-full border-4 border-pink-300 p-2 z-10">
                    <Milestone className="text-pink-500 w-6 h-6" />
                  </div>
                </div>

                <div className="md:w-1/2 p-4 md:opacity-0"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

