"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

// Updated gift options
export const giftOptions = [
  { id: "suya", name: "Suya Treat from Your Favorite Spot", emoji: "🍢" },
  { id: "jollof", name: "Jollof Rice & Grilled Chicken Combo", emoji: "🍛" },
  { id: "keychain", name: "Custom Keychain with Initials", emoji: "🔑" },
  { id: "data", name: "Data Bundle for Browsing Netflix Together", emoji: "📶" },
  { id: "chin_chin", name: "Chin-Chin & Small Chops Hamper", emoji: "🍘" },
  { id: "ankara_bag", name: "Ankara Tote Bag", emoji: "👜" },
  { id: "playlist", name: "Personalized Playlist of Love Songs", emoji: "🎵" },
  { id: "jewelry", name: "Local Artisan Necklace or Bracelet", emoji: "📿" },
  { id: "movie", name: "Movie Night (Netflix & Snacks)", emoji: "🎥" },
  { id: "framed_photo", name: "Framed Picture of Your Favorite Memory Together", emoji: "🖼️" },
  { id: "phone_case", name: "Customized Phone Case", emoji: "📱" },
  { id: "note_bottle", name: "Romantic Note in a Bottle", emoji: "💌" },
  { id: "cupcakes", name: "Mini Cupcake Box", emoji: "🧁" },
  { id: "photo_album", name: "Photo Album or Scrapbook", emoji: "📷" },
  { id: "street_food", name: "Date Night with Street Food (Ewa Agoyin, Boli & Fish)", emoji: "🍠" },
  { id: "ankara_bracelet", name: "Matching Ankara Bracelets", emoji: "🤝" },
  { id: "perfume", name: "Affordable Perfume or Body Mist", emoji: "🧴" },
  { id: "dance", name: "Dance Together to Afrobeat Music at Home", emoji: "💃" },
  { id: "beach", name: "Romantic Walk at a Beach (Lekki, Tarkwa Bay)", emoji: "🌊" },
  { id: "mug", name: "Personalized Mug with a Cute Message", emoji: "☕" },
  { id: "wristbands", name: "Couple's Wristbands or Anklets", emoji: "🪢" },
  { id: "dinner", name: "Candlelit Dinner at Home (DIY Setup)", emoji: "🕯️" },
  { id: "letter", name: "Handwritten Love Letter", emoji: "✍️" },
  { id: "dessert", name: "Dessert Date with Ice Cream or Cake", emoji: "🍦" },
  { id: "coupons", name: "Customized Love Coupons (E.g., 'Redeem for a Hug')", emoji: "🎟️" },
  { id: "flowers", name: "Flowers from a Local Vendor", emoji: "💐" },
  { id: "cooking", name: "Cooking a Meal Together", emoji: "👩‍🍳" },
  { id: "chocolate", name: "Chocolate Box with a Note", emoji: "🍫" },
  { id: "star", name: "A Simple Star Watching Night", emoji: "⭐" },
  { id: "love_jar", name: "A 'Reasons I Love You' Jar", emoji: "🏺" },
]

export default function GiftSelection({ onComplete }: { onComplete: (gifts: string[]) => void }) {
  const [selectedGifts, setSelectedGifts] = useState<string[]>([])
  const [showPopup, setShowPopup] = useState(false)

  const toggleGift = (giftId: string) => {
    setSelectedGifts((prev) =>
      prev.includes(giftId) ? prev.filter((id) => id !== giftId) : prev.length < 10 ? [...prev, giftId] : prev,
    )
  }

  const handleComplete = () => {
    setShowPopup(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-300 to-pink-400 p-4"
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Choose Your Valentine's Gifts</h2>
        <p className="text-xl text-pink-600 mb-8 text-center">Select up to 10 items to fill your gift box!</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {giftOptions.map((gift) => (
            <motion.button
              key={gift.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg shadow-md transition duration-300 ${
                selectedGifts.includes(gift.id) ? "bg-red-500 text-white" : "bg-white text-red-600 hover:bg-red-100"
              }`}
              onClick={() => toggleGift(gift.id)}
              disabled={selectedGifts.length >= 10 && !selectedGifts.includes(gift.id)}
            >
              <span className="text-4xl mb-2 block">{gift.emoji}</span>
              <span className="font-semibold">{gift.name}</span>
            </motion.button>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-lg text-red-600 font-semibold">Selected: {selectedGifts.length} / 10</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300"
            onClick={handleComplete}
            disabled={selectedGifts.length === 0}
          >
            Finish
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full relative"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold text-red-600 mb-4">A little secret...</h3>
              <p className="text-lg text-gray-700 mb-6">
                I hope you know you can't get all these gifts at once, but I'll try my best to make it as special as
                possible. Your happiness is what matters most! 💖
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300 w-full"
                onClick={() => {
                  setShowPopup(false)
                  onComplete(selectedGifts)
                }}
              >
                I understand, let's continue!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

