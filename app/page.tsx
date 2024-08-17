"use client";

import { useContext, useState } from 'react';
import Dashboard from './components/DashboardComponent';
import Navbar from './components/Navbar';
import { FeatureContext } from './FeatureProvider';

export default function Home() {
  const { features, setFeatures} = useContext(FeatureContext);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-10">
        <Dashboard features={features} />
      </div>
    </div>

  );
}
