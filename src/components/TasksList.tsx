import { TasksListProps } from '../Interfaces/interfaces';
import EmptyTaskList from './EmptyTaskList';
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
      {tasks.length === 0 ? (
        <EmptyTaskList onFilePlusClick={onFilePlusClick} />
      ) : (
        tasks.map(task => (
          <Task
            key={task._id}
            {...task}
            onToggleDone={onToggleDone}
            onDelete={onDelete}
            onShowToast={onShowToast}
            onUpdate={onUpdate}
          />
        ))
      )}
    </ul>
  );
};

export default TasksList;
