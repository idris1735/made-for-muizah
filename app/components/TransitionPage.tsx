"use client"

import { motion } from "framer-motion"

export default function TransitionPage({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-lg"
      >
        <h2 className="text-3xl font-bold text-purple-700 mb-6">I hope I made you smile enough...</h2>
        <p className="text-xl text-purple-600 mb-8">Now, I have something important to ask you.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition duration-300"
          onClick={onContinue}
        >
          Ready or not, click me!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

