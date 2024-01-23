import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styleVariables from 'enums/styleVariables.module.scss';

interface Props {
  id: string | number;
  children: ReactNode;
  isDragging?: boolean;
  className?: string;
}

const SortableItem = ({ id, isDragging, className = '', children }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    border: isDragging ? `6px solid ${styleVariables.offWhite}` : '',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={className}
    >
      {children}
    </div>
  );
};

export default SortableItem;
