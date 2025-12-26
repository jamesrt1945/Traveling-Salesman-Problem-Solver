'use client';

import { useTheme } from './ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mb-12 text-center relative">
      <button
        onClick={toggleTheme}
        className={`absolute right-0 top-0 p-3 rounded-lg transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      <h1 className={`text-4xl font-bold mb-2 flex items-center justify-center gap-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <img
          src="/logo.png"
          alt="TSP Solver Logo"
          className="h-12 w-12 object-contain"
        />
        <span>Traveling Salesman Problem Solver</span>
      </h1>
      <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Interactive visualization with multiple heuristic algorithms
      </p>
      <div className={`mt-4 h-1 w-24 mx-auto rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600'}`}></div>

      {/* SEO-friendly description */}
      <div className={`mt-6 max-w-3xl mx-auto text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} hidden md:block`}>
        <p>
          Solve the classic Traveling Salesman Problem using advanced heuristic algorithms.
          Add cities by specifying coordinates, choose from multiple optimization techniques,
          and visualize the computed routes in real-time. Compare algorithm performance and
          understand how different approaches tackle this NP-hard optimization problem.
        </p>
      </div>
    </div>
  );
}