// Audio utilities using Web Speech API & Web Audio API synthesis

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playFeedbackSound(type: 'correct' | 'wrong' | 'complete' | 'flip' | 'click') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'correct') {
      // Pleasant two-tone chime (Major 3rd / 5th)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.15); // G5

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now + 0.1);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } else if (type === 'wrong') {
      // Soft low buzz/thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(164.81, now + 0.1); // E3

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'complete') {
      // Triumph fanfare chord
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + 0.85);
      });
    } else if (type === 'flip') {
      // Subtle swoosh card flip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch (e) {
    console.warn('Audio feedback failed:', e);
  }
}

// Pronunciation via Web Speech API
let cachedVoices: SpeechSynthesisVoice[] = [];
let currentlySpeakingText: string | null = null;
let isSpeechActive: boolean = false;

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  return isSpeechActive || window.speechSynthesis.speaking;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeechActive = false;
  currentlySpeakingText = null;
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    synth.onvoiceschanged = () => {
      cachedVoices = synth.getVoices();
      resolve(cachedVoices);
    };

    setTimeout(() => {
      cachedVoices = synth.getVoices();
      resolve(cachedVoices);
    }, 500);
  });
}

export function speakEnglish(
  text: string,
  rate: number = 1.0,
  accent: 'US' | 'UK' = 'US',
  onStart?: () => void,
  onEnd?: () => void,
  voiceGender: 'male' | 'female' = 'male'
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  const synth = window.speechSynthesis;
  const cleanText = text.trim();

  // If already speaking this text or speech is active, pressing the listen button again stops playback!
  if ((isSpeechActive || synth.speaking) && currentlySpeakingText === cleanText) {
    stopSpeaking();
    if (onEnd) onEnd();
    return false;
  }

  // Cancel any ongoing speech and start the new one
  stopSpeaking();
  isSpeechActive = true;
  currentlySpeakingText = cleanText;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
  utterance.rate = Math.max(0.6, Math.min(1.5, rate));
  // A masculine, natural pitch
  utterance.pitch = voiceGender === 'male' ? 0.92 : 1.0;

  // Try to pick a natural sounding English voice matching gender preference
  if (cachedVoices.length === 0) {
    cachedVoices = synth.getVoices();
  }

  const langCode = accent === 'UK' ? 'en-GB' : 'en-US';
  const matchingLangVoices = cachedVoices.filter((v) =>
    v.lang.replace('_', '-').toLowerCase().startsWith(langCode.toLowerCase())
  );

  let preferredVoice: SpeechSynthesisVoice | undefined;

  if (voiceGender === 'male') {
    // Specifically search for known male voices in English
    preferredVoice = matchingLangVoices.find((v) =>
      /david|mark|daniel|george|alex|oliver|guy|james|male|matthew|brian/i.test(v.name)
    ) || cachedVoices.find((v) =>
      /david|mark|daniel|george|alex|oliver|guy|james|male|matthew|brian/i.test(v.name) && v.lang.startsWith('en')
    );
  }

  // Fallback to high-quality natural voices if no explicit male voice matched
  if (!preferredVoice) {
    preferredVoice = matchingLangVoices.find(
      (v) =>
        v.name.includes('Google') ||
        v.name.includes('Natural') ||
        v.name.includes('Daniel') ||
        v.name.includes('David')
    ) || matchingLangVoices[0] || cachedVoices.find((v) => v.lang.startsWith('en'));
  }

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    isSpeechActive = true;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (currentlySpeakingText === cleanText) {
      currentlySpeakingText = null;
      isSpeechActive = false;
    }
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech synthesis error:', e);
    if (currentlySpeakingText === cleanText) {
      currentlySpeakingText = null;
      isSpeechActive = false;
    }
    if (onEnd) onEnd();
  };

  synth.speak(utterance);
  return true;
}
