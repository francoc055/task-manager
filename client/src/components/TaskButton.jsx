import React, { useState } from 'react';
import TaskModal from './TaskModal';
import { useTasks } from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

const TaskButton = () => {
  const {createTask} = useTasks();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data) => {
    const status = data.status === 'true'; 
    createTask({ ...data, status })
    closeModal(); 

    toast.success('¡Tarea creada exitosamente!', {
      autoClose: 3000,
    });
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-gray-700 text-neutral-100 rounded-full font-semibold text-sm duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <FontAwesomeIcon icon={faPlus} /> Agregar tarea
      </button>

      <TaskModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default TaskButton;
