import { ClipboardList } from 'lucide-react';
import { TaskProps } from '../types/types';

const TaskProgress = ({ tasks }: { tasks: TaskProps[] }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6 text-gray-500">
      <span className="text-xl">
        <ClipboardList size={32} />
      </span>
      <span className="text-3xl">
        {tasks.filter(task => task.isDone).length}/{tasks.length} 💪🏻
      </span>
    </div>
  );
};

export default TaskProgress;
