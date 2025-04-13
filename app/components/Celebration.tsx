'use client'

import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useState, useRef } from 'react'
import { giftOptions } from './GiftSelection'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'

interface CelebrationProps {
  food: string
  gifts: string[]
}

export default function Celebration({ food, gifts }: CelebrationProps) {
  const [showGiftBox, setShowGiftBox] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = 15 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      )
    }, 250)

    const giftBoxTimer = setTimeout(() => {
      setShowGiftBox(true)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(giftBoxTimer)
    }
  }, [])

  const foodEmoji = {
    italian: '🍝',
    japanese: '🍣',
    nigerian: '🍛',
    mexican: '🌮',
    seafood: '🦞',
    steakhouse: '��',
    chinese: '🥡',
    desserts: '🍦',
  }[food]

  const giftEmojis = gifts.map((gift) => {
    const giftOption = giftOptions.find((option) => option.id === gift)
    return giftOption ? giftOption.emoji : ''
  })

  const generateAndShareImage = async () => {
    if (summaryRef.current) {
      try {
        const canvas = await html2canvas(summaryRef.current, {
          backgroundColor: '#fff5f5', // Light pink background
          scale: 2,
        })

        // Convert canvas to blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (blob) => {
              resolve(blob!)
            },
            'image/jpeg',
            0.9
          )
        })

        // Create shareable file
        const file = new File([blob], 'valentine-plan.jpg', {
          type: 'image/jpeg',
        })

        // Share via Web Share API if supported
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: "Our Valentine's Day Plan",
            text: "Check out our Valentine's Day plan! 💝",
          })
        } else {
          // Fallback: Download image
          const link = document.createElement('a')
          link.href = canvas.toDataURL('image/jpeg')
          link.download = 'valentine-plan.jpg'
          link.click()
        }

        // After sharing/downloading, show the question
        setTimeout(() => {
          setShowQuestion(true)
        }, 1000)
      } catch (error) {
        console.error('Error generating image:', error)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-red-500 overflow-hidden p-4'
    >
      <div className='text-center p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl max-w-2xl relative z-10'>
        {/* Invoice-style summary */}
        <div
          ref={summaryRef}
          className='p-8 rounded-lg bg-white shadow-lg text-left'
        >
          <div className='border-b-2 border-red-200 pb-4 mb-6'>
            <h2 className='text-3xl font-bold text-red-600 mb-2'>
              Valentine's Invoice
            </h2>
            <p className='text-gray-600'>Date: February 14, 2025</p>
            <p className='text-gray-600'>Invoice #: LOVE-2025-001</p>
          </div>

          <div className='mb-6'>
            <p className='font-semibold text-gray-800'>From:</p>
            <p className='text-gray-700'>Idris 💝</p>
            <p className='text-gray-700'>Chief Romance Officer</p>
            <p className='text-gray-700'>Love Department</p>
          </div>

          <div className='mb-8'>
            <p className='font-semibold text-gray-800'>To:</p>
            <p className='text-gray-700'>Muizah ❤️</p>
            <p className='text-gray-700'>Queen of My Heart</p>
            <p className='text-gray-700'>Forever & Always</p>
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-bold text-red-600 mb-4'>
              Valentine's Day Commitments:
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center border-b border-pink-100 pb-2'>
                <span className='text-gray-700'>Special Lunch Date 🍽️</span>
                <span className='text-gray-700'>
                  {foodEmoji} {food.charAt(0).toUpperCase() + food.slice(1)}{' '}
                  Cuisine
                </span>
              </div>
              <div className='flex justify-between items-center border-b border-pink-100 pb-2'>
                <span className='text-gray-700'>Surprise Gift Box 🎁</span>
                <span className='text-gray-700'>{giftEmojis.join(' ')}</span>
              </div>
              <div className='flex justify-between items-center border-b border-pink-100 pb-2'>
                <span className='text-gray-700'>Unlimited Hugs 🤗</span>
                <span className='text-gray-700'>∞</span>
              </div>
              <div className='flex justify-between items-center border-b border-pink-100 pb-2'>
                <span className='text-gray-700'>Sweet Moments 💫</span>
                <span className='text-gray-700'>Countless</span>
              </div>
            </div>
          </div>

          <div className='text-center mt-8 pt-4 border-t-2 border-red-200'>
            <p className='text-lg text-red-600 font-semibold'>Payment Terms:</p>
            <p className='text-gray-700'>
              Payable in smiles, hugs, and happy memories 💖
            </p>
            <p className='text-sm text-gray-500 mt-2'>
              This invoice is valid forever
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center gap-4'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300 mt-6'
            onClick={generateAndShareImage}
          >
            Share Invoice 📱
          </motion.button>

          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-6 p-4 bg-pink-50 rounded-lg shadow-md'
            >
              <p className='text-lg text-pink-600 mb-4'>
                Are you impressed? 🤔
              </p>
              <div className='flex gap-4 justify-center'>
                <Button
                  variant='default'
                  size='lg'
                  className='bg-green-500 hover:bg-green-600'
                  onClick={() => alert('Yay! You owe Idris a deep kiss! 💋')}
                >
                  Yes! 🥰
                </Button>
                <Button
                  variant='default'
                  size='lg'
                  className='bg-pink-400 hover:bg-pink-500'
                  onClick={() => alert('Aww... 🥺 He tried his best!')}
                >
                  Not really 😅
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <FloatingHearts />
      <AnimatedGiftBox show={showGiftBox} gifts={gifts} />
    </motion.div>
  )
}

function FloatingHearts() {
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute text-5xl'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            y: [null, -200],
            scale: [null, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'loop',
            delay: Math.random() * 5,
          }}
        >
          {
            [
              '❤️',
              '💖',
              '💕',
              '💓',
              '💗',
              '💘',
              '💝',
              '💞',
              '💌',
              '💋',
              '🌹',
              '🌷',
              '🌸',
              '💐',
              '🥀',
              '🌺',
              '💑',
              '👩‍❤️‍👨',
              '👩‍❤️‍👩',
              '👨‍❤️‍👨',
              '💍',
              '🍫',
              '🍬',
              '🍓',
              '🍒',
              '🍷',
              '🥂',
              '🥰',
              '😘',
              '😻',
              '💘',
              '💓',
              '💋',
              '💝',
              '💌',
            ][Math.floor(Math.random() * 33)]
          }
        </motion.div>
      ))}
    </div>
  )
}

function AnimatedGiftBox({ show, gifts }: { show: boolean; gifts: string[] }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='fixed bottom-10 right-10 bg-white p-6 rounded-xl shadow-2xl'
        >
          <h3 className='text-2xl font-bold text-red-600 mb-4'>
            Your Gift Box
          </h3>
          <div className='grid grid-cols-3 gap-2'>
            {gifts.map((gift, index) => {
              const giftOption = giftOptions.find(
                (option) => option.id === gift
              )
              return (
                <motion.div
                  key={gift}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className='text-3xl'
                >
                  {giftOption?.emoji}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
