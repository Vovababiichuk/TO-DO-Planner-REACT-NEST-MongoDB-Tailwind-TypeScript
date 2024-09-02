import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateTaskInputProps } from '../Interfaces/interfaces';

const CreateTaskInput = ({ onCreate }: CreateTaskInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTaskCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onCreate(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleTaskCreate}>
      <input
        className="py-2 px-4 rounded-[10px] border-2 border-bgTask w-full"
        type="text"
        placeholder="Create your task..."
        value={inputValue}
        onChange={handleTaskValue}
      />
      <button className="p-2 bg-bgTask" type="submit">
        <Plus />
        <span className="sr-only">Create task</span>
      </button>
    </form>
  );
};

export default CreateTaskInput;
