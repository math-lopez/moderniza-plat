"use client";

import ProgressBar from './ProgressBarComponent';
import FeatureDetailsModal from './FeatureDetailModalComponent';
import { useState } from 'react';

export default function FeatureCard({ feature, onUpdate, onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(true);
  const [title, setTitle] = useState(feature.name);

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

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    const updatedFeature = { ...feature, name: title };
    onUpdate(updatedFeature);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const updateFeature = (updatedFeature) => {
    onUpdate(updatedFeature);
  };

  return (
    <div className="relative">
      <div
        className="bg-white shadow-lg rounded-lg p-6 m-4 w-80 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={openModal}
      >
        {isEditingTitle ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
            className="text-2xl font-semibold mb-2 text-blue-500 w-full p-2 border-b-2 border-blue-500 focus:outline-none"
          />
        ) : (
          <h3
            className="text-2xl font-semibold mb-2 text-blue-500 cursor-text"
            onClick={handleTitleClick}
          >
            {title}
          </h3>
        )}
        <ProgressBar label="Front-End" progress={(feature.frontEnd.dev + feature.frontEnd.test) / 2} />
        <ProgressBar label="Back-End" progress={(feature.backEnd.dev + feature.backEnd.test) / 2} />
        <ProgressBar label="Dados" progress={(feature.data.dev + feature.data.test) / 2} />
        <ProgressBar label="Deploy" progress={feature.deploy} />
        <ProgressBar label="Uso Efetivo" progress={feature.usage} />
        {+totalProgress < 100 ? (
          <h4 className="mt-4 text-lg font-medium text-rose-900">Total Progress: {totalProgress}%</h4>
        ) : (
          <h4 className="mt-4 text-lg font-medium text-green-500">Total Progress: {totalProgress}%</h4>
        )}
      </div>

      {/* Botão de Remoção */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Impede a abertura do modal ao clicar no botão de remoção
          onRemove(feature);
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full p-2 shadow-md"
        title="Remove Feature"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v1H8V5a2 2 0 012-2z"
          />
        </svg>
      </button>

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
