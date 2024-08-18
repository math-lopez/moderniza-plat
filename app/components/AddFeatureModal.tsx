import React, { useState } from 'react';

export const resetFeature = () => {
  return {
    name: '',
    frontEnd: { dev: 0, test: 0, deploy: 0, usage: 0 },
    backEnd: { dev: 0, test: 0, deploy: 0, usage: 0 },
    data: { dev: 0, test: 0, deploy: 0, usage: 0 }
  };
};

interface AddFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feature: any) => void;
}

export default function AddFeatureModal({ isOpen, onClose, onSubmit }: AddFeatureModalProps) {  
  const [feature, setFeature] = useState(resetFeature());

  

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFeature({ ...feature, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(feature);
    setFeature(resetFeature());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Add New Feature</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-rose-900">Feature Name</label>
          <input
            type="text"
            name="name"
            value={feature.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700"
            placeholder="Enter feature name"
          />
        </div>
        {/* Add other inputs for frontEnd, backEnd, etc. */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Feature
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-500 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
