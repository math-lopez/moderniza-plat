"use client";

import ProgressBar from './ProgressBarComponent';
import FeatureDetailsModal from './FeatureDetailModalComponent';
import { useState } from 'react';


export default function FeatureCard({ feature, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalProgress = (
    (
      (feature.frontEnd.dev + feature.frontEnd.test) / 2 +
      (feature.backEnd.dev + feature.backEnd.test) / 2 +
      (feature.data.dev + feature.data.test) / 2 +
      feature.deploy +
      feature.usage
    ) / 5
  ).toFixed(2);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updateFeature = (updatedFeature) => {
    onUpdate(updatedFeature);
  };

  return (
    <div>
      <div
        className="bg-white shadow-lg rounded-lg p-6 m-4 w-80 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={openModal}
      >
        <h3 className="text-2xl font-semibold mb-4 text-blue-500">{feature.name}</h3>
        <ProgressBar label="Front-End" progress={(feature.frontEnd.dev + feature.frontEnd.test) / 2} />
        <ProgressBar label="Back-End" progress={(feature.backEnd.dev + feature.backEnd.test) / 2} />
        <ProgressBar label="Dados" progress={(feature.data.dev + feature.data.test) / 2} />
        <ProgressBar label="Deploy" progress={feature.deploy} />
        <ProgressBar label="Uso Efetivo" progress={feature.usage} />
        ({+totalProgress < 100 ? (<h4 className="mt-4 text-lg font-medium text-rose-900">Total Progress: {totalProgress}%</h4>) : (<h4 className="mt-4 text-lg font-medium text-green-500">Total Progress: {totalProgress}%</h4>)})

      </div>

      {isModalOpen && (
        <FeatureDetailsModal
          feature={feature}
          closeModal={closeModal}
          updateFeature={updateFeature}
        />
      )}
    </div>
  );
}