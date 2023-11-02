import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define your Axios configuration
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 5000, // Set your desired timeout
});

// Define a custom Axios request function to handle errors
const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    // You can handle and customize error responses here
    throw error;
  }
};

// Define your API calls
export const getUsers = async (): Promise<User[]> => {
  const response = await request<User[]>({
    method: 'get',
    url: '/users', // Replace with your API endpoint
  });
  return response;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await request<User>({
    method: 'post',
    url: '/users', // Replace with your API endpoint
    data: user,
  });
  return response;
};

// Define your data models (if any)
interface User {
  id: number;
  name: string;
  email: string;
}