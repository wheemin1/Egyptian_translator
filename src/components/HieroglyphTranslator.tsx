import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import Cartouche from '@/components/Cartouche';
import ActionButtons from '@/components/ActionButtons';
import LoadingState from '@/components/LoadingState';
import { VIKING_RUNE_CONVERTER_URL } from '@/constants/externalLinks';

const HieroglyphTranslator = () => {
  // State Management
  const [inputName, setInputName] = useState('');
  const [romanizedName, setRomanizedName] = useState('');
  const [translatedRomanizedName, setTranslatedRomanizedName] = useState('');
  const [isManualEdit, setIsManualEdit] = useState(false);
  const [isEditingRomanized, setIsEditingRomanized] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const romanizedInputRef = useRef<HTMLInputElement>(null);

  // Do not auto-translate on typing; keep previous result until user clicks the button.
  // Reset edit intent only when both fields are cleared.
  useEffect(() => {
    if (!inputName.trim() && !romanizedName.trim()) {
      setIsManualEdit(false);
    }
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

  const handleTranslate = useCallback(async () => {
    if (isTranslating) return;

    const sourceText = inputName.trim();
    const manualEnglish = romanizedName.trim();
    if (!sourceText && !manualEnglish) return;

    setIsSplit(true);
    setShowResult(false);
    setIsTranslating(true);

    const hasHangul = /[\u3131-\u318E\u314F-\u3163\uAC00-\uD7A3]/.test(sourceText);
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    try {
      const translationPromise = (async () => {
        // If user manually edited English, respect it.
        if (manualEnglish && isManualEdit) return manualEnglish;

        // If Korean text exists, translate KO -> EN via serverless function.
        if (sourceText && hasHangul) {
          const response = await fetch('/.netlify/functions/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: sourceText }),
          });

          if (!response.ok) {
            throw new Error(`Translate API error: ${response.status}`);
          }

          const data = (await response.json()) as { translatedText?: string; error?: string };
          const translatedText = data.translatedText?.trim();
          if (!translatedText) {
            throw new Error(data.error || 'Translation failed');
          }
          return translatedText;
        }

        // Otherwise treat the source as already-English (or user-provided).
        return manualEnglish || sourceText;
      })();

      const [englishText] = await Promise.all([translationPromise, sleep(1500)]);

      setRomanizedName(englishText);
      setTranslatedRomanizedName(englishText);
      setIsTranslating(false);
      setShowResult(true);
    } catch (error) {
      setIsTranslating(false);
      setShowResult(true);
      toast.error('번역에 실패했습니다. 잠시 후 다시 시도해 주세요.', {
        className: 'font-sans',
      });
      console.error(error);
    }
  }, [inputName, isManualEdit, isTranslating, romanizedName]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isEditingRomanized) {
      handleTranslate();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full relative ${isSplit ? 'max-w-5xl' : 'max-w-md'}`}
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
            파라오의 언어로 당신을 기억해보세요
          </p>
        </motion.header>

        {/* Main Layout: centered (initial) -> split (after first translate click) */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={isSplit ? 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8' : ''}
        >
          {/* Left: Input Panel */}
          <motion.div
            layout
            ref={cardRef}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            {/* Korean Input (Field 1) */}
            <div className="mb-6">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="번역할 내용을 입력하세요"
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
              disabled={(!inputName.trim() && !romanizedName.trim()) || isTranslating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 gold-button text-lg rounded-2xl disabled:hover:scale-100"
            >
              {isTranslating ? '해독 중...' : '상형문자로 변환하기'}
            </motion.button>
          </motion.div>

          {/* Right: Result Panel (shown after first translate click) */}
          <AnimatePresence>
            {isSplit && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl p-8 md:p-10 md:border-l md:border-border/40"
              >
                {/* Loading State (right side) */}
                <AnimatePresence>
                  {isTranslating ? (
                    <LoadingState />
                  ) : (
                    <div>
                      {/* Result Card (capture target) */}
                      <div
                        id="cartouche-card"
                        className="flex flex-col items-center rounded-2xl p-8 bg-[#F9F7F2]"
                      >
                        <Cartouche romanizedName={translatedRomanizedName} isVisible={showResult} />
                      </div>

                      {/* Action Buttons (below result) */}
                      <AnimatePresence>
                        {showResult && (
                          <div className="mt-8">
                            <ActionButtons
                              romanizedName={translatedRomanizedName}
                              cardRef={cardRef}
                            />

                            {/* Cross-promo banner (below action icons) */}
                            <a
                              href={VIKING_RUNE_CONVERTER_URL}
                              className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-gold-dark/25 bg-card/70 px-4 py-3 text-sm text-soft-black transition-colors hover:bg-card"
                              aria-label="룬 문자 변환기로 이동"
                            >
                              <span className="text-muted-foreground">
                                내 이름을 <span className="text-gold-dark font-semibold">고대 북유럽 룬 문자</span>로도 보고 싶다면?
                              </span>
                              <ChevronRight className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden="true" />
                            </a>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
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
          당신의 기록이 영원히 남겨집니다
        </motion.footer>
    </motion.div>
  );
};

export default HieroglyphTranslator;