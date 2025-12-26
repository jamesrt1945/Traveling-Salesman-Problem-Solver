import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSP Solver - Traveling Salesman Problem Visualizer | Multiple Heuristics",
  description: "Interactive Traveling Salesman Problem solver with real-time visualization. Compare Nearest Neighbor, 2-Opt, Simulated Annealing, and Greedy Heuristic algorithms. Add cities, visualize routes, and optimize delivery paths.",
  keywords: [
    "traveling salesman problem",
    "TSP solver",
    "TSP algorithm",
    "nearest neighbor",
    "2-opt algorithm",
    "simulated annealing",
    "greedy heuristic",
    "route optimization",
    "delivery route planner",
    "algorithm visualization",
    "computational optimization",
    "NP-hard problems"
  ],
  authors: [{ name: "TSP Visualizer Team" }],
  creator: "TSP Visualizer",
  publisher: "TSP Visualizer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tsp-solver.vercel.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TSP Solver - Traveling Salesman Problem Visualizer",
    description: "Interactive TSP solver with multiple heuristic algorithms. Visualize and compare route optimization techniques in real-time.",
    url: '/',
    siteName: 'TSP Solver',
    images: [
      {
        url: '/logo.png',
        width: 400,
        height: 400,
        alt: 'TSP Solver Logo - Traveling Salesman Problem Visualization',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TSP Solver - Traveling Salesman Problem Visualizer",
    description: "Interactive TSP solver with multiple heuristic algorithms. Visualize and compare route optimization techniques.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TSP Solver - Traveling Salesman Problem Visualizer",
    "description": "Interactive Traveling Salesman Problem solver with real-time visualization using multiple heuristic algorithms including Nearest Neighbor, 2-Opt, Simulated Annealing, and Greedy Heuristic.",
    "url": "https://tsp-solver.vercel.app", // Replace with your actual domain
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Interactive city placement",
      "Real-time route visualization",
      "Multiple algorithm comparison",
      "Nearest Neighbor heuristic",
      "2-Opt local search",
      "Simulated Annealing optimization",
      "Greedy Heuristic approach"
    ],
    "author": {
      "@type": "Organization",
      "name": "TSP Visualizer Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TSP Visualizer"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
