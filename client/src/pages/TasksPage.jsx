import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faListCheck,
  faTrash,
  faFilter,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import TaskButton from '../components/TaskButton';
import TaskModal from '../components/TaskModal';
import { toast } from 'react-toastify';

function TasksPage() {
  const { tasks, getTasks, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changeStatusFilter = (newStatus) => {
    setStatusFilter(newStatus);
    setIsDropdownOpen(false);
  };

  const openModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter((task) =>
    statusFilter === null ? true : task.status === statusFilter
  );

  const deleteHandle = (task) =>{
    deleteTask(task._id);
    toast.success('¡Tarea eliminada exitosamente!', {
      autoClose: 3000,
    });
  }

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex sm:justify-between items-center mb-6 sm:flex-row flex-col">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                <FontAwesomeIcon icon={faListCheck} />
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900">
                Administrador de tareas
              </h2>
            </div>

            <div className="flex justify-center items-start gap-3">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 bg-gray-700 text-neutral-100 rounded-full font-semibold text-sm duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <FontAwesomeIcon icon={faFilter} /> Filtrar
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-100 shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
                    <ul className="py-1">
                      <li
                        onClick={() => changeStatusFilter(null)}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-neutral-50 flex items-center"
                      >
                        {statusFilter === null && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mr-2 text-green-500"
                          />
                        )}
                        Todas
                      </li>
                      <li
                        onClick={() => changeStatusFilter(false)}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-neutral-50 flex items-center"
                      >
                        {statusFilter === false && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mr-2 text-green-500"
                          />
                        )}
                        Pendientes
                      </li>
                      <li
                        onClick={() => changeStatusFilter(true)}
                        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-neutral-50 flex items-center"
                      >
                        {statusFilter === true && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mr-2 text-green-500"
                          />
                        )}
                        Completadas
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <TaskButton />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 text-xl">
                <p>No hay tareas con este filtro</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                        className="text-neutral-600 cursor-pointer duration-300 hover:text-neutral-400 text-2xl"
                        onClick={() => openModal(task)}
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                      </button>
                      <button
                        className="text-red-500 text-xl duration-300 hover:text-red-700"
                        onClick={() => deleteHandle(task)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-400">
                    {task.description === '' ? 'Sin descripción' : task.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="mt-4 text-sm text-gray-500">
                      Creado el: {new Date(task.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-4 relative">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                          task.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-500'
                        }`}
                      >
                        {task.status ? 'Completada' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(data) => {
          const status = data.status === 'true';
          updateTask({ ...data, status });
          closeModal();
          toast.success('¡Tarea actualizada exitosamente!', {
            autoClose: 3000,
          });
        }}
        taskToEdit={taskToEdit}
      />
    </div>
  );
}

export default TasksPage;
