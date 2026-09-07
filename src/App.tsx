/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/unitsData';
import { Unit, UserStats, UnitProgress } from './types';
import { Header } from './components/Header';
import { UnitCard } from './components/UnitCard';
import { UnitModal } from './components/UnitModal';
import { loadVoices } from './utils/audio';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Volume2 } from 'lucide-react';

const STORAGE_KEY = 'english_at_work_progress_v2';

const INITIAL_STATS: UserStats = {
  totalStudySeconds: 400,
  activeUnitId: 1, // Unit 1 active with Lesson 1: Phone Sales
  unlockedUnits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Accessible
  progress: {
    1: {
      unitId: 1,
      completed: false,
      score: 0,
      exercisesFinished: 0,
      totalExercises: UNITS_DATA[0]?.exercises?.length || 4,
      masteredCards: [],
    },
  },
};

function MainApp() {
  const { isDark } = useTheme();

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse stats from localStorage', e);
    }
    return INITIAL_STATS;
  });

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [accent, setAccent] = useState<'US' | 'UK'>('US');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isAllUnlocked] = useState(true);

  // Initialize browser voices early
  useEffect(() => {
    loadVoices();
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [stats]);

  const activeUnit = UNITS_DATA.find((u) => u.id === stats.activeUnitId) || UNITS_DATA[0];

  const handleOpenUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setStats((prev) => ({
      ...prev,
      activeUnitId: unit.id,
    }));
  };

  const handleCompleteUnit = (unitId: number, score: number) => {
    const unit = UNITS_DATA.find((u) => u.id === unitId);
    if (!unit) return;

    setStats((prev) => {
      const existing = prev.progress[unitId] || {
        unitId,
        completed: true,
        score,
        exercisesFinished: unit.exercises.length,
        totalExercises: unit.exercises.length,
        masteredCards: [],
      };

      const nextUnlocked = Array.from(new Set([...prev.unlockedUnits, unitId + 1]));

      return {
        ...prev,
        unlockedUnits: nextUnlocked,
        progress: {
          ...prev.progress,
          [unitId]: {
            ...existing,
            completed: true,
            score: Math.max(existing.score || 0, score),
            exercisesFinished: unit.exercises.length,
            totalExercises: unit.exercises.length,
          },
        },
      };
    });
  };

  const handleToggleMasteredCard = (cardId: string) => {
    if (!selectedUnit) return;
    const unitId = selectedUnit.id;

    setStats((prev) => {
      const unitProg = prev.progress[unitId] || {
        unitId,
        completed: false,
        score: 0,
        exercisesFinished: 0,
        totalExercises: selectedUnit.exercises.length,
        masteredCards: [],
      };

      const currentMastered = unitProg.masteredCards || [];
      const isAlreadyMastered = currentMastered.includes(cardId);
      const updatedMastered = isAlreadyMastered
        ? currentMastered.filter((id) => id !== cardId)
        : [...currentMastered, cardId];

      return {
        ...prev,
        progress: {
          ...prev.progress,
          [unitId]: {
            ...unitProg,
            masteredCards: updatedMastered,
          },
        },
      };
    });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-200 ${
      isDark
        ? 'bg-[#0F172A] text-white selection:bg-indigo-500 selection:text-white'
        : 'bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white'
    }`}>
      
      {/* Top Editorial Navbar with Brand, Theme switch and Audio Settings */}
      <Header
        activeUnit={activeUnit}
        onContinue={() => handleOpenUnit(activeUnit)}
        accent={accent}
        onToggleAccent={() => setAccent(accent === 'US' ? 'UK' : 'US')}
        speechRate={speechRate}
        onChangeSpeechRate={setSpeechRate}
      />

      {/* Main Container with Units Grid */}
      <main className="flex-1 w-full max-w-[92vw] sm:max-w-[90vw] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        {/* Section Header */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-xs font-bold uppercase tracking-[0.25em] font-mono ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Programa del Curso · 12 Unidades
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                Unidad 1 Activa
              </span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Explora las unidades con texto principal, audio, tarjetas interactivas y ejercicios paso a paso.
            </p>
          </div>
        </div>

        {/* 12 Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {UNITS_DATA.map((unit) => {
            const unitProgress = stats.progress[unit.id];
            const isUnlocked = isAllUnlocked || stats.unlockedUnits.includes(unit.id);
            const isActive = stats.activeUnitId === unit.id;

            return (
              <UnitCard
                key={unit.id}
                unit={unit}
                progress={unitProgress}
                isActive={isActive}
                isUnlocked={isUnlocked}
                onSelect={handleOpenUnit}
              />
            );
          })}
        </div>

        {/* Bottom Educational Quality Banner */}
        <div className={`mt-10 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
          isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
            }`}>
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold">
                Didáctica con Audio Nativo Integrado y Tarjetas Reversibles
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Unidad 1 cargada con Lesson 1: "Phone Sales", audio pronunciado, ejercicio de emparejamiento y tarjetas reversibles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleOpenUnit(activeUnit)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer active:scale-95 transition-all font-mono uppercase tracking-wider"
            >
              Abrir Unidad {activeUnit.number}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full border-t py-6 text-center text-xs font-mono transition-colors ${
        isDark ? 'bg-[#0F172A] border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
      }`}>
        <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          English at Work · Plataforma de Aprendizaje Interactivo
        </p>
        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          12 Unidades Didácticas · Pronunciación con Síntesis de Voz · Tarjetas Reversibles · Ejercicios Prácticos
        </p>
      </footer>

      {/* Selected Unit Modal */}
      {selectedUnit && (
        <UnitModal
          unit={selectedUnit}
          progress={stats.progress[selectedUnit.id]}
          onClose={() => setSelectedUnit(null)}
          onCompleteUnit={handleCompleteUnit}
          onToggleMasteredCard={handleToggleMasteredCard}
          masteredCardIds={stats.progress[selectedUnit.id]?.masteredCards || []}
          accent={accent}
          speechRate={speechRate}
          hasNextUnit={selectedUnit.id < UNITS_DATA.length}
          hasPrevUnit={selectedUnit.id > 1}
          onSelectNextUnit={() => {
            const next = UNITS_DATA.find((u) => u.id === selectedUnit.id + 1);
            if (next) setSelectedUnit(next);
          }}
          onSelectPrevUnit={() => {
            const prev = UNITS_DATA.find((u) => u.id === selectedUnit.id - 1);
            if (prev) setSelectedUnit(prev);
          }}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
