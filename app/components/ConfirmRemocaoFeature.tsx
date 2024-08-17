import React from 'react';

export default function ConfirmRemoveModal({ isOpen, onClose, onConfirm, feature }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Remover Feature</h2>
        <p className="mb-4">Tem certeza de que deseja remover a feature "{feature?.name}"?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm(feature);
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
