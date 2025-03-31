"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const photos = [
    { src: "/01.jpg", alt: "신생아 시절" },
    { src: "/02.jpg", alt: "100일" },
    { src: "/03.jpg", alt: "첫 웃음" },
    { src: "/04.jpg", alt: "첫 이유식" },
    { src: "/05.jpg", alt: "첫 기어가기" },
    { src: "/06.jpg", alt: "첫 돌 촬영" },
  ]

  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-purple-600">성장 앨범</h2>
          <p className="text-lg text-gray-600 mt-2">첫 1년간의 소중한 순간들</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(index)}
            >
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white p-3 w-full text-center">{photo.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>

            <button
              className="absolute left-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedImage((prev) => (prev === 0 ? photos.length - 1 : prev! - 1))}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative h-[80vh] w-[80vw] max-w-4xl">
              <Image
                src={photos[selectedImage].src || "/placeholder.svg"}
                alt={photos[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>

            <button
              className="absolute right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setSelectedImage((prev) => (prev === photos.length - 1 ? 0 : prev! + 1))}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

