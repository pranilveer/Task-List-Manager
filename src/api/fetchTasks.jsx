import axios from "axios";

export const fetchTasks = async (limit = 20) => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        return response.data.slice(0, limit).map((task) => ({
            id: task.id,
            title: task.title,
            description: "No description provided", // Default placeholder description
            status: task.completed ? "Done" : "To Do",
        }));
    } catch (error) {
        console.error("Error fetching tasks:", error.message || error);
        return []; // Return an empty array to prevent app crashes
    }
};
