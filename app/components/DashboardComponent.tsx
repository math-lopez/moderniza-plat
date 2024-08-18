import { useContext, useState } from 'react';
import FeatureCard from './FeatureCardComponent';
import { FeatureContext } from '../FeatureProvider';
import AddFeatureModal from './AddFeatureModal';
import ConfirmRemoveModal from './ConfirmRemocaoFeature';

const _ = require('lodash');

export default function Dashboard() {
  const { features, setFeatures, addFeature, deleteFeature, updateFeature } = useContext(FeatureContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [featureToRemove, setFeatureToRemove] = useState(null);

  const handleUpdateFeature = async (upFeature) => {
    const updatedFeatures = await features.filter((feature) => feature.id === upFeature.id);
    if(!_.isEqual(updatedFeatures[0], upFeature)){
      updateFeature(updatedFeatures[0].id, upFeature);
    }
  };

  const handleAddFeature = (newFeature) => {
    addFeature(newFeature);
  };

  const handleRemoveFeature = (feature) => {
    console.log(feature)
    deleteFeature(feature.id);
    setFeatures(features.filter((f) => f.name !== feature.name));
  };

  const openConfirmRemoveModal = (feature) => {
    setFeatureToRemove(feature);
    setIsConfirmRemoveOpen(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Nova Feature
      </button>

      <div className="flex flex-wrap justify-center">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index} 
            feature={feature} 
            onUpdate={handleUpdateFeature} 
            onRemove={() => openConfirmRemoveModal(feature)}
          />
        ))}
      </div>

      <AddFeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddFeature}
      />

      <ConfirmRemoveModal
        isOpen={isConfirmRemoveOpen}
        onClose={() => setIsConfirmRemoveOpen(false)}
        onConfirm={handleRemoveFeature}
        feature={featureToRemove}
      />
    </div>
  );
}