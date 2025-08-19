import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';

const SortableColumn = ({ column, onCardAdd }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: `col-${column.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="column"
      {...attributes}
      {...listeners}
    >
      <div className="column-header">
        <h3>{column.title}</h3>
        <button
          className="add-card-btn"
          onClick={() => onCardAdd(column)}
        >
          +
        </button>
      </div>
      <SortableContext
        items={column.cards.map((card) => `card-${card.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="card-list">
          {column.cards.map((card) => (
            <SortableCard key={card.id} card={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableColumn;
