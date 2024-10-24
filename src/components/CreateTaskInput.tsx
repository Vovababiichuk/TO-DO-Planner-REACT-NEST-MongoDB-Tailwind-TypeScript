import { Plus } from 'lucide-react';
import { forwardRef, useState } from 'react';

type CreateTaskInputProps = {
  onCreate: (text: string) => void;
};

const CreateTaskInput = forwardRef<HTMLInputElement, CreateTaskInputProps>(({ onCreate }, ref) => {
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
        ref={ref}
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
});

export default CreateTaskInput;
