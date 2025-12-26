# 🗺️ Traveling Salesman Problem (TSP) Solver

<div align="center">
  <img src="./public/logo.png" alt="TSP Solver Logo" width="120" height="120" />
  <br />
  <p><strong>Interactive Route Optimization with Multiple Heuristic Algorithms</strong></p>
</div>

[![TSP Solver](https://img.shields.io/badge/TSP-Solver-blue)](https://tsp-solver.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com)

A sophisticated web application for solving the classic Traveling Salesman Problem using advanced heuristic algorithms. Features real-time visualization, professional UI with dark/light theme support, and comprehensive algorithm comparison tools.

## 🌟 Features

### 🎯 Core Functionality
- **Dynamic City Management**: Add, edit, and remove cities with real-time coordinate updates
- **Multiple TSP Algorithms**: Four distinct heuristic approaches for route optimization
- **Interactive Canvas Visualization**: Real-time rendering of cities, routes, and directional arrows
- **Instant Solution Computation**: Immediate results with distance calculations and path visualization

### 🎨 User Experience
- **Dark/Light Theme Toggle**: Seamless theme switching with persistent user preferences
- **Responsive Design**: Optimized interface for desktop, tablet, and mobile devices
- **Smooth Animations**: Professional transitions and hover effects throughout the UI
- **Custom Scrollbars**: Themed scrollbar styling that adapts to the current theme

### 📊 Algorithm Analysis
- **Algorithm Information Panel**: Detailed explanations of each heuristic method
- **Performance Comparison**: Compare different algorithms on the same problem instance
- **Solution Metrics**: Total distance calculation and optimal route display
- **Visual Path Indicators**: Clear route visualization with numbered city markers

### 🔧 Technical Features
- **TypeScript Integration**: Full type safety and enhanced developer experience
- **SEO Optimization**: Comprehensive meta tags, structured data, and search engine friendly
- **Performance Optimized**: Fast loading with Next.js App Router and optimized builds
- **Accessibility Compliant**: ARIA labels, keyboard navigation, and screen reader support

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

## 📖 How to Use

### 🚀 Getting Started
1. **Access the Application**: Open the TSP Solver in your web browser
2. **Theme Selection**: Use the theme toggle button (sun/moon icon) in the top-right corner to switch between light and dark modes

### 🏙️ Managing Cities
1. **Add Cities**: Click the "+ Add City" button to create new city locations
2. **Edit Coordinates**: Modify X and Y coordinates using the input fields for each city
3. **Remove Cities**: Click the X button next to any city to remove it (minimum 1 city required)
4. **Real-time Updates**: Changes to city positions instantly update the visualization

### 🧮 Solving TSP Problems
1. **Select Algorithm**: Choose from four heuristic methods using the dropdown menu:
   - **Nearest Neighbor**: Fast, simple approach starting from the first city
   - **2-Opt**: Iterative improvement through edge swapping
   - **Simulated Annealing**: Probabilistic optimization with temperature cooling
   - **Greedy Heuristic**: Locally optimal choices at each step
2. **Compute Solution**: Click the "Solve TSP" button to calculate the optimal route
3. **View Results**: See the total distance and numbered route sequence
4. **Visualize Path**: Watch the canvas update with the computed route and directional arrows

### 📈 Analyzing Results
- **Distance Metrics**: View the total route distance with 2 decimal precision
- **Route Sequence**: See the optimal city order clearly displayed
- **Algorithm Insights**: Read detailed explanations of each method's approach
- **Performance Comparison**: Try different algorithms on the same city configuration

## 🧮 Implemented Algorithms

### 1. 🔍 Nearest Neighbor Heuristic
**Strategy**: Begins at the first city and repeatedly visits the closest unvisited city until all cities are visited.

**Characteristics**:
- **Time Complexity**: O(n²) where n is the number of cities
- **Space Complexity**: O(n) for city storage
- **Advantages**: Extremely fast execution, simple implementation
- **Limitations**: Can produce suboptimal solutions, sensitive to starting point

**Use Cases**: Quick approximations, large datasets where speed is prioritized over optimality

### 2. 🔄 2-Opt Local Search
**Strategy**: Starts with an initial solution and iteratively improves it by swapping two edges that would reduce the total tour length.

**Characteristics**:
- **Time Complexity**: Variable - depends on the number of improving swaps found
- **Space Complexity**: O(n) for maintaining the current solution
- **Advantages**: Often finds significantly better solutions than constructive methods
- **Limitations**: Can get trapped in local optima, may require multiple restarts

**Use Cases**: When solution quality is more important than computational speed

### 3. 🌡️ Simulated Annealing
**Strategy**: Uses a probabilistic approach inspired by the annealing process in metallurgy, accepting worse solutions early in the process to escape local optima.

**Characteristics**:
- **Time Complexity**: Configurable through temperature schedule parameters
- **Space Complexity**: O(n) for solution representation
- **Advantages**: Can escape local optima, finds high-quality solutions
- **Limitations**: Requires careful parameter tuning, stochastic results

**Use Cases**: Complex optimization problems where deterministic methods fail

### 4. 🎯 Greedy Heuristic
**Strategy**: Makes locally optimal choices at each step, selecting the best immediate option without considering long-term consequences.

**Characteristics**:
- **Time Complexity**: O(n²) for distance calculations
- **Space Complexity**: O(n) for maintaining available cities
- **Advantages**: Fast execution, deterministic results, predictable performance
- **Limitations**: May not find globally optimal solutions, myopic decision making

**Use Cases**: Scenarios requiring consistent, fast results with predictable behavior

## 🏗️ Project Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata and structured data
│   ├── page.tsx               # Main application with state management
│   ├── globals.css            # Global styles, custom scrollbars, theme variables
│   └── favicon.ico            # Application favicon
├── components/
│   ├── Header.tsx             # App header with logo, title, and theme toggle
│   ├── CityList.tsx           # City management interface with add/edit/remove
│   ├── AlgorithmSelector.tsx  # Algorithm selection dropdown
│   ├── Canvas.tsx             # Interactive route visualization component
│   ├── Results.tsx            # Solution display with distance and route
│   ├── AlgorithmInfo.tsx      # Algorithm descriptions and information
│   └── ThemeContext.tsx       # Theme state management and provider
├── lib/
│   └── algorithms.ts          # TSP algorithm implementations
└── types/
    └── index.ts               # TypeScript type definitions
```

### 🧩 Component Design
- **Modular Architecture**: Each UI component handles a specific responsibility
- **Theme Integration**: All components use centralized theme context
- **Type Safety**: Full TypeScript interfaces for all component props
- **Reusable Logic**: Shared utilities and custom hooks for common functionality

## 🎨 Design System

### 🎨 Color Palette
- **Primary Colors**: Professional blue tones (#2563eb, #3b82f6, #1d4ed8)
- **Semantic Colors**: Red for routes (#dc2626, #ef4444), green for actions (#10b981)
- **Neutral Grays**: Adaptive gray scale that works in both light and dark themes
- **Theme Variables**: CSS custom properties for consistent theming

### 📝 Typography
- **Font Family**: Geist Sans for optimal readability and modern aesthetics
- **Hierarchy**: Clear heading levels with appropriate font weights and sizes
- **Responsive Text**: Scales appropriately across different screen sizes

### 🖼️ Visual Elements
- **Canvas Rendering**: High-performance HTML5 Canvas with theme-aware colors
- **Icons**: Heroicons SVG icons for consistent, scalable graphics
- **Shadows**: Subtle box shadows for depth and visual hierarchy
- **Borders**: Clean, minimal borders with theme-appropriate colors

### ✨ Animations & Interactions
- **Theme Transitions**: Smooth 300ms transitions between light/dark modes
- **Hover Effects**: Interactive feedback on buttons and interactive elements
- **Loading States**: Visual feedback during computation
- **Focus States**: Clear focus indicators for accessibility

### 📱 Responsive Design
- **Breakpoint System**: Mobile-first approach with strategic breakpoints
- **Grid Layout**: CSS Grid and Flexbox for flexible, responsive layouts
- **Touch-Friendly**: Adequate touch targets for mobile interaction
- **Adaptive UI**: Interface elements that scale and reposition for different screens

## 🔍 SEO & Performance Optimization

### 📈 Search Engine Optimization
- **Meta Tags**: Comprehensive title, description, and Open Graph tags
- **Structured Data**: JSON-LD schema markup for rich search results
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Proper bot directives for search engine access

### ⚡ Performance Features
- **Next.js App Router**: Optimized routing with automatic code splitting
- **Static Generation**: Fast loading with pre-rendered pages where possible
- **Image Optimization**: Automatic image optimization and WebP conversion
- **Bundle Analysis**: Optimized bundle sizes with tree shaking
- **Caching Strategy**: Intelligent caching for improved load times

### 🌐 Web Standards
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Mobile-First**: Responsive design that works on all devices
- **Cross-Browser**: Tested compatibility across modern browsers
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA labels

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

## 🎯 Educational Value

### 📚 Learning Objectives
- **Algorithm Understanding**: Learn how different heuristic approaches tackle NP-hard problems
- **Visualization**: See abstract algorithms come to life through interactive graphics
- **Performance Analysis**: Compare algorithm efficiency and solution quality
- **Problem-Solving**: Understand the challenges of combinatorial optimization

### 🎓 Academic Applications
- **Computer Science Education**: Teaching algorithm design and analysis
- **Operations Research**: Demonstrating optimization techniques
- **Data Visualization**: Interactive examples of computational results
- **Heuristic Methods**: Practical applications of approximation algorithms

---

**Keywords**: traveling salesman problem, TSP solver, route optimization, heuristic algorithms, algorithm visualization, computational optimization, NP-hard problems, delivery route planner, combinatorial optimization, nearest neighbor, 2-opt, simulated annealing, greedy algorithm, interactive visualization, educational tool, operations research, computer science education

---

## 🚀 Future Enhancements

- **Additional Algorithms**: Genetic algorithms, ant colony optimization
- **3D Visualization**: Three-dimensional route visualization
- **Import/Export**: Save and load problem instances
- **Performance Metrics**: Detailed algorithm benchmarking
- **Mobile App**: Native mobile applications for iOS and Android
- **API Integration**: RESTful API for programmatic access
