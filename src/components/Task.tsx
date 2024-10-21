import clsx from 'clsx';
import { DeleteIcon, Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TaskInterface } from '../types/types';

type TaskProps = TaskInterface & {
  onUpdateTask: (_id: string, updatedFields: Partial<TaskInterface>) => void;
  onDelete: (_id: string) => void;
  onShowToast: (message: string) => void;
};

const Task = ({ text, done, _id, onUpdateTask, onDelete, onShowToast }: TaskProps) => {
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

    onUpdateTask(_id, { text: editedText });
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    }
  };

  const handleCheckboxChange = () => {
    onUpdateTask(_id, { done: !done });
    onShowToast(!done ? 'Great work! Keep it going 🔥' : 'Task is back! Keep pushing forward! 🚀');
  };

  return (
    <li
      className={clsx('flex justify-between items-center py-2 px-4 rounded-[10px] bg-bgTask', {
        'text-lime-400': !done,
        'line-through text-gray-700 bg-bgTask/30': done,
      })}
    >
      <div className="flex items-center gap-2">
        <input
          title="Checkbox"
          className="w-4 h-4"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={done}
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
          {!done && (
            <Edit className="text-gray-500 hover:text-accent transition-all duration-200 ease-in" />
          )}
        </button>
        <button
          className="bg-transparent border-none outline-none p-0"
          title="Delete"
          onClick={() => {
            onDelete(_id);
          }}
        >
          <DeleteIcon
            size={28}
            className="text-gray-500 hover:text-red-500 transition-all duration-200 ease-in"
          />
        </button>
      </div>
    </li>
  );
};

export default Task;
