import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import HieroglyphSymbol from './HieroglyphSymbol';
import { extractLetters } from '@/lib/romanizer';

interface CartoucheProps {
  romanizedName: string;
  isVisible: boolean;
}

const Cartouche = ({ romanizedName, isVisible }: CartoucheProps) => {
  const letters = extractLetters(romanizedName);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex flex-col items-center gap-5"
        >
          {/* The Ornamental Cartouche */}
          <div className="cartouche-frame min-w-[180px]">
            {/* Top Cap */}
            <div className="cartouche-cap cartouche-cap-top" />
            
            {/* Hieroglyph Symbols */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-1 py-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.2,
                  }
                }
              }}
            >
              {letters.map((letter, index) => (
                <HieroglyphSymbol key={`${letter}-${index}`} letter={letter} index={index} />
              ))}
            </motion.div>

            {/* Romanized Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + letters.length * 0.08 }}
              className="text-center mt-3"
            >
              <span className="romanized-text text-sm text-soft-black tracking-[0.25em]">
                {romanizedName.toUpperCase()}
              </span>
            </motion.div>

            {/* Bottom Cap */}
            <div className="cartouche-cap cartouche-cap-bottom" />
          </div>

          {/* Verified Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + letters.length * 0.08 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
          >
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span className="text-xs text-gray tracking-wide">
              Archive Verified · 기록 인증됨
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cartouche;