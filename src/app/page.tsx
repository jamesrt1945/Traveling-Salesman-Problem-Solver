'use client';

import { useState, useRef, useEffect } from 'react';

type City = { x: number; y: number; id: number };

function parseCities(input: string): City[] {
  return input.trim().split('\n').filter(line => line.trim()).map((line, i) => {
    const parts = line.split(',').map(s => s.trim());
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    return { x: isNaN(x) ? 0 : x, y: isNaN(y) ? 0 : y, id: i };
  });
}

function distance(c1: City, c2: City): number {
  return Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
}

function nearestNeighbor(cities: City[]): { path: number[]; distance: number } {
  if (cities.length === 0) return { path: [], distance: 0 };
  if (cities.length === 1) return { path: [0], distance: 0 };

  const visited = new Set<number>();
  const path: number[] = [0];
  visited.add(0);
  let current = 0;
  let totalDistance = 0;

  for (let i = 1; i < cities.length; i++) {
    let minDist = Infinity;
    let next = -1;
    for (let j = 0; j < cities.length; j++) {
      if (!visited.has(j)) {
        const dist = distance(cities[current], cities[j]);
        if (dist < minDist) {
          minDist = dist;
          next = j;
        }
      }
    }
    if (next === -1) break;
    path.push(next);
    visited.add(next);
    totalDistance += minDist;
    current = next;
  }

  // return to start
  const distBack = distance(cities[current], cities[0]);
  totalDistance += distBack;
  path.push(0);

  return { path, distance: totalDistance };
}

export default function Home() {
  const [input, setInput] = useState('0,0\n1,1\n2,2\n3,0\n4,1');
  const [cities, setCities] = useState<City[]>([]);
  const [path, setPath] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSolve = () => {
    const parsedCities = parseCities(input);
    setCities(parsedCities);
    const result = nearestNeighbor(parsedCities);
    setPath(result.path);
    setTotalDistance(result.distance);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      ctx.fillText(city.id.toString(), x + 8, y - 8);
    });

    // Draw path
    if (path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
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
    }
  }, [cities, path]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Travelling Salesman Problem Solver</h1>
        <p className="mb-4">Enter city coordinates (x,y) one per line:</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
          placeholder="0,0
1,1
2,2"
        />
        <button
          onClick={handleSolve}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Solve with Nearest Neighbor
        </button>
        {path.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Solution</h2>
            <p>Path: {path.map(id => cities[id].id).join(' -> ')}</p>
            <p>Total Distance: {totalDistance.toFixed(2)}</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-300"
        />
      </div>
    </div>
  );
}