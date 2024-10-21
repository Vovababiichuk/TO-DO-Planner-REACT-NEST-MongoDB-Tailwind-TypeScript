import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTasks } from '../hooks/useTasks';
import CreateTaskInput from './CreateTaskInput';
import EmptyTaskList from './EmptyTaskList';
import Task from './Task';
import TaskStatus from './TaskStatus';

const TodoList = () => {
  const { tasks, isLoading, handleAddTask, handleDeleteTask, handleUpdateTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

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
      <CreateTaskInput onCreate={handleAddTask} ref={inputRef} />
      {isLoading && <div className="text-gray-500 text-xl pt-12">Loading...</div>}
      {!isLoading && (
        <>
          {tasks.length === 0 ? (
            <EmptyTaskList onFilePlusClick={focusOnInput} />
          ) : (
            <ul className="flex flex-col gap-4 text-left pt-4 text-xl">
              {tasks.map(task => (
                <Task
                  key={task._id}
                  {...task}
                  onUpdateTask={handleUpdateTask}
                  onDelete={handleDeleteTask}
                  onShowToast={showToast}
                />
              ))}
            </ul>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default TodoList;
