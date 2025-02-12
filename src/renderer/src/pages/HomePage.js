// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/solid';
import FolderDialog from '../components/FolderDialog';
import ConnectionDialog from '../components/ConnectionDialog';
import Folder from '../components/Folder';
import ConnectionSidebar from '../components/ConnectionSidebar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [folders, setFolders] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const foldersResponse = await axios.get('http://localhost:3001/folders');
      const connectionsResponse = await axios.get('http://localhost:3001/connections');
      setFolders(foldersResponse.data);
      setConnections(connectionsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // Déplacement de la connexion dans un dossier
    if (destination.droppableId.startsWith('folder-')) {
      const targetFolderId = destination.droppableId.split('-')[1];
      try {
        await axios.put(`http://localhost:3001/connections/${draggableId}`, { folder_id: targetFolderId });
        fetchData();
      } catch (error) {
        console.error('Error moving connection:', error);
      }
    }
  };

  const addFolder = async ({ name, color }) => {
    try {
      const response = await axios.post('http://localhost:3001/folders', { name, color });
      setFolders([...folders, response.data]);
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  const deleteFolder = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/folders/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const addConnection = async ({ name, host, port, username, password }) => {
    try {
      const response = await axios.post('http://localhost:3001/connections', { name, host, port, username, password, folder_id: null });
      setConnections([...connections, response.data]);
    } catch (error) {
      console.error('Error adding connection:', error);
    }
  };

  const handleConnectionClick = (conn) => {
    setSelectedConnection(conn);
  };

  const closeSidebar = () => {
    setSelectedConnection(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen relative">
      <Link to="/" className="flex justify-center mb-4 text-3xl font-bold">Bureau</Link>
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setIsFolderDialogOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un Dossier
        </button>
        <button
          onClick={() => setIsConnectionDialogOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter une Connexion
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Connexions non assignées (bureau) */}
        <Droppable droppableId="home-connections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="mb-4">
              <h2 className="text-xl font-bold mb-2">Connexions</h2>
              <div className="grid grid-cols-4 gap-4">
                {connections.filter(conn => !conn.folder_id).map((conn, index) => (
                  <Draggable key={String(conn.id)} draggableId={String(conn.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleConnectionClick(conn)}
                        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                      >
                        <svg className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <span className="mt-2 text-sm font-medium">{conn.name}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        {/* Liste des dossiers avec leurs connexions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => {
            const folderConns = connections.filter(conn => String(conn.folder_id) === String(folder.id));
            return (
              <Folder
                key={folder.id}
                folder={{ ...folder, connections: folderConns }}
                deleteFolder={deleteFolder}
              />
            );
          })}
        </div>
      </DragDropContext>
      <FolderDialog
        isOpen={isFolderDialogOpen}
        onClose={() => setIsFolderDialogOpen(false)}
        onSubmit={addFolder}
      />
      <ConnectionDialog
        isOpen={isConnectionDialogOpen}
        onClose={() => setIsConnectionDialogOpen(false)}
        onSubmit={addConnection}
      />
      {selectedConnection && (
        <ConnectionSidebar
          connection={selectedConnection}
          onClose={closeSidebar}
          onConnectionUpdated={fetchData}
        />
      )}
    </div>
  );
};

export default HomePage;
