import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FolderIcon, TrashIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Folder = ({ folder, deleteFolder }) => {
  return (
    <Droppable droppableId={`folder-${folder.id}`}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="relative">
          <Link
            to={`/folder/${folder.id}`}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <FolderIcon className="h-12 w-12" style={{ color: folder.color }} />
            <span className="mt-2 text-sm font-medium">{folder.name}</span>
          </Link>
          <button onClick={() => deleteFolder(folder.id)} className="absolute top-0 right-0 p-1">
            <TrashIcon className="h-4 w-4 text-red-500" />
          </button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Folder;
