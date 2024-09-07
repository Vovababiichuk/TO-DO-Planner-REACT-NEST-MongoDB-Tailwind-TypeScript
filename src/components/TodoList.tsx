import TaskStatus from './TaskStatus';
import CreateTaskInput from './CreateTaskInput';
import TasksList from './TasksList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTasks } from '../custom-hooks/useTasks';
import { useRef } from 'react';

const TodoList = () => {
  const { tasks, addTask, toggleTaskDone, deleteTask, updateTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedTasks = [...tasks].sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  const showToast = (message: string) => {
    toast.success(message);
  };

  const focusOnInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="pt-10 mx-auto text-center max-w-[500px]">
      <h1 className="mb-6 text-4xl">To-Do Planner</h1>
      <TaskStatus tasks={tasks} />
      <CreateTaskInput onCreate={addTask} ref={inputRef} />
      <TasksList
        tasks={sortedTasks}
        onToggleDone={toggleTaskDone}
        onDelete={deleteTask}
        onUpdate={updateTask}
        onShowToast={showToast}
        onFilePlusClick={focusOnInput}
      />
      <ToastContainer />
    </div>
  );
};

export default TodoList;
