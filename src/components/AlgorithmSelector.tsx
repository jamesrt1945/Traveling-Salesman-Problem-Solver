'use client';

interface AlgorithmSelectorProps {
  method: string;
  onMethodChange: (method: string) => void;
}

export default function AlgorithmSelector({ method, onMethodChange }: AlgorithmSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
        Algorithm
      </label>
      <select
        value={method}
        onChange={(e) => onMethodChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border outline-none transition-colors border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
      >
        <option value="nearestNeighbor">Nearest Neighbor</option>
        <option value="twoOpt">2-Opt Local Search</option>
        <option value="simulatedAnnealing">Simulated Annealing</option>
        <option value="greedyHeuristic">Greedy Heuristic</option>
      </select>
    </div>
  );
}