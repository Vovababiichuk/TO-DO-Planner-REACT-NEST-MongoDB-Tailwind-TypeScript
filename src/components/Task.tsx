import clsx from 'clsx';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { DeleteIcon, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TaskProps } from '../types/types';

type TaskComponentProps = TaskProps & {
  onUpdateTask: (id: string, updatedFields: Partial<TaskProps>) => void;
  onDelete: (id: string) => void;
  onShowToast: (message: string) => void;
};

const Task = ({
  text,
  isDone,
  id,
  onUpdateTask,
  onDelete,
  onShowToast,
  createdDate,
  updatedDate,
}: TaskComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editedText.trim()) {
      toast.error('Field cannot be empty! 🛑');
      return;
    }

    onUpdateTask(id, {
      text: editedText,
    });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleCheckboxChange = () => {
    onUpdateTask(id, { isDone: !isDone });
    onShowToast(
      !isDone ? 'Great work! Keep it going 🔥' : 'Task is back! Keep pushing forward! 🚀',
    );
  };

  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'd MMMM yyyy, HH:mm', { locale: enUS });
  };

  return (
    <>
      <li
        className={clsx('flex justify-between items-center py-2 px-4 rounded-[10px] bg-bgTask', {
          'text-lime-400': !isDone,
          'line-through text-gray-700 bg-bgTask/30': isDone,
        })}
      >
        <div className="flex items-center gap-2">
          <input
            title="Checkbox"
            className="w-4 h-4"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isDone}
          />
          {isEditing ? (
            <input
              title="Edit"
              className="w-full p-1 border rounded"
              type="text"
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className="break-all px-1">{text}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEditTask}
            title="Edit"
            className="bg-transparent border-none outline-none p-0"
          >
            {!isDone && (
              <Edit className="text-gray-500 hover:text-accent transition-all duration-200 ease-in" />
            )}
          </button>
          <button
            className="bg-transparent border-none outline-none p-0"
            title="Delete"
            onClick={() => {
              onDelete(id);
            }}
          >
            <DeleteIcon
              size={28}
              className="text-gray-500 hover:text-red-500 transition-all duration-200 ease-in"
            />
          </button>
        </div>
      </li>
      {!isDone && (
        <div className="flex flex-col items-center sm:flex-row sm:justify-between text-xs text-gray-500 -mt-3 pl-2 pr-2">
          <span>Created: {formatDate(createdDate)}</span>
          {createdDate !== updatedDate && <span>Updated: {formatDate(updatedDate)}</span>}
        </div>
      )}
    </>
  );
};

export default Task;
