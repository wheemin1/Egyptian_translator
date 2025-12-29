import { motion } from 'framer-motion';
import { HIEROGLYPH_MAP } from '@/constants/hieroglyphMapping';

interface HieroglyphSymbolProps {
  letter: string;
  index: number;
}

const getHieroglyphGlyph = (letter: string): string => {
  return HIEROGLYPH_MAP[letter.toUpperCase()] ?? letter;
};

const HieroglyphSymbol = ({ letter }: HieroglyphSymbolProps) => {
  const glyph = getHieroglyphGlyph(letter);

  return (
    <motion.div
      className="hieroglyph-symbol"
      variants={{
        hidden: { 
          opacity: 0, 
          scale: 0.5,
          y: 10,
        },
        visible: { 
          opacity: 1, 
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
          }
        }
      }}
    >
      <span
        className="hieroglyph-glyph text-gold select-none"
        style={{ fontFamily: "'Noto Sans Egyptian Hieroglyphs', serif" }}
        title={`Original: ${letter}`}
        aria-label={`Hieroglyph for ${letter}`}
      >
        {glyph}
      </span>
    </motion.div>
  );
};

export default HieroglyphSymbol;