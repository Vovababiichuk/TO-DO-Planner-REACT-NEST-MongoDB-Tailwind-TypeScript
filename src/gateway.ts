import { TaskInterface } from './types/types';

const baseUrl = 'https://to-do-planner-nest-back.vercel.app/tasks';

const handleRequest = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${baseUrl}/${url}`, options);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const getTasks = async () => {
  return handleRequest('');
};

export const createTask = async (text: string) => {
  return handleRequest('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, done: false }),
  });
};

export const updateTask = async (_id: string, updatedFields: Partial<TaskInterface>) => {
  const response = await handleRequest(`${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields),
  });

  return response;
};

export const deleteTask = async (_id: string) => {
  return handleRequest(`${_id}`, { method: 'DELETE' });
};
