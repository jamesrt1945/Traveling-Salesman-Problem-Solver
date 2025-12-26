'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';

type City = { x: number; y: number; id: number };

interface CanvasProps {
  cities: City[];
  path: number[];
}

function distance(c1: City, c2: City): number {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

export default function Canvas({ cities, path }: CanvasProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with theme-appropriate background
    ctx.fillStyle = theme === 'dark' ? '#1f2937' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (cities.length === 0) return;

    // Normalize coordinates
    const xs = cities.map(c => c.x);
    const ys = cities.map(c => c.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const scale = Math.min(300 / rangeX, 300 / rangeY);
    const offsetX = 50;
    const offsetY = 50;

    // Draw cities
    cities.forEach(city => {
      const x = (city.x - minX) * scale + offsetX;
      const y = (city.y - minY) * scale + offsetY;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = theme === 'dark' ? '#3b82f6' : '#2563eb'; // Blue colors
      ctx.fill();
      ctx.strokeStyle = theme === 'dark' ? '#1d4ed8' : '#1e40af';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((city.id + 1).toString(), x, y + 4);
    });

    // Draw path
    if (path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = theme === 'dark' ? '#ef4444' : '#dc2626'; // Red colors
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const start = cities[path[0]];
      const startX = (start.x - minX) * scale + offsetX;
      const startY = (start.y - minY) * scale + offsetY;
      ctx.moveTo(startX, startY);
      for (let i = 1; i < path.length; i++) {
        const city = cities[path[i]];
        const x = (city.x - minX) * scale + offsetX;
        const y = (city.y - minY) * scale + offsetY;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw arrows on path
      ctx.strokeStyle = theme === 'dark' ? '#ef4444' : '#dc2626';
      ctx.fillStyle = theme === 'dark' ? '#ef4444' : '#dc2626';
      for (let i = 0; i < path.length - 1; i++) {
        const from = cities[path[i]];
        const to = cities[path[i + 1]];
        const fromX = (from.x - minX) * scale + offsetX;
        const fromY = (from.y - minY) * scale + offsetY;
        const toX = (to.x - minX) * scale + offsetX;
        const toY = (to.y - minY) * scale + offsetY;

        // Calculate arrow position (80% along the line)
        const arrowX = fromX + (toX - fromX) * 0.8;
        const arrowY = fromY + (toY - fromY) * 0.8;

        // Calculate arrow direction
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);

        // Draw arrowhead
        ctx.save();
        ctx.translate(arrowX, arrowY);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-8, -4);
        ctx.lineTo(0, 0);
        ctx.lineTo(-8, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  }, [cities, path, theme]);

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