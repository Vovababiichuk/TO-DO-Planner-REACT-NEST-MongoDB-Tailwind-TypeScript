import { ClipboardList } from 'lucide-react';
import { TaskInterface } from '../types/types';

const TaskStatus = ({ tasks }: { tasks: TaskInterface[] }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6 text-gray-500">
      <span className="text-xl">
        <ClipboardList size={32} />
      </span>
      <span className="text-3xl">
        {tasks.filter(task => task.done).length}/{tasks.length} 💪🏻
      </span>
    </div>
  );
};

export default TaskStatus;
