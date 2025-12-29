// Korean to English Romanization (Revised Romanization of Korean)

const CHOSEONG = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
const JUNGSEONG = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
const JONGSEONG = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'p', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];

const KOREAN_START = 0xAC00;
const KOREAN_END = 0xD7A3;

export function romanizeKorean(text: string): string {
  let result = '';
  
  for (const char of text) {
    const code = char.charCodeAt(0);
    
    if (code >= KOREAN_START && code <= KOREAN_END) {
      const syllableIndex = code - KOREAN_START;
      const choseongIndex = Math.floor(syllableIndex / 588);
      const jungseongIndex = Math.floor((syllableIndex % 588) / 28);
      const jongseongIndex = syllableIndex % 28;
      
      result += CHOSEONG[choseongIndex];
      result += JUNGSEONG[jungseongIndex];
      result += JONGSEONG[jongseongIndex];
    } else if (char === ' ') {
      result += ' ';
    } else if (/[a-zA-Z]/.test(char)) {
      result += char.toLowerCase();
    }
  }
  
  // Capitalize first letter of each word
  return result
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Extract only alphabetic characters for hieroglyph mapping
export function extractLetters(text: string): string[] {
  return text.toUpperCase().replace(/[^A-Z]/g, '').split('');
}