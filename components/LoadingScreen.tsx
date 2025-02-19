'use client'

import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="flex justify-center items-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <PawPrint className="w-24 h-24 text-emerald-400" />
        </motion.div>
        <motion.h2
          className="text-2xl font-bold text-emerald-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading Pawsitive...
        </motion.h2>
        <motion.div
          className="w-64 h-2 bg-zinc-800 rounded-full mt-4 overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-emerald-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

