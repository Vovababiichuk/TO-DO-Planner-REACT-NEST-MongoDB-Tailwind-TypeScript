import { useState, useEffect } from 'react';
import { TaskInterface } from '../Interfaces/interfaces';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

const baseUrl = 'http://localhost:3000/tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(baseUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(error => console.error('Failed to fetch tasks:', error));
  };

  const addTask = (text: string) => {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, done: false }),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      res.json().then(data => {
        setTasks(prevTasks => [{ text, done: false, _id: data._id }, ...prevTasks]);
        toast.success('Task CREATED successfully! 👍');
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 1 },
        });
      });
    });
  };

  const toggleTaskDone = (_id: string, done: boolean) => {
    fetch(`${baseUrl}/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ done }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(updatedTask => {
        setTasks(prevTasks => prevTasks.map(task => (task._id === _id ? updatedTask : task)));
      })
      .catch(error => {
        console.error('Failed to update task status:', error);
        toast.error('Failed to update task status');
      });
  };

  const deleteTask = (_id: string) => {
    fetch(`${baseUrl}/${_id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        setTasks(prevTasks => prevTasks.filter(task => task._id !== _id));
        toast.error('Task DELETED successfully! 🚮');
      })
      .catch(error => {
        console.error('Failed to delete task:', error);
        toast.error('Failed to delete task');
      });
  };

  const updateTask = (_id: string, newText: string) => {
    fetch(`${baseUrl}/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newText }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(updatedTask => {
        setTasks(prevTasks => prevTasks.map(task => (task._id === _id ? updatedTask : task)));
        toast.success('Task UPDATED successfully! ✨');
      })
      .catch(error => {
        console.error('Failed to update task:', error);
        toast.error('Failed to update task');
      });
  };

  return {
    tasks,
    addTask,
    toggleTaskDone,
    deleteTask,
    updateTask,
  };
};
