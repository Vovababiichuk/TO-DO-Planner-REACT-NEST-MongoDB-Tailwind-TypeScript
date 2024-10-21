import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createTask, deleteTask, getTasks, updateTask } from '../gateway';
import { TaskInterface } from '../types/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getTasks();
        setTasks(sortTasks(data));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        toast.error('Failed to load tasks. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const sortTasks = (tasks: TaskInterface[]) =>
    tasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  const handleAddTask = async (text: string) => {
    try {
      const newTask = await createTask(text);
      setTasks(prevTasks => [{ text, done: false, _id: newTask._id }, ...prevTasks]);
      toast.success('Task CREATED successfully! 👍');
      confetti({ particleCount: 200, spread: 120, origin: { y: 1 } });
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to create task.');
    }
  };

  const handleUpdateTask = async (_id: string, updatedFields: Partial<TaskInterface>) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === _id);
      if (taskToUpdate) {
        const updatedTask = await updateTask(_id, { ...taskToUpdate, ...updatedFields });
        setTasks(prevTasks =>
          sortTasks(prevTasks.map(task => (task._id === _id ? updatedTask : task))),
        );
        toast.success('Task UPDATED successfully! ✨');
      }
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await deleteTask(_id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
      toast.error('Task DELETED successfully! 🚮');
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast.error('Failed to delete task');
    }
  };

  return {
    tasks,
    isLoading,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};
