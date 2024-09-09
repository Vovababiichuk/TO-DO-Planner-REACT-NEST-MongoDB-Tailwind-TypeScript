import { FilePlus } from 'lucide-react';

const EmptyTaskList = ({ onFilePlusClick }: { onFilePlusClick: () => void }) => (
  <li className="flex flex-col items-center justify-center gap-2 text-gray-600 pt-16">
    <FilePlus
      onClick={onFilePlusClick}
      size={45}
      className="mr-2 cursor-pointer hover:text-gray-500 transition-all duration-300"
    />
    Create your first task
  </li>
);

export default EmptyTaskList;
