import React, { useState } from 'react';
import { Volume2, BookOpen, MessageSquare, Check, Sparkles } from 'lucide-react';
import { DialogueLine, GrammarTip } from '../types';
import { speakEnglish } from '../utils/audio';
import { AudioWaveIndicator } from './AudioWaveIndicator';
import { useTheme } from '../context/ThemeContext';

interface DialogueAndGrammarViewProps {
  dialogue: DialogueLine[];
  grammar: GrammarTip;
  accent: 'US' | 'UK';
  speechRate: number;
}

export const DialogueAndGrammarView: React.FC<DialogueAndGrammarViewProps> = ({
  dialogue,
  grammar,
  accent,
  speechRate,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'dialogue' | 'grammar'>('dialogue');
  const [playingLineIndex, setPlayingLineIndex] = useState<number | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);

  const handleSpeakLine = (text: string, index: number) => {
    setPlayingLineIndex(index);
    speakEnglish(
      text,
      speechRate,
      accent,
      () => setPlayingLineIndex(index),
      () => setPlayingLineIndex(null)
    );
  };

  const handlePlayFullDialogue = async () => {
    for (let i = 0; i < dialogue.length; i++) {
      setPlayingLineIndex(i);
      await new Promise<void>((resolve) => {
        speakEnglish(
          dialogue[i].textEn,
          speechRate,
          accent,
          undefined,
          () => resolve()
        );
      });
      // Small pause between speakers
      await new Promise((r) => setTimeout(r, 600));
    }
    setPlayingLineIndex(null);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto flex flex-col ${isDark ? 'text-white' : 'text-slate-900'}`}>
      
      {/* Sub-tabs header */}
      <div className={`flex items-center justify-between border-b pb-3 mb-6 ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'dialogue'
                ? 'bg-indigo-600 border border-indigo-400 text-white shadow-xs'
                : isDark
                ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Diálogo Real ({dialogue.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-indigo-600 border border-indigo-400 text-white shadow-xs'
                : isDark
                ? 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Gramática & Consejos</span>
          </button>
        </div>

        {activeTab === 'dialogue' && (
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={`text-xs font-mono underline cursor-pointer transition-colors ${
              isDark ? 'text-indigo-300 hover:text-white' : 'text-indigo-600 hover:text-indigo-800'
            }`}
          >
            {showTranslations ? 'Ocultar español' : 'Mostrar español'}
          </button>
        )}
      </div>

      {activeTab === 'dialogue' && (
        <div className="space-y-4">
          
          {/* Top Dialogue action */}
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
              Conversación contextual de la vida real
            </span>
            <button
              onClick={handlePlayFullDialogue}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-medium cursor-pointer transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10 text-indigo-300 hover:text-white hover:bg-white/10'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Reproducir diálogo completo</span>
            </button>
          </div>

          {/* Dialogue Lines */}
          <div className="space-y-3">
            {dialogue.map((line, idx) => {
              const isPlaying = playingLineIndex === idx;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={line.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isPlaying
                      ? isDark
                        ? 'border-indigo-400/80 bg-indigo-500/10 shadow-sm'
                        : 'border-indigo-400 bg-indigo-50/70 shadow-sm'
                      : isDark
                      ? isEven
                        ? 'bg-[#111827] border-white/10'
                        : 'bg-white/5 border-white/5'
                      : isEven
                      ? 'bg-white border-slate-200 shadow-2xs'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isEven
                          ? isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                          : isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {line.speaker}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSpeakLine(line.textEn, idx)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isDark ? 'text-white/40 hover:text-indigo-300 hover:bg-white/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                      }`}
                      title="Escuchar esta frase"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="mt-2 text-sm sm:text-base font-medium leading-relaxed">
                    {line.textEn}
                  </p>

                  {showTranslations && (
                    <p className={`mt-1 text-xs italic font-serif ${
                      isDark ? 'text-white/50' : 'text-slate-500'
                    }`}>
                      {line.textEs}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'grammar' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border ${
            isDark ? 'bg-[#111827] border-white/10' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-lg font-bold font-serif italic ${
              isDark ? 'text-indigo-300' : 'text-indigo-900'
            }`}>
              {grammar.title}
            </h3>
            
            <p className={`mt-3 text-sm leading-relaxed whitespace-pre-line ${
              isDark ? 'text-white/80' : 'text-slate-700'
            }`}>
              {grammar.explanation}
            </p>

            {grammar.examples && grammar.examples.length > 0 && (
              <div className={`mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <h4 className={`text-xs font-mono font-bold uppercase tracking-widest mb-3 ${
                  isDark ? 'text-white/40' : 'text-slate-400'
                }`}>
                  Ejemplos Prácticos
                </h4>
                <div className="space-y-2.5">
                  {grammar.examples.map((eg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{eg.en}</div>
                        <div className={`text-xs italic font-serif ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                          {eg.es}
                        </div>
                      </div>
                      <button
                        onClick={() => speakEnglish(eg.en, speechRate, accent)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                          isDark ? 'text-white/40 hover:text-indigo-300 hover:bg-white/10' : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-200'
                        }`}
                        title="Escuchar ejemplo"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
