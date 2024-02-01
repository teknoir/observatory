import { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';

interface Props {
  id: string | number;
  children: ReactNode;
  isDragging?: boolean;
  className?: string;
}

const SortableItem = ({ id, className = '', children }: Props) => {
  const { attributes, listeners, setNodeRef, transition } = useSortable({ id });

  const style = {
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
