# Travelling Salesman Problem (TSP) Solver

A minimal and professional web application for solving the Travelling Salesman Problem using heuristics, built with Next.js and Tailwind CSS.

## Features

- Input city coordinates via a simple text area
- Solve TSP using the Nearest Neighbor heuristic
- Visualize the solution on a canvas with cities and the optimal path
- Display the total distance of the path

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter city coordinates in the format `x,y` one per line in the text area.
2. Click "Solve with Nearest Neighbor" to compute the solution.
3. View the path and total distance below the button.
4. The canvas will display the cities as blue dots and the path as a red line.

## Heuristic Used

This application implements the **Nearest Neighbor** algorithm, a simple heuristic for TSP:

- Start from the first city.
- Repeatedly visit the closest unvisited city.
- Return to the starting city.

Note: This is an approximation algorithm and may not find the optimal solution for all cases.

## Technologies

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- TypeScript - Typed JavaScript

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
