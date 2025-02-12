// src/components/ConnectionSidebar.js
import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConnectionSidebar = ({ connection, onClose, onConnectionUpdated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (connection) {
      setFormData({
        name: connection.name || '',
        host: connection.host || '',
        port: connection.port || '',
        username: connection.username || '',
        password: connection.password || '',
      });
    }
  }, [connection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mise à jour de la connexion via l'API
    try {
      await axios.put(`http://localhost:3001/connections/${connection.id}`, formData);
      if (onConnectionUpdated) {
        onConnectionUpdated();
      }
      onClose();
    } catch (error) {
      console.error('Error updating connection:', error);
    }
  };

  const handleLaunch = () => {
    // Redirige vers la page de connexion
    navigate(`/connection/${connection.id}`);
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50 transform transition-transform duration-300">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Détails de la connexion</h2>
        <button onClick={onClose}>
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hôte</label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Port</label>
            <input
              type="text"
              name="port"
              value={formData.port}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-1"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Sauvegarder
            </button>
            <button
              type="button"
              onClick={handleLaunch}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Lancer la connexion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectionSidebar;
