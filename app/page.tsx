import { BirthdayHeader } from "@/components/birthday-header"
import { AboutBaby } from "@/components/about-baby"
import { PhotoGallery } from "@/components/photo-gallery"
import { Timeline } from "@/components/timeline"
import { Invitation } from "@/components/invitation"
import { MessageBoard } from "@/components/message-board"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <BirthdayHeader />
      <AboutBaby />
      <PhotoGallery />
      <Timeline />
      <Invitation />
      <MessageBoard />
      <Footer />
    </main>
  )
}

