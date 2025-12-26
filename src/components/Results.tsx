'use client';

type City = { x: number; y: number; id: number };

interface ResultsProps {
  path: number[];
  totalDistance: number;
  cities: City[];
}

export default function Results({ path, totalDistance, cities }: ResultsProps) {
  if (path.length === 0) return null;

  return (
    <div className="mt-6 rounded-lg p-4 border transition-colors bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
        Solution Results
      </h3>
      <div className="space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium">Total Distance:</span>
          <span className="ml-2 text-blue-400 font-bold">{totalDistance.toFixed(2)}</span>
        </p>
        <div>
          <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">
            Optimal Route:
          </p>
          <div className="flex flex-wrap gap-2">
            {path.map((id, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-md border bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-700"
              >
                {cities[id].id + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}