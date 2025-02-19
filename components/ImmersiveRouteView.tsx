import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building, TreesIcon as Tree } from 'lucide-react'

interface ImmersiveRouteViewProps {
  route: { start: [number, number]; end: [number, number] }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

const ImmersiveRouteView: React.FC<ImmersiveRouteViewProps> = ({ route }) => {
  return (
    <motion.div 
      className="w-full h-64 bg-gradient-to-b from-blue-300 to-blue-600 relative overflow-hidden rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sky */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Road */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/3 bg-gray-700"
        variants={itemVariants}
      >
        <motion.div
          className="absolute left-0 right-0 h-2 bg-yellow-400"
          style={{ top: '50%' }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Buildings and Trees */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-1/3"
          style={{ left: `${i * 25}%` }}
          variants={itemVariants}
          animate={{
            x: [0, -window.innerWidth],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          <Building className="text-gray-800 w-16 h-16" />
        </motion.div>
      ))}

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-1/3"
          style={{ left: `${i * 25 + 12.5}%` }}
          variants={itemVariants}
          animate={{
            x: [0, -window.innerWidth],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2 + 1,
          }}
        >
          <Tree className="text-green-800 w-12 h-12" />
        </motion.div>
      ))}

      {/* Direction Arrow */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ArrowRight className="text-white w-12 h-12" />
      </motion.div>
    </motion.div>
  )
}

export default ImmersiveRouteView

