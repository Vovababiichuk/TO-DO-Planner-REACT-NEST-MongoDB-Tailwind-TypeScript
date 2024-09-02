export interface TaskInterface {
  text: string;
  done: boolean;
  id: string;
}

export interface CreateTaskInputProps {
  onCreate: (text: string) => void;
}

export interface TaskProps extends TaskInterface {
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onShowToast: (message: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

export interface TasksListProps {
  tasks: TaskInterface[];
  onToggleDone: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
}
