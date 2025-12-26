'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';

type City = { x: number; y: number; id: number };

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

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

function calculateDistance(tour: number[], cities: City[]): number {
  let dist = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    dist += distance(cities[tour[i]], cities[tour[i+1]]);
  }
  dist += distance(cities[tour[tour.length-1]], cities[tour[0]]);
  return dist;
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

function twoOpt(cities: City[]): { path: number[]; distance: number } {
  // Start with nearest neighbor
  let currentTour = nearestNeighbor(cities).path.slice(0, -1); // remove the closing 0
  let currentDistance = calculateDistance(currentTour, cities);

  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < currentTour.length - 1; i++) {
      for (let j = i + 1; j < currentTour.length; j++) {
        const newTour = twoOptSwap(currentTour, i, j);
        const newDistance = calculateDistance(newTour, cities);
        if (newDistance < currentDistance) {
          currentTour = newTour;
          currentDistance = newDistance;
          improved = true;
        }
      }
    }
  }

  currentTour.push(0); // close the tour
  return { path: currentTour, distance: currentDistance };
}

function twoOptSwap(tour: number[], i: number, j: number): number[] {
  const newTour = [...tour];
  // reverse from i to j
  let left = i;
  let right = j;
  while (left < right) {
    [newTour[left], newTour[right]] = [newTour[right], newTour[left]];
    left++;
    right--;
  }
  return newTour;
}

function simulatedAnnealing(cities: City[]): { path: number[]; distance: number } {
  // Start with nearest neighbor
  let currentTour = nearestNeighbor(cities).path.slice(0, -1);
  let currentDistance = calculateDistance(currentTour, cities);
  let bestTour = [...currentTour];
  let bestDistance = currentDistance;

  let temperature = 1000;
  const coolingRate = 0.995;
  const minTemperature = 0.1;

  while (temperature > minTemperature) {
    // Generate neighbor by swapping two cities
    const i = Math.floor(Math.random() * currentTour.length);
    const j = Math.floor(Math.random() * currentTour.length);
    const newTour = [...currentTour];
    [newTour[i], newTour[j]] = [newTour[j], newTour[i]];
    const newDistance = calculateDistance(newTour, cities);

    if (newDistance < currentDistance || Math.random() < Math.exp((currentDistance - newDistance) / temperature)) {
      currentTour = newTour;
      currentDistance = newDistance;
      if (newDistance < bestDistance) {
        bestTour = [...newTour];
        bestDistance = newDistance;
      }
    }
    temperature *= coolingRate;
  }

  bestTour.push(0);
  return { path: bestTour, distance: bestDistance };
}

function greedyHeuristic(cities: City[]): { path: number[]; distance: number } {
  // For now, using nearest neighbor as greedy heuristic
  // Could be modified to use a different greedy approach
  return nearestNeighbor(cities);
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
  const [method, setMethod] = useState<string>('nearestNeighbor');
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
    let result: { path: number[]; distance: number };
    switch (method) {
      case 'nearestNeighbor':
        result = nearestNeighbor(cities);
        break;
      case 'twoOpt':
        result = twoOpt(cities);
        break;
      case 'simulatedAnnealing':
        result = simulatedAnnealing(cities);
        break;
      case 'greedyHeuristic':
        result = greedyHeuristic(cities);
        break;
      default:
        result = nearestNeighbor(cities);
    }
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
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#2563eb'; // Blue-600
      ctx.fill();
      ctx.strokeStyle = '#1e40af'; // Blue-700
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((city.id + 1).toString(), x, y + 4);
    });

    // Draw path
    if (path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#dc2626'; // Red-600
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
      ctx.strokeStyle = '#dc2626';
      ctx.fillStyle = '#dc2626';
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
  }, [cities, path]);

return (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Traveling Salesman Problem Solver
        </h1>
        <p className="text-lg text-gray-600">
          Interactive visualization with multiple heuristic algorithms
        </p>
        <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Panel - Controls */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Problem Configuration</h2>

          {/* Cities Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Cities</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cities.map(city => (
                <div
                  key={city.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-700">
                    City {city.id + 1}
                  </span>

                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={city.x}
                        onChange={(e) => updateCity(city.id, 'x', e.target.value)}
                        className="w-16 px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        placeholder="X"
                      />
                      <input
                        type="number"
                        value={city.y}
                        onChange={(e) => updateCity(city.id, 'y', e.target.value)}
                        className="w-16 px-2 py-1 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        placeholder="Y"
                      />
                    </div>
                    <button
                      onClick={() => removeCity(city.id)}
                      disabled={cities.length <= 1}
                      className="text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCity}
              className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              + Add City
            </button>
          </div>

          {/* Algorithm Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-800 mb-3">Algorithm</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
            >
              <option value="nearestNeighbor">Nearest Neighbor</option>
              <option value="twoOpt">2-Opt Local Search</option>
              <option value="simulatedAnnealing">Simulated Annealing</option>
              <option value="greedyHeuristic">Greedy Heuristic</option>
            </select>
          </div>

          {/* Solve Button */}
          <button
            onClick={handleSolve}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md"
          >
            Solve TSP
          </button>

          {/* Results */}
          {path.length > 0 && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Solution Results</h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Total Distance:</span>
                  <span className="ml-2 text-blue-600 font-bold">{totalDistance.toFixed(2)}</span>
                </p>
                <div>
                  <p className="font-medium text-gray-700 mb-2">Optimal Route:</p>
                  <div className="flex flex-wrap gap-2">
                    {path.map((id, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-800 border border-blue-200"
                      >
                        {cities[id].id + 1}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Visualization */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Route Visualization</h2>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              className="rounded border border-gray-300 bg-white"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Interactive visualization of cities and the computed optimal route
          </p>

          {/* Algorithm Info */}
          <div className="mt-6 w-full bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Algorithm Information</h3>
            <div className="text-sm text-gray-600">
              {method === 'nearestNeighbor' && (
                <p>Nearest Neighbor: Starts at a city and repeatedly visits the nearest unvisited city.</p>
              )}
              {method === 'twoOpt' && (
                <p>2-Opt: Improves an initial solution by swapping edges to reduce tour length.</p>
              )}
              {method === 'simulatedAnnealing' && (
                <p>Simulated Annealing: Probabilistic technique that accepts worse solutions early to escape local optima.</p>
              )}
              {method === 'greedyHeuristic' && (
                <p>Greedy Heuristic: Makes locally optimal choices at each step to find a solution.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
};
