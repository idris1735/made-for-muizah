"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 mb-6 tracking-tight">
          Made with love,
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">for Muizah</span>
        </h1>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="mb-8"
        >
          <Heart className="w-16 h-16 mx-auto text-red-500" />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300 text-lg"
          onClick={onStart}
        >
          Let me muzz you, click me
        </motion.button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-red-700 text-sm"
      >
        Tap to begin a journey of love and laughter
      </motion.div>
    </motion.div>
  )
}

