"use client";

import { useContext } from 'react';
import Dashboard from '../components/DashboardComponent';
import { FeatureContext } from '../FeatureProvider';

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
