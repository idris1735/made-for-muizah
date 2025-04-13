'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colorSchemes, type ColorScheme } from '../utils/colorSchemes'

const puns = [
  {
    text: "Are you a parking ticket? Because you've got 'FINE' written all over you.",
    emoji: '🚗🔥',
  },
  {
    text: "Are you a loan from the bank? Because you've got my interest.",
    emoji: '💸💘',
  },
  {
    text: "Are you Wi-Fi? Because I'm always connected to your presence.",
    emoji: '📡💓',
  },
  {
    text: "Are you NEPA light? Because you brighten up my world, even when it's unexpected.",
    emoji: '💡⚡',
  },
  {
    text: "Are you suya? Because you're hot and spicy, and you've got me craving more.",
    emoji: '🔥🍢',
  },
  {
    text: "Are you amala and ewedu? Because you've got me feeling complete.",
    emoji: '🍴💞',
  },
  {
    text: 'Are you a generator? Because you keep me going, no matter how tough things get.',
    emoji: '🔌🫶',
  },
  {
    text: "Do you have juju? Because there's no other way to explain how you've enchanted me.",
    emoji: '🪄💘',
  },
  {
    text: 'Are you a camera? Because every time I look at you, I smile.',
    emoji: '📸😊',
  },
  { text: "Is your dad a boxer? Because you're a knockout.", emoji: '🥊😍' },
  {
    text: "Are you made of copper and tellurium? Because you're Cu-Te.",
    emoji: '🧪🔥',
  },
  {
    text: 'Do you believe in love at first sight, or should I walk by again?',
    emoji: '🚶‍♂️✨',
  },
  { text: 'Are you a volcano? Because I wanna be your lava.', emoji: '🌋🔥' },
]

const buttonTexts = [
  'Show me another! 💫',
  'That was cute, next! 🌟',
  'Keep them coming! 💝',
  'Ooo, I like these! More! ✨',
  'These are sweet, another! 🎭',
  "You're making me blush! Next! 🌸",
  'Aww, show me more! 💫',
  "I'm loving these! Continue! 🌟",
  "You're good at this! Next! 💖",
  'Getting better! More! ✨',
]

export default function PunGenerator({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [currentPun, setCurrentPun] = useState(0)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemes[0])

  useEffect(() => {
    setColorScheme(colorSchemes[currentPun])
  }, [currentPun])

  const nextPun = () => {
    if (currentPun < puns.length - 1) {
      setCurrentPun(currentPun + 1)
    } else {
      onComplete()
    }
  }

  const buttonText = () => {
    if (currentPun === puns.length - 1) {
      return 'Ready for the big question? 💝'
    } else if (currentPun === puns.length - 2) {
      return 'Last one coming up! ✨'
    } else if (currentPun === puns.length - 3) {
      return 'Almost there! 🌟'
    } else {
      return buttonTexts[Math.floor(Math.random() * buttonTexts.length)]
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='text-center min-h-screen flex flex-col items-center justify-center relative overflow-hidden'
      style={{
        backgroundImage: `linear-gradient(-45deg, ${colorScheme.gradientColors.join(
          ', '
        )})`,
        backgroundSize: '400% 400%',
        animationName: 'gradient',
        animationDuration: colorScheme.animationDuration,
        animationTimingFunction: 'ease',
        animationIterationCount: 'infinite',
      }}
    >
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className='relative z-10 p-6 rounded-xl bg-white bg-opacity-80 backdrop-blur-sm max-w-md w-full mx-auto'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentPun}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
            <h2 className={`text-2xl font-bold mb-3 ${colorScheme.text}`}>
              {puns[currentPun].text}
            </h2>
            <span className='text-5xl'>{puns[currentPun].emoji}</span>
          </motion.div>
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${colorScheme.button} text-white px-5 py-2 rounded-full font-semibold shadow-lg transition duration-300 mt-4`}
          onClick={nextPun}
        >
          {buttonText()}
        </motion.button>
      </div>
    </motion.div>
  )
}
