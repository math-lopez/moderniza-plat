"use client";

import ProgressBar from './ProgressBarComponent';
import FeatureDetailsModal from './FeatureDetailModalComponent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';

export default function FeatureCard({ feature, onUpdate, onRemove }) {
  const divisorDeItensPorFrente = 4;
  const divisorTotalGeral = 3;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(true);
  const [title, setTitle] = useState(feature.name);

  // Estados para progresso
  const [frontEndProgress, setFrontEndProgress] = useState(calculateProgress(feature.frontEnd));
  const [backEndProgress, setBackEndProgress] = useState(calculateProgress(feature.backEnd));
  const [dataEndProgress, setDataEndProgress] = useState(calculateProgress(feature.data));
  const [totalProgress, setTotalProgress] = useState(calculateTotalProgress(feature));

  useEffect(() => {
    // Atualiza o totalProgress sempre que qualquer progresso for atualizado
    setTotalProgress(calculateTotalProgress({ frontEnd: { dev: frontEndProgress, test: frontEndProgress, deploy: frontEndProgress, usage: frontEndProgress }, backEnd: { dev: backEndProgress, test: backEndProgress, deploy: backEndProgress, usage: backEndProgress }, data: { dev: dataEndProgress, test: dataEndProgress, deploy: dataEndProgress, usage: dataEndProgress } }));
  }, [frontEndProgress, backEndProgress, dataEndProgress]);

  function calculateProgress(frente) {
    return (Number(frente.dev) + Number(frente.test) + Number(frente.deploy) + Number(frente.usage)) / divisorDeItensPorFrente;
  }

  function calculateTotalProgress(updatedFeature) {
    return (
      (
        calculateProgress(updatedFeature.frontEnd) +
        calculateProgress(updatedFeature.backEnd) +
        calculateProgress(updatedFeature.data)
      ) / divisorTotalGeral
    ).toFixed(2);
  }

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
    setFrontEndProgress(calculateProgress(updatedFeature.frontEnd));
    setBackEndProgress(calculateProgress(updatedFeature.backEnd));
    setDataEndProgress(calculateProgress(updatedFeature.data));
    setTotalProgress(calculateTotalProgress(updatedFeature));
    onUpdate(updatedFeature);
    setIsModalOpen(false);
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
        <ProgressBar label="Front-End" progress={frontEndProgress} />
        <ProgressBar label="Back-End" progress={backEndProgress} />
        <ProgressBar label="Dados" progress={dataEndProgress} />
        <h4 className={`mt-4 text-lg font-medium ${totalProgress < 100 ? 'text-rose-900' : 'text-green-500'}`}>
          Total Progress: {totalProgress}%
        </h4>
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
          setIsModalOpen(true);
        }}
        className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 transition duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-2 shadow-md"
        title="Edit Feature"
      >
        <EditIcon className="w-6 h-6" />
      </button>

      {isModalOpen && (
        <FeatureDetailsModal
          feature={feature}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          updateFeature={updateFeature}
        />
      )}
    </div>
  );
}
