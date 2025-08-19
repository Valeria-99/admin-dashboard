// KanbanBoard.jsx
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import './Board.css';
import { boardData as initialData } from '../../data';
import AddCardModal from "../../components/AddCardModal/AddCardModal.jsx";
import SortableColumn from '../../components/SortableColumn';

const Board = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [activeColumn, setActiveColumn] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeId = active.id;
      const overId = over.id;

      // Check if it's a column drag
      if (activeId.startsWith('col-') && overId.startsWith('col-')) {
        const activeIndex = boardData.columns.findIndex(
          (col) => `col-${col.id}` === activeId
        );
        const overIndex = boardData.columns.findIndex(
          (col) => `col-${col.id}` === overId
        );

        if (activeIndex !== -1 && overIndex !== -1) {
          const newColumns = arrayMove(boardData.columns, activeIndex, overIndex);
          setBoardData({ ...boardData, columns: newColumns });
        }
      }
      // Check if it's a card drag
      else if (activeId.startsWith('card-') && overId.startsWith('card-')) {
        // Find the columns containing the cards
        const activeCardId = parseInt(activeId.replace('card-', ''));
        const overCardId = parseInt(overId.replace('card-', ''));

        const activeColumn = boardData.columns.find((col) =>
          col.cards.some((card) => card.id === activeCardId)
        );
        const overColumn = boardData.columns.find((col) =>
          col.cards.some((card) => card.id === overCardId)
        );

        if (activeColumn && overColumn) {
          const newColumns = boardData.columns.map((col) => {
            if (col.id === activeColumn.id) {
              const activeCardIndex = col.cards.findIndex((card) => card.id === activeCardId);
              const overCardIndex = col.cards.findIndex((card) => card.id === overCardId);
              
              if (activeCardIndex !== -1 && overCardIndex !== -1) {
                const newCards = arrayMove(col.cards, activeCardIndex, overCardIndex);
                return { ...col, cards: newCards };
              }
            }
            return col;
          });
          setBoardData({ ...boardData, columns: newColumns });
        }
      }
    }
  };

  const handleCardAdd = (column) => {
    setActiveColumn(column);
    setModalVisible(true);
  };

  const handleCardSubmit = (title, detail) => {
    const newCard = {
      id: new Date().getTime(),
      title,
      description: detail,
    };
    const updatedColumns = boardData.columns.map((col) => {
      if (col.id === activeColumn.id) {
        return { ...col, cards: [...col.cards, newCard] };
      }
      return col;
    });
    setBoardData({ ...boardData, columns: updatedColumns });
    setModalVisible(false);
  };

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boardData.columns.map((col) => `col-${col.id}`)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="board-columns">
            {boardData.columns.map((column) => (
              <SortableColumn
                key={column.id}
                column={column}
                onCardAdd={handleCardAdd}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleCardAdd={handleCardSubmit}
      />
    </div>
  );
};

export default Board;
