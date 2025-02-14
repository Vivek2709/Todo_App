import { useState } from "react";
import Button from "../components/button";
import "../styles/styles.css";

const TaskCard = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(
        task.description
    );

    const handleDelete = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "DELETE",
                }
            );
            onDelete(task._id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                title: updatedTitle,
                description: updatedDescription,
                completed: task.completed,
            };

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                }
            );

            if (!res.ok) throw new Error("Failed to update task");

            onUpdate(task._id, updatedTask);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const toggleComplete = async () => {
        try {
            const updatedTask = { ...task, completed: !task.completed };

            await fetch(
                `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTask),
                }
            );

            onUpdate(task._id, updatedTask);
        } catch (error) {
            console.error("Error marking task as complete:", error);
        }
    };

    return (
        <div className={`taskCard ${task.completed ? "completed" : ""}`}>
            {isEditing ? (
                <div className="editMode">
                    <div className="editContainer">
                        <h3 className="editTitle">Edit Task ✏️</h3>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="input editInput"
                            placeholder="Task Title"
                        />
                        <textarea
                            value={updatedDescription}
                            onChange={(e) =>
                                setUpdatedDescription(e.target.value)
                            }
                            className="textarea editTextarea"
                            placeholder="Task Description"
                        />
                        <div className="taskActions">
                            <Button label="Save 💾" onClick={handleUpdate} />
                            <Button
                                label="Cancel"
                                type="secondary"
                                onClick={() => setIsEditing(false)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="title">{task.title}</h3>
                    <p className="description">{task.description}</p>
                    <div className="taskActions">
                        <Button
                            label="Edit ✏️"
                            onClick={() => setIsEditing(true)}
                        />
                        <Button
                            label={
                                task.completed ? "Undo ❌" : "Mark Complete ✅"
                            }
                            onClick={toggleComplete}
                        />
                        <Button
                            label="Delete 🗑️"
                            type="secondary"
                            onClick={handleDelete}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCard;
