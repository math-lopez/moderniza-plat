"use client";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useState } from 'react';
import { FeatureContext } from '../FeatureProvider';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const { features, setFeatures} = useContext(FeatureContext);

  const calculateAverageProgress = (getValue) => {
    const totalFeatures = features.length;
    const totalProgress = features.reduce((sum, feature) => {
      return sum + getValue(feature);
    }, 0);
    return (totalProgress / totalFeatures).toFixed(2);
  };

  const frontEndProgress = calculateAverageProgress(
    (feature) => (feature.frontEnd.dev + feature.frontEnd.test) / 2
  );
  const backEndProgress = calculateAverageProgress(
    (feature) => (feature.backEnd.dev + feature.backEnd.test) / 2
  );
  const dataProgress = calculateAverageProgress(
    (feature) => (feature.data.dev + feature.data.test) / 2
  );
  const deployProgress = calculateAverageProgress((feature) => feature.deploy);
  const usageProgress = calculateAverageProgress((feature) => feature.usage);

  const createChartData = (label, progress) => ({
    labels: [label, 'Restante'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#45A049', '#8e1f1f'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  });

  const charts = [
    { label: 'Uso Efetivo', progress: usageProgress },
    { label: 'Front-End', progress: frontEndProgress },
    { label: 'Back-End', progress: backEndProgress },
    { label: 'Dados', progress: dataProgress },
    { label: 'Deploy', progress: deployProgress },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-10">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-700">
        Dashboard de Modernização por Frente
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              {chart.label}
            </h2>
            <Pie data={createChartData(chart.label, chart.progress)} />
            <p className="mt-6 text-center text-gray-600">
              Progresso de {chart.label}:{' '}
              <span className="font-bold text-blue-500">{chart.progress}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
