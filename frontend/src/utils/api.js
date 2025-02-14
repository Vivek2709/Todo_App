import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};
