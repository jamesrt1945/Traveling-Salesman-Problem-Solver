# Traveling Salesman Problem (TSP) Solver

[![TSP Solver](https://img.shields.io/badge/TSP-Solver-blue)](https://tsp-solver.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com)

An interactive, professional web application for solving the Traveling Salesman Problem using multiple heuristic algorithms. Built with modern web technologies for optimal performance and user experience.

## 🌟 Features

- **Interactive City Management**: Add, remove, and edit city coordinates in real-time
- **Multiple Algorithm Support**:
  - Nearest Neighbor Heuristic
  - 2-Opt Local Search
  - Simulated Annealing
  - Greedy Heuristic
- **Real-time Visualization**: Dynamic canvas rendering with cities and optimized routes
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Responsive Design**: Optimized for desktop and mobile devices
- **Professional UI**: Clean, modern interface with smooth animations
- **Algorithm Comparison**: Compare different heuristic approaches side-by-side

## 🚀 Live Demo

[View Live Application](https://tsp-solver.vercel.app)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tsp-solver.git
   cd tsp-solver
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic Usage
1. **Add Cities**: Use the input fields to specify X and Y coordinates for each city
2. **Select Algorithm**: Choose from four different heuristic approaches
3. **Solve**: Click "Solve TSP" to compute the optimal route
4. **View Results**: See the total distance and visualized path
5. **Compare**: Try different algorithms to compare their performance

### Advanced Features
- **Theme Toggle**: Switch between light and dark modes
- **Real-time Updates**: Modify city positions and instantly see route changes
- **Algorithm Information**: Learn about each heuristic method

## 🧮 Algorithms Implemented

### 1. Nearest Neighbor
- **Approach**: Start at first city, repeatedly visit closest unvisited city
- **Complexity**: O(n²)
- **Pros**: Simple, fast execution
- **Cons**: May produce suboptimal solutions

### 2. 2-Opt Local Search
- **Approach**: Iteratively improve solution by swapping path edges
- **Complexity**: Variable (depends on improvements found)
- **Pros**: Often finds better solutions than constructive heuristics
- **Cons**: May get stuck in local optima

### 3. Simulated Annealing
- **Approach**: Probabilistic optimization inspired by annealing process
- **Complexity**: Configurable (temperature schedule dependent)
- **Pros**: Can escape local optima, finds good solutions
- **Cons**: Requires parameter tuning

### 4. Greedy Heuristic
- **Approach**: Make locally optimal choices at each step
- **Complexity**: O(n²)
- **Pros**: Fast, deterministic results
- **Cons**: May not find globally optimal solutions

## 🏗️ Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx           # Main application component
│   └── globals.css        # Global styles and custom scrollbars
├── components/            # Reusable UI components
└── lib/                  # Utility functions and algorithms
```

## 🎨 Design System

- **Color Palette**: Professional blue/gray theme with dark mode support
- **Typography**: Geist Sans font family for optimal readability
- **Components**: Tailwind CSS utility classes for consistent styling
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🔍 SEO Optimization

- Comprehensive meta tags and Open Graph data
- Structured data (JSON-LD) for search engines
- Semantic HTML structure
- Fast loading with Next.js optimization
- Mobile-friendly responsive design

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Heroicons](https://heroicons.com)
- Fonts from [Google Fonts](https://fonts.google.com)

## 📞 Contact

For questions or feedback, please open an issue on GitHub.

---

**Keywords**: traveling salesman problem, TSP solver, route optimization, heuristic algorithms, algorithm visualization, computational optimization, NP-hard problems, delivery route planner

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
