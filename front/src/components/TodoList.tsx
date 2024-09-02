import { useState } from 'react';
import CreateTaskInput from './CreateTaskInput';
import TasksList from './TasksList';
import { TaskInterface } from '../Interfaces/interfaces';
import { ClipboardList } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';

const TodoList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([
    { text: 'Task 1', done: false, id: uuidv4() },
    { text: 'Task 2', done: false, id: uuidv4() },
    { text: 'Task 3', done: false, id: uuidv4() },
    { text: 'Task 4', done: true, id: uuidv4() },
    { text: 'Task 5', done: true, id: uuidv4() },
  ]);

  const addTask = (text: string) => {
    setTasks(prevTasks => [{ text, done: false, id: uuidv4() }, ...prevTasks]);
    toast.success('Task CREATED successfully! 👍');

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 1 }
    });
  };

  const toggleTaskDone = (id: string, done: boolean) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === id ? { ...task, done } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.error('Task DELETED successfully! 🚮');
  };

  const updateTask = (id: string, newText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, text: newText } : task))
    );
    toast.success('Task UPDATED successfully! ✨');
  };

  const showToast = (message: string) => {
    toast.success(message);
  };

  const sortedTasks = tasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  return (
    <div className="pt-10 mx-auto text-center max-w-[500px]">
      <h1 className="mb-3 text-4xl">To-Do Planner</h1>
      <div className="flex items-center justify-center gap-2 mb-4 text-gray-500">
        <span className="text-xl">
          <ClipboardList size={32} />
        </span>
        <span className="text-3xl">
          {tasks.filter(task => task.done).length}/{tasks.length} 💪🏻
        </span>
      </div>
      <CreateTaskInput onCreate={addTask} />
      <TasksList
        tasks={sortedTasks}
        onToggleDone={toggleTaskDone}
        onDelete={deleteTask}
        onShowToast={showToast}
        onUpdate={updateTask}
      />
      <ToastContainer />
    </div>
  );
};

export default TodoList;
