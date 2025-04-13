"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const cuisineOptions = [
  { id: "italian", name: "Italian (La Taverna)", emoji: "🍝", caption: "Pasta, pizza, and all things romantic—just like our vibe." },
  { id: "japanese", name: "Japanese (Blowfish Sushi)", emoji: "🍣", caption: "Delicate, refined, and unforgettable—just like you." },
  { id: "nigerian", name: "Nigerian (Yellow Chilli)", emoji: "🍛", caption: "Bold, spicy, and deeply comforting. A classic choice." },
  { id: "mexican", name: "Mexican (Casa Lydia)", emoji: "🌮", caption: "Fiery and full of zest—perfect for adventurous hearts." },
  { id: "seafood", name: "Seafood (Ocean Basket)", emoji: "🦞", caption: "Fresh, indulgent, and ocean-kissed, for a taste of luxury." },
  { id: "steakhouse", name: "Steakhouse (Johnny Rockets)", emoji: "🥩", caption: "Juicy, hearty, and utterly satisfying—just like us!" },
  { id: "chinese", name: "Chinese (Red Chinese Restaurant)", emoji: "🥡", caption: "Rich flavors, ancient traditions. A timeless classic." },
  { id: "desserts", name: "Desserts (Hans & René)", emoji: "🍦", caption: "Sweet, delightful, and always a mood booster!" },
];

export default function FoodPreferences({ onSelect }: { onSelect: (cuisine: string) => void }) {
  const [selectedCuisine, setSelectedCuisine] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 to-red-400"
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">What’s our ultimate VI cuisine date?</h2>
        <p className="text-xl text-pink-600 mb-8 text-center">You know I suck at trying to come up with ideas for you</p>
        <p className="text-xl text-pink-600 mb-8 text-center">Let’s pick the perfect spot for our Valentine’s Day!</p>
        <p className="text-xl text-pink-600 mb-8 text-center">Because only the best will do for us. 💕</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cuisineOptions.map((cuisine) => (
            <motion.button
              key={cuisine.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg shadow-md transition duration-300 ${
                selectedCuisine === cuisine.id ? "bg-red-500 text-white" : "bg-white text-red-600 hover:bg-red-100"
              }`}
              onClick={() => setSelectedCuisine(cuisine.id)}
            >
              <span className="text-4xl mb-2 block">{cuisine.emoji}</span>
              <span className="font-semibold">{cuisine.name}</span>
              <p className="text-sm text-gray-500 mt-2">{cuisine.caption}</p>
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition duration-300 w-full"
          onClick={() => onSelect(selectedCuisine)}
          disabled={!selectedCuisine}
        >
          Let’s Lock It In! 🍴
        </motion.button>
      </div>
    </motion.div>
  );
}

