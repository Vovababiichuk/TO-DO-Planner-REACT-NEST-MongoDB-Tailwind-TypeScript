import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { TaskProps } from '../types/types';

export const sortTasks = (tasks: TaskProps[]) => {
  return tasks.sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return Number(a.isDone) - Number(b.isDone);
    }
    if (!a.isDone) {
      return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    }
    return 0;
  });
};

export const formatDate = (date: Date | string) => {
  return format(new Date(date), 'd MMMM yyyy, HH:mm', { locale: enUS });
};
