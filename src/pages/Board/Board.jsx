// KanbanBoard.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.css';
import { boardData as initialData } from '../../data';
import AddCardModal from "../../components/AddCardModal/AddCardModal.jsx";

const Board = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [activeColumn, setActiveColumn] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'COLUMN') {
      const columns = Array.from(boardData.columns);
      const [moved] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, moved);
      setBoardData({ ...boardData, columns });
    } else {
      const columns = [...boardData.columns];
      const sourceCol = columns.find((col) => col.id === parseInt(source.droppableId));
      const destCol = columns.find((col) => col.id === parseInt(destination.droppableId));
      const sourceCards = [...sourceCol.cards];
      const destCards = [...destCol.cards];

      const [movedCard] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, movedCard);

      const newColumns = columns.map((col) => {
        if (col.id === sourceCol.id) return { ...col, cards: sourceCards };
        if (col.id === destCol.id) return { ...col, cards: destCards };
        return col;
      });

      setBoardData({ ...boardData, columns: newColumns });
    }
  };

  const handleCardAdd = (title, detail) => {
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="board-columns"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boardData.columns.map((column, colIndex) => (
                <Draggable
                  key={column.id}
                  draggableId={`col-${column.id}`}
                  index={colIndex}
                >
                  {(provided) => (
                    <div
                      className="column"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="column-header" {...provided.dragHandleProps}>
                        <h3>{column.title}</h3>
                        <button
                          className="add-card-btn"
                          onClick={() => {
                            setActiveColumn(column);
                            setModalVisible(true);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <Droppable droppableId={String(column.id)} type="CARD">
                        {(provided) => (
                          <div
                            className="card-list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {column.cards.map((card, cardIndex) => (
                              <Draggable
                                key={card.id}
                                draggableId={`card-${card.id}`}
                                index={cardIndex}
                              >
                                {(provided) => (
                                  <div
                                    className="card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <h4>{card.title}</h4>
                                    <p>{card.description}</p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddCardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleCardAdd={handleCardAdd}
      />
    </div>
  );
};

export default Board;
