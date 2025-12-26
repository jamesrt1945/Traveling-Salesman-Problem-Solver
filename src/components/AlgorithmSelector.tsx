'use client';

import { useTheme } from './ThemeContext';

interface AlgorithmSelectorProps {
  method: string;
  onMethodChange: (method: string) => void;
}

export default function AlgorithmSelector({ method, onMethodChange }: AlgorithmSelectorProps) {
  const { theme } = useTheme();

  return (
    <div className="mb-6">
      <label className={`block text-lg font-medium mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        Algorithm
      </label>
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${
          theme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
            : 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        }`}
      >
        <option value="nearestNeighbor">Nearest Neighbor</option>
        <option value="twoOpt">2-Opt Local Search</option>
        <option value="simulatedAnnealing">Simulated Annealing</option>
        <option value="greedyHeuristic">Greedy Heuristic</option>
      </select>
    </div>
  );
}