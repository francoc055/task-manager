import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const TaskModal = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        reset(); 
        clearErrors(); 
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reset, clearErrors]);

  useEffect(() => {
    if (taskToEdit) {
      reset({
        id: taskToEdit._id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status.toString(),
      });
    }
  }, [taskToEdit, reset]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 transition-all duration-300 ease-out opacity-100">
      <div
        className={`bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md transform transition-all duration-300 ease-out 
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}`}
      >
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            {taskToEdit ? 'Editar tarea' : 'Crear tarea'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "El título es requerido" })}
                className="text-neutral-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Título de la tarea"
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="text-neutral-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Descripción de la tarea"
              />
              {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="status"
                {...register("status", { required: "El estado es requerido" })}
                className="text-neutral-600 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              >
                <option value="" disabled selected>Seleccionar estado</option>
                <option value="false">Pendiente</option>
                <option value="true">Completada</option>
              </select>
              {errors.status && <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => { onClose(); reset(); clearErrors(); }}
                className="w-1/3 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-1/3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {taskToEdit ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
