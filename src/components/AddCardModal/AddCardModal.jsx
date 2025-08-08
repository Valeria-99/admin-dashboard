import React, { useState } from 'react';
import './AddCardModal.css';

const AddCardModal = ({ visible, onClose, handleCardAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!visible) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      handleCardAdd(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h3>Добавить новую задачу</h3>
          <input
            type="text"
            placeholder="Название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Описание задачи"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="modal-buttons">
            <button type="submit">Добавить</button>
            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
