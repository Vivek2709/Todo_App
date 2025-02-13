const Task = require("../models/Task.js");
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
const addTask = async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Invalid Task Data" });
    }

    try {
        const task = new Task({ title, completed: false });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error("Erro in Create Task");
        res.status(500).json({ message: "Server Error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: "Update Failed" });
    }
};
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(400).json({ message: "Delete Failed" });
    }
};
module.exports = { getTasks, addTask, updateTask, deleteTask };
