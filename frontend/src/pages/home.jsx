import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/taskCard";
import Button from "../components/button";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/`
            );
            const data = await res.json();
            setTasks(data.filter((task) => !task.completed));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
                method: "DELETE",
            });
            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async (id, updatedTask) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                }
            );

            if (!response.ok) throw new Error("Failed to update task");

            const updatedData = await response.json();
            console.log("Task Updated:", updatedData);

            setTasks((prevTasks) =>
                prevTasks
                    .map((task) =>
                        task._id === id ? { ...task, ...updatedData } : task
                    )
                    .filter((task) => !task.completed)
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="container">
            <h1>All Tasks</h1>
            <Button label="+ Add Task" onClick={() => navigate("/add")} />

            <div className="task-list">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))
                ) : (
                    <p>No tasks available 🎉</p>
                )}
            </div>
        </div>
    );
};

export default Home;
