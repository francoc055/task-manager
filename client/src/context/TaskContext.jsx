import React, { createContext, useState, useEffect, useContext } from 'react';
import { getTasksRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest} from '../api/tasks';

export const TasksContext = createContext();

export const useTasks = () => {
    const context = useContext(TasksContext);

    if(!context){
        throw new Error('useTasks must be used within in taskprovider')
    }

    return context;
}

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () =>{
        try {
            const res = await getTasksRequest();
            setTasks(res.data)
        } catch (error) {
            console.log(error);            
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks((prevTasks) => [...prevTasks, res.data]);
        } catch (error) {
            console.log(error);
        }
    }
    
    const updateTask = async (task) => {
        try {
            await updateTaskRequest(task);
            const res = await getTasksRequest();
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            await deleteTaskRequest(id);
            const res = await getTasksRequest();
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TasksContext.Provider value={{ tasks, getTasks, createTask, updateTask, deleteTask }}>
        {children}
        </TasksContext.Provider>
    );
};
