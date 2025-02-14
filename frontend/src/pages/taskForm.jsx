import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert("Please fill out all fields");
            return;
        }
        try {
            console.log("Sending request:", { title, description }); // Debug log
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, description }),
                }
            );

            const data = await response.json();
            console.log("Response:", data); // Debug response

            if (!response.ok) {
                throw new Error(data.message || "Failed to add task");
            }

            alert("Task added successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Something went wrong. Try again!");
        }
    };

    return (
        <div className="container">
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>Add New Task</h2>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    rows="3"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
