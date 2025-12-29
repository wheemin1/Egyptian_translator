import { motion } from 'framer-motion';

const LoadingState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-5 py-6"
    >
      {/* Scarab Icon */}
      <motion.div
        className="scarab-pulse"
        animate={{ 
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          width="56" 
          height="56" 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-gold"
        >
          {/* Scarab Body */}
          <ellipse cx="32" cy="36" rx="14" ry="18" fill="currentColor" opacity="0.9"/>
          <ellipse cx="32" cy="36" rx="10" ry="14" fill="currentColor"/>
          
          {/* Head */}
          <circle cx="32" cy="18" r="8" fill="currentColor"/>
          <circle cx="32" cy="18" r="5" fill="currentColor" opacity="0.7"/>
          
          {/* Wings */}
          <path d="M18 32 C10 28, 6 36, 12 44 C16 40, 18 36, 18 32Z" fill="currentColor" opacity="0.8"/>
          <path d="M46 32 C54 28, 58 36, 52 44 C48 40, 46 36, 46 32Z" fill="currentColor" opacity="0.8"/>
          
          {/* Legs */}
          <path d="M22 42 L14 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 46 L18 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M42 42 L50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 46 L46 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Loading Bar */}
      <div className="w-40 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full loading-shimmer rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* Text */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-gray font-medium"
      >
        고대 문헌을 해석하는 중...
      </motion.p>
    </motion.div>
  );
};

export default LoadingState;