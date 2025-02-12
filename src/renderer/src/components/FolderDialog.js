// src/components/FolderDialog.js
import React, { useState } from 'react';

const FolderDialog = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000'); // Couleur par défaut

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, color });
    setName('');
    setColor('#000000');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Ajouter un Dossier</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom du Dossier</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Couleur du Dossier</label>
            <div className="flex items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div
                className="w-8 h-8 ml-2 border rounded-lg"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderDialog;
