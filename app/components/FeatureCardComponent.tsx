"use client";

import ProgressBar from './ProgressBarComponent';
import FeatureDetailsModal from './FeatureDetailModalComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function FeatureCard({ feature, onUpdate, onRemove }) {
  const divisorDeItensPorFrente = 3;
  const divisorTotalGeral = 4;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(true);
  const [title, setTitle] = useState(feature.name);
  const [frontEndProgress, setfrontEndProgress] = useState((feature.frontEnd.dev + feature.frontEnd.test + feature.frontEnd.deploy) / divisorDeItensPorFrente);
  const [backEndProgress, setbackEndProgress] = useState((feature.backEnd.dev + feature.backEnd.test + feature.backEnd.deploy) / divisorDeItensPorFrente);
  const [dataEndProgress, setdataEndProgress] = useState((feature.data.dev + feature.data.test + feature.data.deploy) / divisorDeItensPorFrente);

  const totalProgress = (
    (
      (feature.frontEnd.dev + feature.frontEnd.test + feature.frontEnd.deploy) / divisorDeItensPorFrente +
      (feature.backEnd.dev + feature.backEnd.test + feature.backEnd.deploy) / divisorDeItensPorFrente +
      (feature.data.dev + feature.data.test + feature.data.deploy) / divisorDeItensPorFrente +
      feature.usage
    ) / divisorTotalGeral
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

  const updateFeature = (feature) => {
    onUpdate(feature);
    setbackEndProgress((feature.backEnd.dev + feature.backEnd.test + feature.backEnd.deploy) / divisorDeItensPorFrente);
    setdataEndProgress((feature.data.dev + feature.data.test + feature.data.deploy) / divisorDeItensPorFrente);
    setfrontEndProgress((feature.frontEnd.dev + feature.frontEnd.test + feature.frontEnd.deploy) / divisorDeItensPorFrente);
  };

  return (
    <div className="relative">
  <div
    className="bg-white shadow-lg rounded-lg p-6 m-4 w-80 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
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
    <ProgressBar label="Front-End" progress={frontEndProgress.toPrecision(4)} />
    <ProgressBar label="Back-End" progress={backEndProgress.toPrecision(4)} />
    <ProgressBar label="Dados" progress={dataEndProgress.toPrecision(4)} />
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
    <DeleteIcon className="w-6 h-6" />
  </button>

  {/* Botão de Edição */}
  <button
    onClick={(e) => {
      e.stopPropagation(); // Impede a abertura do modal ao clicar no botão de edição
      openModal();
    }}
    className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-2 shadow-md"
    title="Edit Feature"
  >
    <EditIcon className="w-6 h-6" />
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