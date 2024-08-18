import React, { useState } from 'react';

export default function AddFeatureModal({ isOpen, onClose, onSubmit }) {
  const [feature, setFeature] = useState({
    name: '',
    frontEnd: { dev: 0, test: 0, deploy: 0 },
    backEnd: { dev: 0, test: 0, deploy: 0 },
    data: { dev: 0, test: 0 , deploy: 0 },
    usage: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeature({ ...feature, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(feature);
    onClose(); // Fechar o modal após o envio
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Add New Feature</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Feature Name</label>
          <input
            type="text"
            name="name"
            value={feature.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
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
