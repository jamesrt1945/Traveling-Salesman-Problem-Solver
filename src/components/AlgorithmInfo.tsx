'use client';

interface AlgorithmInfoProps {
  method: string;
}

export default function AlgorithmInfo({ method }: AlgorithmInfoProps) {
  return (
    <div className="mt-6 w-full rounded-lg p-4 border transition-colors bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
        Algorithm Information
      </h3>
      <div className="text-sm text-gray-600 dark:text-gray-300">
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