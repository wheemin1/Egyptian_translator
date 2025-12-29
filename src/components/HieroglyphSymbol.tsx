import { motion } from 'framer-motion';

interface HieroglyphSymbolProps {
  letter: string;
  index: number;
}

// Placeholder URLs - replace with actual hieroglyph images
const getHieroglyphUrl = (letter: string): string => {
  return `https://via.placeholder.com/100/F5F0E8/8B7355?text=${letter}`;
};

const HieroglyphSymbol = ({ letter }: HieroglyphSymbolProps) => {
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
      <img 
        src={getHieroglyphUrl(letter)} 
        alt={`Hieroglyph for ${letter}`}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </motion.div>
  );
};

export default HieroglyphSymbol;