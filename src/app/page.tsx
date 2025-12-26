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
  const [cities, setCities] = useState<City[]>([
    { x: 0, y: 0, id: 0 },
    { x: 1, y: 1, id: 1 },
    { x: 2, y: 2, id: 2 },
    { x: 3, y: 0, id: 3 },
    { x: 4, y: 1, id: 4 },
  ]);
  const [path, setPath] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addCity = () => {
    const newId = cities.length;
    setCities([...cities, { x: 0, y: 0, id: newId }]);
  };

  const removeCity = (id: number) => {
    const newCities = cities.filter(city => city.id !== id).map((city, index) => ({ ...city, id: index }));
    setCities(newCities);
  };

  const updateCity = (id: number, field: 'x' | 'y', value: string) => {
    const numValue = parseFloat(value) || 0;
    setCities(cities.map(city => city.id === id ? { ...city, [field]: numValue } : city));
  };

  const handleSolve = () => {
    const result = nearestNeighbor(cities);
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
  <div className="min-h-screen bg-[#0B0F1A] p-8 text-gray-100">
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="py-2 text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Travelling Salesman Visual Solver
        </h1>
        <p className="mt-2 text-gray-400">
          Nearest Neighbor heuristic with real-time visualization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Panel */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Cities</h2>

          <div className="space-y-3">
            {cities.map(city => (
              <div
                key={city.id}
                className="flex items-center justify-between bg-white/5 rounded-xl p-3 hover:bg-white/10 transition"
              >
                <span className="text-sm text-gray-300">
                  City {city.id + 1}
                </span>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={city.x}
                    onChange={(e) => updateCity(city.id, 'x', e.target.value)}
                    className="w-20 px-2 py-1 rounded-lg bg-black/40 border border-white/10 focus:ring-2 focus:ring-cyan-400 outline-none"
                    placeholder="X"
                  />
                  <input
                    type="number"
                    value={city.y}
                    onChange={(e) => updateCity(city.id, 'y', e.target.value)}
                    className="w-20 px-2 py-1 rounded-lg bg-black/40 border border-white/10 focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Y"
                  />
                  <button
                    onClick={() => removeCity(city.id)}
                    disabled={cities.length <= 1}
                    className="text-red-400 hover:text-red-500 disabled:opacity-30"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addCity}
            className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:opacity-90 transition"
          >
            + Add City
          </button>

          <button
            onClick={handleSolve}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-black font-bold text-lg shadow-lg hover:scale-[1.02] transition"
          >
            Solve Route
          </button>

          {path.length > 0 && (
            <div className="mt-6 bg-black/30 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Solution</h3>
              <p className="text-sm text-gray-300 mb-1">
                Distance: <span className="text-cyan-400 font-bold">{totalDistance.toFixed(2)}</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {path.map((id, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                  >
                    {cities[id].id + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Route Visualization</h2>
          <canvas
            ref={canvasRef}
            width={420}
            height={420}
            className="rounded-xl border border-white/10 bg-[#020617]"
          />
          <p className="mt-3 text-sm text-gray-400">
            Cities and optimized traversal path
          </p>
        </div>

      </div>
    </div>
  </div>
);
};
