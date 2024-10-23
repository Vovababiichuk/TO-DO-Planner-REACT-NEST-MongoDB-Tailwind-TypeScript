import { TaskProps } from '../types/types';

const baseUrl = 'https://to-do-planner-nest-back.vercel.app/tasks';

const handleRequest = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(`${baseUrl}/${url}`, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error! Please check your internet connection or the server status.');
    }
    throw error;
  }
};

export const getTasks = async () => {
  return handleRequest('');
};

export const createTask = async (text: string) => {
  return handleRequest('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, isDone: false }),
  });
};

export const updateTask = async (id: string, updatedFields: Partial<TaskProps>) => {
  const response = await handleRequest(`${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields),
  });

  return response;
};

export const deleteTask = async (id: string) => {
  return handleRequest(`${id}`, { method: 'DELETE' });
};
