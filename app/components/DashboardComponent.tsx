import { useContext, useState } from 'react';
import FeatureCard from './FeatureCardComponent';
import { FeatureContext } from '../FeatureProvider';
import AddFeatureModal from './AddFeatureModal';
import ConfirmRemoveModal from './ConfirmRemocaoFeature';

export default function Dashboard() {
  const { features, setFeatures, addFeature, deleteFeature, updateFeature } = useContext(FeatureContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [featureToRemove, setFeatureToRemove] = useState(null);

  const handleUpdateFeature = async (upFeature) => {
    const updatedFeatures = await features.filter((feature) => feature.id === upFeature.id);
    console.log(JSON.stringify(upFeature), JSON.stringify(updatedFeatures))
    if(JSON.stringify(upFeature) !== JSON.stringify(updatedFeatures)){
      console.log("asdasdas")
      return;
    }
    updateFeature(updatedFeatures[0].id, updateFeature);
  };

  const handleAddFeature = (newFeature) => {
    addFeature(newFeature);
  };

  const handleRemoveFeature = (feature) => {
    setFeatures(features.filter((f) => f.name !== feature.name));
  };

  const openConfirmRemoveModal = (feature) => {
    setFeatureToRemove(feature);
    console.log(feature.id)
    deleteFeature(feature.id);
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