import confetti from 'canvas-confetti';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { createTask, deleteTask, getTasks, updateTask } from '../gateways/tasks';
import { TaskProps } from '../types/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast.error('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const tasksWithId = useMemo(() => {
    return tasks.map(task => ({ ...task, id: task._id }));
  }, [tasks]);

  const handleAddTask = async (text: string) => {
    try {
      const newTask = await createTask(text);
      setTasks(prevTasks => [{ ...newTask }, ...prevTasks]);
      toast.success('Task CREATED successfully! 👍');
      confetti({ particleCount: 200, spread: 120, origin: { y: 1 } });
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to create task.');
    }
  };

  const handleUpdateTask = async (id: string, updatedFields: Partial<TaskProps>) => {
    try {
      const updatedTask = await updateTask(id, updatedFields);
      setTasks(prevTasks => {
        const newTasks = prevTasks.map(task =>
          task._id === id ? { ...updatedTask, id: updatedTask._id } : task,
        );
        return newTasks;
      });
      toast.success('Task UPDATED successfully! ✨');
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      toast.error('Task DELETED successfully! 🚮');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  return {
    tasks: tasksWithId,
    isLoading,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};
