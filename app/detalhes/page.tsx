"use client";

import { useState } from 'react';
import Dashboard from '../components/DashboardComponent';
import Navbar from '../components/Navbar';

export default function Home() {
  const [features, setFeatures] = useState([
    {
      name: 'Feature 1',
      frontEnd: 100,
      backEnd: 70,
      data: 50,
      deploy: 60,
      usage: 40,
    },
    {
      name: 'Feature 2',
      frontEnd: 90,
      backEnd: 85,
      data: 75,
      deploy: 95,
      usage: 80,
    },
  ]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-10">
        <Dashboard features={features} />
      </div>
    </div>

  );
}
