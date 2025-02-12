// src/pages/ConnectionPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import XtermTerminal from '../components/Terminal';
import axios from 'axios';

const ConnectionPage = () => {
  const { id } = useParams();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    // Récupération des données de la connexion depuis l'API
    axios.get(`http://localhost:3001/connections/${id}`)
      .then((response) => {
        setConnection(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la connexion:', error);
      });
  }, [id]);

  if (!connection) {
    return <div className="p-4">Chargement de la connexion...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex items-center">
        <Link to="/" className="text-blue-300 hover:underline mr-4">
          ← Retour
        </Link>
        <h1 className="text-2xl font-bold">Connexion SSH : {connection.name}</h1>
      </header>
      <div className="flex-grow">
        <XtermTerminal connection={connection} />
      </div>
    </div>
  );
};

export default ConnectionPage;
