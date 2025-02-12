import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ConnectionList = ({ connections }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Connexions SSH</h2>
      {connections.map((connection, index) => (
        <Draggable key={String(connection.id)} draggableId={String(connection.id)} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="p-2 mb-2 bg-gray-100 rounded shadow flex items-center"
            >
              <svg className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              {connection.name}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ConnectionList;
