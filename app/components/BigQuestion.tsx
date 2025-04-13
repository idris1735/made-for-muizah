'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stages = ['intro', 'game', 'question', 'celebration']

const shynessMessages = [
  "Hmm... trying to click 'No'? That's not very romantic! 😏",
  "The 'Yes' button is a bit shy... it's hiding somewhere 🙈",
  "Still trying? You're persistent! The 'Yes' button is getting curious...",
  "The 'Yes' button is peeking... but still too nervous to show up 👀",
  "Idris: 'Oya Yes button, stop forming! Come out!!' 😤",
  "Yes button: 'But I'm shy...' 🥺",
  "Idris: *gives Yes button a gentle push* 'Don't worry, she's amazing!' 💖",
]

const hintMessages = [
  "Click 'No' to continue...",
  "You need to try the 'No' button first 😊",
  "Don't be shy, click 'No' to see what happens!",
  "Idris says: Click 'No' to start the magic ✨",
]

export default function BigQuestion({
  onYes,
  onNo,
}: {
  onYes: () => void
  onNo: () => void
}) {
  const [stage, setStage] = useState(stages[0])
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; clicked: boolean }[]
  >([])
  const [score, setScore] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [noAttempts, setNoAttempts] = useState(0)
  const [yesVisible, setYesVisible] = useState(false)
  const [shynessText, setShynessText] = useState('')
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [hintIndex, setHintIndex] = useState(0)

  useEffect(() => {
    if (stage === 'game') {
      const interval = setInterval(() => {
        const xPosition =
          window.innerWidth < 768
            ? Math.random() * 60 + 20 // More centered on mobile
            : Math.random() * 80 + 10
        setHearts((prevHearts) => [
          ...prevHearts,
          { id: Date.now(), x: xPosition, y: 0, clicked: false },
        ])
      }, 800)

      const gameDuration = 20000 // 20 seconds

      const timer = setTimeout(() => {
        clearInterval(interval)
        setStage('question')
      }, gameDuration)

      return () => {
        clearInterval(interval)
        clearTimeout(timer)
      }
    }
  }, [stage])

  useEffect(() => {
    if (stage === 'question') {
      const timer = setTimeout(() => setShowQuestion(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  useEffect(() => {
    if (!yesVisible) {
      const interval = setInterval(() => {
        setHintIndex((prev) => (prev + 1) % hintMessages.length)
      }, 3000) // Rotate hints every 3 seconds

      return () => clearInterval(interval)
    }
  }, [yesVisible])

  const handleHeartClick = useCallback((id: number) => {
    setHearts((prevHearts) =>
      prevHearts.map((heart) =>
        heart.id === id ? { ...heart, clicked: true } : heart
      )
    )
    setScore((prevScore) => prevScore + 1)
  }, [])

  const handleNoHover = useCallback(() => {
    const maxX = 150 // Reduced movement range
    const maxY = 100

    setNoButtonPosition({
      x: Math.random() * maxX - maxX / 2,
      y: Math.random() * maxY - maxY / 2,
    })

    setNoAttempts((prev) => {
      const newAttempts = prev + 1
      setShynessText(
        shynessMessages[Math.min(newAttempts - 1, shynessMessages.length - 1)]
      )

      // Show Yes button after 5 attempts
      if (newAttempts === 5) {
        setTimeout(() => setYesVisible(true), 1000)
      }
      return newAttempts
    })
  }, [])

  const handleYesClick = () => {
    setStage('celebration')
    setTimeout(() => {
      onYes()
    }, 5000) // Show celebration for 5 seconds before moving to the next stage
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-pink-400 overflow-hidden'
    >
      <AnimatePresence mode='wait'>
        {stage === 'intro' && (
          <motion.div
            key='intro'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-lg'
          >
            <h2 className='text-3xl font-bold text-red-600 mb-6'>
              Before I ask you an important question...
            </h2>
            <p className='text-xl text-pink-600 mb-8'>
              Let's play a quick game! Catch as many hearts as you can!
            </p>
            <Button
              variant='default'
              size='lg'
              onClick={() => setStage('game')}
            >
              Let's Play!
            </Button>
          </motion.div>
        )}

        {stage === 'game' && (
          <motion.div
            key='game'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='relative w-full h-screen'
          >
            <div className='absolute top-4 left-4 text-2xl font-bold text-white'>
              Score: {score}
            </div>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ y: -50 }}
                animate={{ y: '100vh' }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{ left: `${heart.x}%` }}
                className='absolute cursor-pointer'
                onClick={() => handleHeartClick(heart.id)}
              >
                <Heart
                  size={window.innerWidth < 768 ? 24 : 32}
                  color={heart.clicked ? 'pink' : 'white'}
                  fill={heart.clicked ? 'pink' : 'white'}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {stage === 'question' && (
          <motion.div
            key='question'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='text-center p-4 md:p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-[90%] md:max-w-lg'
          >
            {!showQuestion ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-2xl md:text-4xl font-bold text-red-600'
              >
                Preparing the next question...
              </motion.p>
            ) : (
              <>
                <div className='flex flex-col items-center gap-8'>
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='text-4xl md:text-4xl font-bold text-red-600'
                  >
                    Muizah, Will you be my Valentine?
                  </motion.h2>

                  {/* Initial hint message */}
                  {!yesVisible && !shynessText && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='text-lg md:text-xl text-pink-600'
                    >
                      {hintMessages[hintIndex]}
                    </motion.p>
                  )}

                  {/* Button container - moved down */}
                  <div className='relative h-[120px] w-[200px]'>
                    {/* Yes button */}
                    {yesVisible && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', duration: 0.8 }}
                        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
                      >
                        <Button
                          variant='default'
                          size='default'
                          className='bg-green-500 hover:bg-green-600 transform transition-transform hover:scale-110 px-4 md:px-8'
                          onClick={handleYesClick}
                        >
                          Yes, I'd love to! 💝
                        </Button>
                      </motion.div>
                    )}

                    {/* No button with touch support */}
                    <motion.div
                      animate={{
                        x: noButtonPosition.x,
                        y: noButtonPosition.y,
                        scale: !yesVisible ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        x: { type: 'spring', damping: 15 },
                        y: { type: 'spring', damping: 15 },
                        scale: { duration: 2, repeat: Infinity },
                      }}
                      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                    >
                      <Button
                        variant='default'
                        size='sm'
                        className='bg-red-500 hover:bg-red-600 shadow-lg px-4 md:px-8'
                        onMouseEnter={handleNoHover}
                        onClick={handleNoHover} // Added for mobile support
                        onTouchStart={handleNoHover} // Added for mobile support
                      >
                        No
                      </Button>
                    </motion.div>
                  </div>

                  {/* Shyness messages - moved below buttons */}
                  {shynessText && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='text-lg md:text-xl text-red-600'
                    >
                      {shynessText}
                    </motion.p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}

        {stage === 'celebration' && (
          <motion.div
            key='celebration'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-lg'
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='text-5xl font-bold text-red-600 mb-8'
            >
              You said YESSSS! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className='text-2xl text-pink-600 mb-8'
            >
              Muizah, you've just made my day. I love you! ❤️
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className='text-xl text-red-600 mb-4'
            >
              Now, let's plan our small Valentine's Day together!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
