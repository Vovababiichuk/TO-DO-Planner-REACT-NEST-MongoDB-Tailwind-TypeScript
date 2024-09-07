import { FilePlus } from 'lucide-react';
import { TasksListProps } from '../Interfaces/interfaces';
import Task from './Task';

const TasksList = ({
  tasks,
  onToggleDone,
  onDelete,
  onShowToast,
  onUpdate,
  onFilePlusClick,
}: TasksListProps) => {
  return (
    <ul className="flex flex-col gap-4 text-left pt-4 text-xl">
      {tasks.length === 0 && (
        <li className="flex flex-col items-center justify-center gap-2 text-gray-600 pt-16">
          <FilePlus
            onClick={onFilePlusClick}
            size={45}
            className="mr-2 cursor-pointer hover:text-gray-500 transition-all duration-300"
          />
          Create your first task
        </li>
      )}
      {tasks.map(task => (
        <Task
          key={task._id}
          {...task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onShowToast={onShowToast}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TasksList;
