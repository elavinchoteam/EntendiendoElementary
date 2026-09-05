import React from 'react';

interface AudioWaveIndicatorProps {
  isPlaying: boolean;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioWaveIndicator: React.FC<AudioWaveIndicatorProps> = ({
  isPlaying,
  colorClass = 'bg-emerald-500',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
  };

  const barClasses = {
    sm: 'w-0.5',
    md: 'w-1',
    lg: 'w-1.5',
  };

  return (
    <div className={`inline-flex items-center gap-0.5 ${heightClasses[size]}`}>
      {[0.4, 0.8, 1, 0.6, 0.9, 0.5].map((scale, i) => (
        <span
          key={i}
          className={`${barClasses[size]} rounded-full ${colorClass} transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : 'h-1.5 opacity-40'
          }`}
          style={{
            height: isPlaying ? `${scale * 100}%` : '20%',
            animationDelay: `${i * 120}ms`,
            animationDuration: '600ms',
          }}
        />
      ))}
    </div>
  );
};
