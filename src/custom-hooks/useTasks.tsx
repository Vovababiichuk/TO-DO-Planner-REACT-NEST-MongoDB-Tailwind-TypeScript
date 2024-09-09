import confetti from 'canvas-confetti';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { TaskInterface } from '../Interfaces/interfaces';

const baseUrl = 'https://to-do-planner-nest-back.vercel.app/tasks';

const handleRequest = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await handleRequest(baseUrl);
      setTasks(sortTasks(data));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const sortTasks = (tasks: TaskInterface[]) =>
    tasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  const addTask = async (text: string) => {
    try {
      const newTask = await handleRequest(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, done: false }),
      });
      setTasks(prevTasks => [{ text, done: false, _id: newTask._id }, ...prevTasks]);
      toast.success('Task CREATED successfully! 👍');
      confetti({ particleCount: 200, spread: 120, origin: { y: 1 } });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleTaskDone = async (_id: string, done: boolean) => {
    try {
      const updatedTask = await handleRequest(`${baseUrl}/${_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done }),
      });
      setTasks(prevTasks =>
        sortTasks(prevTasks.map(task => (task._id === _id ? updatedTask : task))),
      );
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast.error('Failed to update task status');
    }
  };

  const deleteTask = async (_id: string) => {
    try {
      await handleRequest(`${baseUrl}/${_id}`, { method: 'DELETE' });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
      toast.error('Task DELETED successfully! 🚮');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  const updateTask = async (_id: string, newText: string) => {
    try {
      const updatedTask = await handleRequest(`${baseUrl}/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });
      setTasks(prevTasks => prevTasks.map(task => (task._id === _id ? updatedTask : task)));
      toast.success('Task UPDATED successfully! ✨');
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  return {
    tasks,
    addTask,
    toggleTaskDone,
    deleteTask,
    updateTask,
  };
};
