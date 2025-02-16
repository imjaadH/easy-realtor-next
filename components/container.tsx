'use client'

import { motion } from 'framer-motion'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      style={{ height: '100%' }}
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.185 }}
    >
      {children}
    </motion.div>
  )
}
