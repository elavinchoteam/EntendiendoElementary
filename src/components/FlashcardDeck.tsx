import React, { useState, useEffect } from 'react';
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Shuffle,
  Eye,
  Grid,
  CreditCard,
  HelpCircle,
} from 'lucide-react';
import { Flashcard } from '../types';
import { speakEnglish, playFeedbackSound } from '../utils/audio';
import { AudioWaveIndicator } from './AudioWaveIndicator';
import { useTheme } from '../context/ThemeContext';

interface FlashcardDeckProps {
  cards: Flashcard[];
  unitNumber: number;
  unitTitle: string;
  masteredIds: string[];
  onToggleMastered: (cardId: string) => void;
  accent: 'US' | 'UK';
  speechRate: number;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  cards,
  unitNumber,
  unitTitle,
  masteredIds,
  onToggleMastered,
  accent,
  speechRate,
}) => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(speechRate);
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');
  const [autoSpeakOnFlip, setAutoSpeakOnFlip] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];
  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  // Reset flip when changing card
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  const handleFlip = () => {
    playFeedbackSound('flip');
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    if (autoSpeakOnFlip && !nextFlipped && currentCard) {
      handleSpeak(currentCard.word);
    }
  };

  const handleSpeak = (text: string, customRate?: number) => {
    setIsSpeaking(true);
    speakEnglish(
      text,
      customRate ?? rate,
      accent,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      playFeedbackSound('click');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playFeedbackSound('click');
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'card') return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, viewMode]);

  if (!cards || cards.length === 0) {
    return (
      <div className={`p-8 rounded-2xl border text-center font-mono ${
        isDark ? 'bg-white/5 border-white/10 text-white/50' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        No hay tarjetas disponibles para esta unidad aún.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Top Deck Info Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-indigo-400' : 'text-indigo-600'
          }`}>
            Tarjeta {currentIndex + 1} de {cards.length}
          </span>
          <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
            ({masteredIds.filter((id) => cards.some((c) => c.id === id)).length} dominadas)
          </span>
        </div>

        {/* View mode toggle & audio speed */}
        <div className="flex items-center gap-2">
          <div className={`inline-flex rounded-lg border p-0.5 text-xs font-mono ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setRate(1.0)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                rate === 1.0
                  ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                  : isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => setRate(0.75)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                rate === 0.75
                  ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                  : isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              0.75x
            </button>
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'card' ? 'grid' : 'card')}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer font-mono transition-colors ${
              isDark
                ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={viewMode === 'card' ? 'Ver todas en cuadrícula' : 'Modo tarjetas'}
          >
            {viewMode === 'card' ? (
              <>
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mosaico</span>
              </>
            ) : (
              <>
                <CreditCard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Individual</span>
              </>
            )}
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Grid View of all flashcards in the unit */
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto p-1">
          {cards.map((card) => {
            const isMastered = masteredIds.includes(card.id);
            return (
              <div
                key={card.id}
                className={`p-4 rounded-xl border transition-all text-left relative ${
                  isMastered
                    ? isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-emerald-50 border-emerald-300'
                    : isDark
                    ? 'bg-[#111827] border-white/10 hover:border-white/20'
                    : 'bg-white border-slate-200 hover:border-indigo-400 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {card.word}
                      </span>
                      <button
                        onClick={() => handleSpeak(card.word)}
                        className={`p-1 rounded-lg cursor-pointer transition-colors ${
                          isDark ? 'text-indigo-400 hover:bg-white/10' : 'text-indigo-600 hover:bg-indigo-50'
                        }`}
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                      {card.phonetic}
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleMastered(card.id)}
                    className={`cursor-pointer ${
                      isDark ? 'text-white/30 hover:text-emerald-400' : 'text-slate-400 hover:text-emerald-600'
                    }`}
                    title={isMastered ? 'Marcada como aprendida' : 'Marcar como aprendida'}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        isMastered ? 'text-emerald-500 fill-emerald-500/20' : ''
                      }`}
                    />
                  </button>
                </div>

                <div className={`mt-2.5 pt-2.5 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <p className={`text-sm font-semibold font-serif italic ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    {card.translation}
                  </p>
                  <p className={`text-xs mt-1 italic ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                    "{card.exampleEn}"
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                    {card.exampleEs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 3D Reversible Interactive Flashcard */
        <div className="w-full flex flex-col items-center">
          
          <div className="w-full perspective-1000 min-h-[350px] sm:min-h-[380px]">
            <div
              id={`flashcard-${currentCard.id}`}
              onClick={handleFlip}
              className={`relative w-full h-[350px] sm:h-[380px] rounded-2xl cursor-pointer shadow-2xl transition-transform duration-500 transform-style-3d select-none ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* FRONT FACE (English + Phonetics + Audio) */}
              <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border backface-hidden shadow-xl backdrop-blur-xs transition-colors ${
                isDark
                  ? 'bg-slate-900 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-md'
              }`}>
                
                {/* Header row */}
                <div className="flex items-center justify-between w-full">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold uppercase tracking-wider ${
                    isDark
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                  }`}>
                    {currentCard.partOfSpeech}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMastered(currentCard.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark ? 'hover:bg-white/10 text-white/40 hover:text-emerald-400' : 'hover:bg-slate-200 text-slate-400 hover:text-emerald-600'
                      }`}
                      title={isCurrentMastered ? 'Desmarcar' : 'Marcar como dominada'}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          isCurrentMastered ? 'text-emerald-500 fill-emerald-500/20' : ''
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-mono ml-1 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                      {unitTitle}
                    </span>
                  </div>
                </div>

                {/* Word & Phonetics & Audio Main Action */}
                <div className="flex flex-col items-center text-center my-auto">
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {currentCard.word}
                  </h3>

                  {/* Phonetic transcription badge */}
                  <div className={`mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-sm sm:text-base ${
                    isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <span>{currentCard.phonetic}</span>
                  </div>

                  {/* Prominent Audio Pronunciation Button */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      id="card-speak-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.word);
                      }}
                      className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer font-sans ${
                        isDark
                          ? 'bg-white text-black hover:bg-indigo-50'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/30'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>Hear Pronunciation ({accent})</span>
                      <AudioWaveIndicator isPlaying={isSpeaking} colorClass={isDark ? 'bg-indigo-600' : 'bg-white'} size="sm" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.word, 0.7);
                      }}
                      className={`px-3.5 py-3 rounded-xl border text-xs font-mono font-medium cursor-pointer transition-colors ${
                        isDark
                          ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Pronunciación lenta para escuchar cada fonema"
                    >
                      🐢 Slow
                    </button>
                  </div>
                </div>

                {/* Example sentence with quick audio */}
                <div className={`w-full pt-3 border-t flex items-center justify-between ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div className="flex-1 text-left mr-2">
                    <p className={`text-xs sm:text-sm italic font-serif line-clamp-1 ${
                      isDark ? 'text-white/70' : 'text-slate-600'
                    }`}>
                      "{currentCard.exampleEn}"
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(currentCard.exampleEn);
                    }}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isDark ? 'text-white/40 hover:text-indigo-300 hover:bg-white/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                    }`}
                    title="Escuchar oración de ejemplo"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Flip indicator hint */}
                <div className="mt-1 text-center">
                  <span className={`text-[11px] inline-flex items-center gap-1 font-mono uppercase tracking-wider ${
                    isDark ? 'text-white/30' : 'text-slate-400'
                  }`}>
                    <RotateCw className="w-3 h-3" /> Toca para voltear y ver la traducción
                  </span>
                </div>

              </div>

              {/* BACK FACE (Spanish translation + explanation + tip) */}
              <div className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 backface-hidden rotate-y-180 shadow-xl transition-colors ${
                isDark
                  ? 'bg-slate-900 border-indigo-500/40 text-white'
                  : 'bg-white border-indigo-400 text-slate-900 shadow-md'
              }`}>
                
                {/* Header row */}
                <div className="flex items-center justify-between w-full">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    Español
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(currentCard.word);
                    }}
                    className={`flex items-center gap-1 text-xs font-mono font-semibold px-3 py-1 rounded-lg border cursor-pointer transition-colors ${
                      isDark
                        ? 'text-indigo-300 hover:text-white bg-white/5 border-white/10'
                        : 'text-indigo-700 hover:text-indigo-900 bg-indigo-50 border-indigo-200'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Repetir en inglés</span>
                  </button>
                </div>

                {/* Translation & Details */}
                <div className="flex flex-col items-center text-center my-auto">
                  <span className={`text-xs font-mono uppercase tracking-widest ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}>
                    Traducción
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 font-serif italic">
                    {currentCard.translation}
                  </h3>

                  {/* Tip / Explanation in Spanish */}
                  {currentCard.tip && (
                    <div className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm text-left flex items-start gap-2 max-w-lg ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white/80'
                        : 'bg-indigo-50/70 border-indigo-100 text-slate-700'
                    }`}>
                      <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <span className={`font-bold ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                          Consejo de uso:{' '}
                        </span>
                        <span>{currentCard.tip}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Spanish Example */}
                <div className={`w-full pt-3 border-t text-left ${
                  isDark ? 'border-white/10' : 'border-slate-200'
                }`}>
                  <div className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${
                    isDark ? 'text-white/40' : 'text-slate-400'
                  }`}>
                    Ejemplo traducido:
                  </div>
                  <p className={`text-xs sm:text-sm italic font-serif ${
                    isDark ? 'text-white/80' : 'text-slate-700'
                  }`}>
                    "{currentCard.exampleEs}"
                  </p>
                </div>

                {/* Flip indicator hint */}
                <div className="mt-1 text-center">
                  <span className={`text-[11px] inline-flex items-center gap-1 font-mono uppercase tracking-wider ${
                    isDark ? 'text-white/30' : 'text-slate-400'
                  }`}>
                    <RotateCw className="w-3 h-3" /> Toca para volver al frente en inglés
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Card Deck Navigation Controls */}
          <div className="mt-6 flex items-center justify-between w-full max-w-md">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                currentIndex === 0
                  ? isDark
                    ? 'opacity-30 border-white/5 text-white/30 cursor-not-allowed'
                    : 'opacity-40 border-slate-200 text-slate-300 cursor-not-allowed'
                  : isDark
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Flip toggle button */}
            <button
              onClick={handleFlip}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                isDark
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400 shadow-indigo-600/30'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Voltear Tarjeta</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                currentIndex === cards.length - 1
                  ? isDark
                    ? 'opacity-30 border-white/5 text-white/30 cursor-not-allowed'
                    : 'opacity-40 border-slate-200 text-slate-300 cursor-not-allowed'
                  : isDark
                  ? 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shadow-xs'
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
