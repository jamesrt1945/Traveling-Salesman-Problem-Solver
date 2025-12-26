'use client';

type City = { x: number; y: number; id: number };

interface CityListProps {
  cities: City[];
  onAddCity: () => void;
  onRemoveCity: (id: number) => void;
  onUpdateCity: (id: number, field: 'x' | 'y', value: string) => void;
}

export default function CityList({ cities, onAddCity, onRemoveCity, onUpdateCity }: CityListProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
        Cities
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {cities.map(city => (
          <div
            key={city.id}
            className="flex items-center justify-between rounded-lg p-4 border transition-colors bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <span className="font-medium text-gray-700 dark:text-gray-200">
              City {city.id + 1}
            </span>

            <div className="flex gap-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={city.x}
                  onChange={(e) => onUpdateCity(city.id, 'x', e.target.value)}
                  className="w-16 px-2 py-1 rounded border outline-none transition-colors border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  placeholder="X"
                />
                <input
                  type="number"
                  value={city.y}
                  onChange={(e) => onUpdateCity(city.id, 'y', e.target.value)}
                  className="w-16 px-2 py-1 rounded border outline-none transition-colors border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400"
                  placeholder="Y"
                />
              </div>
              <button
                onClick={() => onRemoveCity(city.id)}
                disabled={cities.length <= 1}
                className="p-1 rounded transition-colors text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed dark:text-red-400 dark:hover:text-red-300 disabled:opacity-30"
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
        onClick={onAddCity}
        className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        + Add City
      </button>
    </div>
  );
}