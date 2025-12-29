import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { romanizeKorean } from '@/lib/romanizer';
import Cartouche from '@/components/Cartouche';
import ActionButtons from '@/components/ActionButtons';
import LoadingState from '@/components/LoadingState';

const HieroglyphTranslator = () => {
  // State Management
  const [inputName, setInputName] = useState('');
  const [romanizedName, setRomanizedName] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [isEditingRomanized, setIsEditingRomanized] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const romanizedInputRef = useRef<HTMLInputElement>(null);

  // Auto-romanization effect
  useEffect(() => {
    if (inputName.trim() && !isManualEdit) {
      const romanized = romanizeKorean(inputName);
      setRomanizedName(romanized);
    } else if (!inputName.trim()) {
      setRomanizedName('');
      setIsManualEdit(false);
    }
  }, [inputName, isManualEdit]);

  // Reset result when input changes
  useEffect(() => {
    setShowResult(false);
  }, [inputName, romanizedName]);

  const handleEditRomanized = () => {
    setIsEditingRomanized(true);
    setIsManualEdit(true);
    setTimeout(() => romanizedInputRef.current?.focus(), 50);
  };

  const handleRomanizedChange = (value: string) => {
    setRomanizedName(value);
    setIsManualEdit(true);
  };

  const handleRomanizedBlur = () => {
    setIsEditingRomanized(false);
  };

  const handleTranslate = useCallback(() => {
    if (!romanizedName.trim() || isTranslating) return;
    
    setShowResult(false);
    setIsTranslating(true);

    // 1.5 second delay for the "deciphering" animation
    setTimeout(() => {
      setIsTranslating(false);
      setShowResult(true);
    }, 1500);
  }, [romanizedName, isTranslating]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isEditingRomanized) {
      handleTranslate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md relative"
    >
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-soft-black tracking-tight mb-2">
            고대 이집트어 번역기
          </h1>
          <p className="text-sm text-gray">
            파라오의 언어로 당신의 이름을 새겨보세요
          </p>
        </motion.header>

        {/* Main Card */}
        <motion.div 
          ref={cardRef}
          className="glass-card rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Korean Input (Field 1) */}
          <div className="mb-6">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="이름을 입력하세요"
              className="w-full bg-transparent text-2xl md:text-3xl text-center text-soft-black placeholder:text-muted-foreground/50 focus:outline-none py-4 gold-input"
            />
          </div>

          {/* Romanized Input (Field 2) */}
          <AnimatePresence>
            {romanizedName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
              >
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-xl px-5 py-3">
                    {isEditingRomanized ? (
                      <input
                        ref={romanizedInputRef}
                        type="text"
                        value={romanizedName}
                        onChange={(e) => handleRomanizedChange(e.target.value)}
                        onBlur={handleRomanizedBlur}
                        onKeyDown={(e) => e.key === 'Enter' && handleRomanizedBlur()}
                        className="bg-transparent text-lg romanized-text text-soft-black text-center focus:outline-none min-w-[100px]"
                      />
                    ) : (
                      <span className="text-lg romanized-text text-soft-black">
                        {romanizedName.toUpperCase()}
                      </span>
                    )}
                    <button
                      onClick={handleEditRomanized}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                      title="영문 철자 수정"
                    >
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    영문 철자 수정 가능
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Translate Button */}
          <motion.button
            onClick={handleTranslate}
            disabled={!romanizedName.trim() || isTranslating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 gold-button text-lg rounded-2xl disabled:hover:scale-100"
          >
            {isTranslating ? '해독 중...' : '상형문자로 변환하기'}
          </motion.button>

          {/* Loading State */}
          <AnimatePresence>
            {isTranslating && <LoadingState />}
          </AnimatePresence>

          {/* Result Card (capture target) */}
          <div className="mt-8">
            <div
              id="cartouche-card"
              className="flex flex-col items-center rounded-2xl p-8 bg-[#F9F7F2]"
            >
              <Cartouche romanizedName={romanizedName} isVisible={showResult} />
            </div>
          </div>

          {/* Action Buttons */}
          <AnimatePresence>
            {showResult && (
              <div className="mt-8">
                <ActionButtons
                  romanizedName={romanizedName}
                  cardRef={cardRef}
                />
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-xs text-muted-foreground"
        >
          당신의 이름이 영원히 기록됩니다 ☥
        </motion.footer>
    </motion.div>
  );
};

export default HieroglyphTranslator;