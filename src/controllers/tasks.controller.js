import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks);
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    
    if(!task) return res.status(404).json({message: "Tarea no encontrada"});

    res.json(task);
};

export const createTask = async (req, res) => {
    const {title, description, status} = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            status,
        });

        const savedTask = await newTask.save();
        res.json(savedTask); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if(!task) return res.status(404).json({message: "Tarea no encontrada"});

    res.json(task);
};

export const updateTask = async (req, res) => {

    const task = await Task.findByIdAndUpdate(req.body.id, req.body, {new: true});

    if(!task) return res.status(404).json({message: "Tarea no encontrada"});

    res.json(task);
};