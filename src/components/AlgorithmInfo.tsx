'use client';

import { useTheme } from './ThemeContext';

interface AlgorithmInfoProps {
  method: string;
}

export default function AlgorithmInfo({ method }: AlgorithmInfoProps) {
  const { theme } = useTheme();

  return (
    <div className={`mt-6 w-full rounded-lg p-4 border transition-colors ${
      theme === 'dark'
        ? 'bg-gray-700 border-gray-600'
        : 'bg-gray-50 border-gray-200'
    }`}>
      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Algorithm Information
      </h3>
      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
  );
}