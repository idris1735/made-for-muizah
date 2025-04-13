export interface ColorScheme {
  background: string
  text: string
  button: string
  gradientColors: string[]
  animationDuration: string
}

export const colorSchemes: { [key: number]: ColorScheme } = {
  0: {
    background: "bg-yellow-100",
    text: "text-red-600",
    button: "bg-blue-500 hover:bg-blue-600",
    gradientColors: ["#FEF3C7", "#FDE68A", "#FCD34D"],
    animationDuration: "15s",
  },
  1: {
    background: "bg-green-100",
    text: "text-green-800",
    button: "bg-green-500 hover:bg-green-600",
    gradientColors: ["#D1FAE5", "#6EE7B7", "#34D399"],
    animationDuration: "20s",
  },
  2: {
    background: "bg-blue-100",
    text: "text-blue-800",
    button: "bg-indigo-500 hover:bg-indigo-600",
    gradientColors: ["#DBEAFE", "#93C5FD", "#60A5FA"],
    animationDuration: "18s",
  },
  3: {
    background: "bg-yellow-200",
    text: "text-yellow-800",
    button: "bg-yellow-500 hover:bg-yellow-600",
    gradientColors: ["#FEF3C7", "#FDE68A", "#FBBF24"],
    animationDuration: "22s",
  },
  4: {
    background: "bg-red-100",
    text: "text-red-800",
    button: "bg-orange-500 hover:bg-orange-600",
    gradientColors: ["#FEE2E2", "#FECACA", "#FCA5A5"],
    animationDuration: "17s",
  },
  5: {
    background: "bg-amber-100",
    text: "text-amber-800",
    button: "bg-yellow-700 hover:bg-yellow-800",
    gradientColors: ["#FEF3C7", "#FDE68A", "#F59E0B"],
    animationDuration: "19s",
  },
  6: {
    background: "bg-gray-100",
    text: "text-gray-800",
    button: "bg-blue-500 hover:bg-blue-600",
    gradientColors: ["#F3F4F6", "#E5E7EB", "#D1D5DB"],
    animationDuration: "21s",
  },
  7: {
    background: "bg-purple-100",
    text: "text-purple-800",
    button: "bg-purple-500 hover:bg-purple-600",
    gradientColors: ["#F3E8FF", "#E9D5FF", "#D8B4FE"],
    animationDuration: "16s",
  },
  8: {
    background: "bg-gray-200",
    text: "text-gray-800",
    button: "bg-red-500 hover:bg-red-600",
    gradientColors: ["#E5E7EB", "#D1D5DB", "#9CA3AF"],
    animationDuration: "23s",
  },
  9: {
    background: "bg-red-200",
    text: "text-red-800",
    button: "bg-blue-500 hover:bg-blue-600",
    gradientColors: ["#FECACA", "#FCA5A5", "#F87171"],
    animationDuration: "18s",
  },
  10: {
    background: "bg-teal-100",
    text: "text-teal-800",
    button: "bg-pink-500 hover:bg-pink-600",
    gradientColors: ["#CCFBF1", "#99F6E4", "#5EEAD4"],
    animationDuration: "20s",
  },
  11: {
    background: "bg-pink-100",
    text: "text-pink-800",
    button: "bg-red-500 hover:bg-red-600",
    gradientColors: ["#FCE7F3", "#FBCFE8", "#F9A8D4"],
    animationDuration: "19s",
  },
  12: {
    background: "bg-orange-100",
    text: "text-orange-800",
    button: "bg-red-500 hover:bg-red-600",
    gradientColors: ["#FFEDD5", "#FED7AA", "#FDBA74"],
    animationDuration: "17s",
  },
}

