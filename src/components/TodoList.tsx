import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTasks } from '../hooks/useTasks';
import { sortTasks } from '../utils/utils';
import CreateTaskInput from './CreateTaskInput';
import EmptyTaskList from './EmptyTaskList';
import Task from './Task';
import TaskProgress from './TaskProgress';

const TodoList = () => {
  const { tasks, isLoading, handleAddTask, handleDeleteTask, handleUpdateTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="pt-10 mx-auto text-center max-w-[500px]">
      <h1 className="mb-6 text-4xl">To-Do Planner</h1>
      <TaskProgress tasks={tasks} />
      <CreateTaskInput onCreate={handleAddTask} ref={inputRef} />
      {isLoading ? (
        <div className="text-gray-500 text-xl pt-12">Loading...</div>
      ) : (
        <>
          {tasks.length === 0 ? (
            <EmptyTaskList onFilePlusClick={focusOnInput} />
          ) : (
            <ul className="flex flex-col gap-4 text-left pt-4 text-xl">
              {sortTasks(tasks).map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onUpdateTask={handleUpdateTask}
                  onDelete={handleDeleteTask}
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
