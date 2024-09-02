import { TaskInterface } from '../Interfaces/interfaces';
import Task from './Task';

interface TasksListProps {
  tasks: TaskInterface[];
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onShowToast: (message: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

const TasksList = ({ tasks, onToggleDone, onDelete, onShowToast, onUpdate }: TasksListProps) => {
  return (
    <ul className="flex flex-col gap-4 text-left pt-4 text-xl">
      {tasks.map(task => (
        <Task
          key={task.id}
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
