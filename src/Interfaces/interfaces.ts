export interface TaskInterface {
  text: string;
  done: boolean;
  _id: string;
}

export interface CreateTaskInputProps {
  onCreate: (text: string) => void;
}

export interface TaskProps extends TaskInterface {
  onToggleDone: (_id: string, done: boolean) => void;
  onDelete: (_id: string) => void;
  onShowToast: (message: string) => void;
  onUpdate: (_id: string, newText: string) => void;
}

export interface TasksListProps {
  tasks: TaskInterface[];
  onToggleDone: (_id: string, done: boolean) => void;
  onDelete: (_id: string) => void;
  onShowToast: (message: string) => void;
  onUpdate: (_id: string, newText: string) => void;
  onFilePlusClick: () => void;
}
