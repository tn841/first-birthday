"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cake, Heart, Star } from "lucide-react"
import Image from "next/image"

export function BirthdayHeader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 z-0">
        {/* 배경 장식 요소들 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.7, 0.3, 0.7],
              x: Math.random() * 100 - 5,
              y: Math.random() * 100 - 5,
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: ["#FFB6C1", "#FFC0CB", "#FFD1DC", "#FFBBDD"][Math.floor(Math.random() * 4)],
            }}
          >
            {
              [<Heart key="heart" size={30} />, <Star key="star" size={30} />, <Cake key="cake" size={30} />][
                Math.floor(Math.random() * 3)
              ]
            }
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-2 text-5xl font-bold text-pink-500 md:text-7xl">세아의 첫 돌을 축하합니다.</h1>
          <p className="mb-8 text-xl text-purple-700 md:text-2xl">소중한 첫 번째 생일을 함께 축하해주세요</p>
        </motion.div>

        <div className="flex justify-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-pink-200 shadow-lg md:h-80 md:w-80"
          >
            <Image src="/02.jpg" alt="세아 사진 1" fill className="object-cover" priority />
          </motion.div>

        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <p className="text-lg text-gray-700">2024년 7월 25일</p>
        </motion.div>
      </div>
    </section>
  )
}

