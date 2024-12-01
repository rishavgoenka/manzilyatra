import axios from 'axios';

// Create an instance of axios with the base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8888', // Replace with your Spring Boot backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the instance for reuse
export default axiosInstance;