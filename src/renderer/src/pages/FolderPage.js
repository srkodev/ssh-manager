// src/pages/FolderPage.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ConnectionSidebar from '../components/ConnectionSidebar';

const FolderPage = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [folderConnections, setFolderConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const folderResponse = await axios.get(`http://localhost:3001/folders/${id}`);
      setFolder(folderResponse.data);

      const allConnectionsResponse = await axios.get('http://localhost:3001/connections');
      const allConnections = allConnectionsResponse.data;
      const folderConns = allConnections.filter(
        (conn) => String(conn.folder_id) === String(id)
      );
      setFolderConnections(folderConns);
    } catch (error) {
      console.error('Error fetching folder data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Gestion du drag & drop (ici, par exemple pour déplacer une connexion vers le bureau via le breadcrumb)
  const onDragEnd = async (result) => {
    const { destination, draggableId, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    if (destination.droppableId === 'breadcrumb') {
      try {
        await axios.put(`http://localhost:3001/connections/${draggableId}`, { folder_id: null });
        fetchData();
      } catch (error) {
        console.error('Error updating connection (breadcrumb):', error);
      }
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
      <Link to="/" className="flex items-center mb-4 text-blue-500 hover:underline">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Retour au bureau
      </Link>
      {folder && (
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">{folder.name}</h1>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Breadcrumb compact servant aussi de zone droppable */}
            <Droppable droppableId="breadcrumb">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mb-4 inline-block bg-gray-200 rounded px-2 py-1"
                >
                  <span className="text-gray-600">/desktop/{folder.name}</span>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {/* Affichage des connexions du dossier */}
            <Droppable droppableId="folder">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-4 gap-4"
                >
                  {folderConnections.map((conn, index) => (
                    <Draggable key={String(conn.id)} draggableId={String(conn.id)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => handleConnectionClick(conn)}
                          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                        >
                          <svg
                            className="h-12 w-12 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                            />
                          </svg>
                          <span className="mt-2 text-sm font-medium">{conn.name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
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

export default FolderPage;
