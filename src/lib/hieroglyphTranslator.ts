// Hieroglyph mapping for Latin alphabet to Egyptian-style symbols
// Using Unicode Egyptian Hieroglyphs (U+13000 - U+1342F)

const hieroglyphMap: Record<string, string> = {
  a: '𓀀',
  b: '𓃀',
  c: '𓎡',
  d: '𓂧',
  e: '𓇋',
  f: '𓆑',
  g: '𓎼',
  h: '𓉔',
  i: '𓇋',
  j: '𓆓',
  k: '𓎡',
  l: '𓃭',
  m: '𓅓',
  n: '𓈖',
  o: '𓍯',
  p: '𓊪',
  q: '𓏘',
  r: '𓂋',
  s: '𓋴',
  t: '𓏏',
  u: '𓅱',
  v: '𓆑',
  w: '𓅱',
  x: '𓎝',
  y: '𓇋',
  z: '𓊃',
  // Korean consonants (초성)
  ㄱ: '𓎡',
  ㄴ: '𓈖',
  ㄷ: '𓂧',
  ㄹ: '𓃭',
  ㅁ: '𓅓',
  ㅂ: '𓃀',
  ㅅ: '𓋴',
  ㅇ: '𓍯',
  ㅈ: '𓆓',
  ㅊ: '𓎡',
  ㅋ: '𓎡',
  ㅌ: '𓏏',
  ㅍ: '𓊪',
  ㅎ: '𓉔',
  // Korean vowels (중성)
  ㅏ: '𓀀',
  ㅓ: '𓇋',
  ㅗ: '𓍯',
  ㅜ: '𓅱',
  ㅡ: '𓏤',
  ㅣ: '𓇋',
  ㅐ: '𓀀𓇋',
  ㅔ: '𓇋𓇋',
  ㅑ: '𓇋𓀀',
  ㅕ: '𓇋𓇋',
  ㅛ: '𓇋𓍯',
  ㅠ: '𓇋𓅱',
};

// Korean syllable decomposition
const KOREAN_START = 0xAC00;
const KOREAN_END = 0xD7A3;
const CHOSEONG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSEONG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSEONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function decomposeKorean(char: string): string[] {
  const code = char.charCodeAt(0);
  
  if (code >= KOREAN_START && code <= KOREAN_END) {
    const syllableIndex = code - KOREAN_START;
    const choseongIndex = Math.floor(syllableIndex / 588);
    const jungseongIndex = Math.floor((syllableIndex % 588) / 28);
    const jongseongIndex = syllableIndex % 28;
    
    const result = [CHOSEONG[choseongIndex], JUNGSEONG[jungseongIndex]];
    if (JONGSEONG[jongseongIndex]) {
      result.push(JONGSEONG[jongseongIndex]);
    }
    return result;
  }
  
  return [char];
}

export function translateToHieroglyphs(text: string): string {
  let result = '';
  
  for (const char of text) {
    const decomposed = decomposeKorean(char);
    
    for (const component of decomposed) {
      const lowerComponent = component.toLowerCase();
      if (hieroglyphMap[lowerComponent]) {
        result += hieroglyphMap[lowerComponent];
      } else if (component === ' ') {
        result += ' ';
      } else if (hieroglyphMap[component]) {
        result += hieroglyphMap[component];
      } else {
        // For unknown characters, use a default symbol
        result += '𓏺';
      }
    }
  }
  
  return result;
}

export function getOriginalText(text: string): string {
  return text.trim();
}
