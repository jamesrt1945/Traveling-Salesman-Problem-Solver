'use client';

import { useState } from 'react';
import { ThemeProvider } from '../components/ThemeContext';
import Header from '../components/Header';
import CityList from '../components/CityList';
import AlgorithmSelector from '../components/AlgorithmSelector';
import Canvas from '../components/Canvas';
import Results from '../components/Results';
import AlgorithmInfo from '../components/AlgorithmInfo';

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

function Home() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Problem Configuration</h2>

            <CityList
              cities={cities}
              onAddCity={addCity}
              onRemoveCity={removeCity}
              onUpdateCity={updateCity}
            />

            <AlgorithmSelector
              method={method}
              onMethodChange={setMethod}
            />

            {/* Solve Button */}
            <button
              onClick={handleSolve}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md"
            >
              Solve TSP
            </button>

            <Results
              path={path}
              totalDistance={totalDistance}
              cities={cities}
            />
          </div>

          {/* Right Panel - Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Route Visualization</h2>

            <Canvas cities={cities} path={path} />

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Interactive visualization of cities and the computed optimal route
            </p>

            <AlgorithmInfo method={method} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
