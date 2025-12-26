'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';

type City = { x: number; y: number; id: number };

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

function distance(c1: City, c2: City): number {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

export default function Canvas({ canvasRef }: CanvasProps) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg p-4 border transition-colors ${
      theme === 'dark'
        ? 'bg-gray-700 border-gray-600'
        : 'bg-gray-50 border-gray-200'
    }`}>
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className={`rounded border ${
          theme === 'dark'
            ? 'border-gray-600'
            : 'border-gray-300'
        }`}
      />
    </div>
  );
}