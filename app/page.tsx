"use client"

import { useState } from "react"
import LandingPage from "./components/LandingPage"
import PunGenerator from "./components/PunGenerator"
import TransitionPage from "./components/TransitionPage"
import BigQuestion from "./components/BigQuestion"
import FoodPreferences from "./components/FoodPreferences"
import GiftSelection from "./components/GiftSelection"
import Celebration from "./components/Celebration"

export default function ValentineApp() {
  const [stage, setStage] = useState("landing")
  const [selectedFood, setSelectedFood] = useState("")
  const [selectedGifts, setSelectedGifts] = useState<string[]>([])

  const nextStage = (newStage: string) => setStage(newStage)

  return (
    <div className="min-h-screen font-sans antialiased">
      {stage === "landing" && <LandingPage onStart={() => nextStage("puns")} />}
      {stage === "puns" && <PunGenerator onComplete={() => nextStage("transition")} />}
      {stage === "transition" && <TransitionPage onContinue={() => nextStage("question")} />}
      {stage === "question" && (
        <BigQuestion
          onYes={() => nextStage("food")}
          onNo={() => nextStage("question")} // This will reset the question if they say no
        />
      )}
      {stage === "food" && (
        <FoodPreferences
          onSelect={(food) => {
            setSelectedFood(food)
            nextStage("gifts")
          }}
        />
      )}
      {stage === "gifts" && (
        <GiftSelection
          onComplete={(gifts) => {
            setSelectedGifts(gifts)
            nextStage("celebration")
          }}
        />
      )}
      {stage === "celebration" && <Celebration food={selectedFood} gifts={selectedGifts} />}
    </div>
  )
}

