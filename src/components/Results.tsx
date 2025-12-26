'use client';

import { useTheme } from './ThemeContext';

type City = { x: number; y: number; id: number };

interface ResultsProps {
  path: number[];
  totalDistance: number;
  cities: City[];
}

export default function Results({ path, totalDistance, cities }: ResultsProps) {
  const { theme } = useTheme();

  if (path.length === 0) return null;

  return (
    <div className={`mt-6 rounded-lg p-4 border transition-colors ${
      theme === 'dark'
        ? 'bg-blue-900/20 border-blue-700'
        : 'bg-blue-50 border-blue-200'
    }`}>
      <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Solution Results
      </h3>
      <div className="space-y-2">
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
          <span className="font-medium">Total Distance:</span>
          <span className="ml-2 text-blue-400 font-bold">{totalDistance.toFixed(2)}</span>
        </p>
        <div>
          <p className={`font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Optimal Route:
          </p>
          <div className="flex flex-wrap gap-2">
            {path.map((id, i) => (
              <span
                key={i}
                className={`px-3 py-1 text-sm rounded-md border ${
                  theme === 'dark'
                    ? 'bg-blue-900/50 text-blue-200 border-blue-700'
                    : 'bg-blue-100 text-blue-800 border-blue-200'
                }`}
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