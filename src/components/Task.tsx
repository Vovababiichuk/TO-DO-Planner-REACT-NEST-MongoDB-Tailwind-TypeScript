import { useState } from 'react';
import { DeleteIcon, Edit } from 'lucide-react';
import { TaskProps } from '../Interfaces/interfaces';
import clsx from 'clsx';

const Task = ({ text, done, _id, onToggleDone, onDelete, onShowToast, onUpdate }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedText !== text) {
      onUpdate(_id, editedText);
    }
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    const newDoneState = !done;
    onToggleDone(_id, newDoneState);

    if (newDoneState) {
      onShowToast('Great work! Keep it going 🔥');
    } else {
      onShowToast('Task is back! Keep pushing forward! 🚀');
    }
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
            autoFocus
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleEditTask}
          title="Edit"
          className="bg-transparent border-none outline-none p-0"
        >
          {done === false && (
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
