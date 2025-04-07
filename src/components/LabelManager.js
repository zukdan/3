// src/components/LabelManager.js
import React, { useState, useCallback } from 'react';
import { LabelManagerContainer, LabelList, LabelItem, AddLabelButton, LabelInput } from './LabelManager.styles';
import styled from 'styled-components';

const DeleteLabelButton = styled.button`
  /* Стили для кнопки удаления метки */
  background-color: #c0392b;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 2px 5px;
  cursor: pointer;
  margin-left: 5px;
  font-size: 0.8em;
`;

function LabelManager({ data, setData, selectedCard, setSelectedCard }) {
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#ccc');

  const handleAddLabel = useCallback(() => {
    if (!selectedCard) return; // Проверяем, выбрана ли карточка

    // Логика добавления новой метки в состояние data
    const newLabel = {
      id: Math.random().toString(36).substring(7), // Генерация случайного ID
      name: newLabelName,
      color: newLabelColor,
    };

    setData(prevData => ({
      ...prevData,
      labels: [...(prevData.labels || []), newLabel],
    }));
    setNewLabelName('');
    setNewLabelColor('#ccc');
  }, [newLabelName, newLabelColor, setData, selectedCard]); // Добавляем selectedCard в зависимости

  const handleAssignLabel = useCallback((labelId) => {
    if (!selectedCard) return;

    // Логика привязки метки к выбранной карточке
    setData(prevData => {
      const updatedLists = prevData.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => {
          if (card.id === selectedCard.id) {
            const newLabels = card.labels ? [...card.labels, labelId] : [labelId];
            return { ...card, labels: newLabels };
          }
          return card;
        }),
      }));
      return { ...prevData, lists: updatedLists };
    });

  }, [selectedCard, setData]);

  const handleUnassignLabel = useCallback((labelId) => {
    if (!selectedCard) return;

    // Логика отвязки метки от выбранной карточки
    setData(prevData => {
      const updatedLists = prevData.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => {
          if (card.id === selectedCard.id) {
            const newLabels = card.labels ? card.labels.filter(id => id !== labelId) : [];
            return { ...card, labels: newLabels };
          }
          return card;
        }),
      }));
      return { ...prevData, lists: updatedLists };
    });
  }, [selectedCard, setData]);

  const isLabelAssigned = useCallback((labelId) => {
    return selectedCard && selectedCard.labels && selectedCard.labels.includes(labelId);
  }, [selectedCard]);

  const handleDeleteLabel = useCallback((labelId) => {
    setData(prevData => ({
      ...prevData,
      labels: prevData.labels.filter(label => label.id !== labelId),
      lists: prevData.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => ({
          ...card,
          labels: card.labels ? card.labels.filter(id => id !== labelId) : [],
        })),
      })),
    }));
  }, [setData]);

  return (
    <LabelManagerContainer>
      <h3>Управление метками</h3>
      <div>
        <LabelInput
          type="text"
          placeholder="Название метки"
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
        />
        <input
          type="color"
          value={newLabelColor}
          onChange={(e) => setNewLabelColor(e.target.value)}
        />
        <AddLabelButton onClick={handleAddLabel} disabled={!selectedCard}>Добавить метку</AddLabelButton>
      </div>
      <LabelList>
        {data.labels && data.labels.map((label) => (
          <LabelItem
            key={label.id}
            color={label.color}
            onClick={() => {
              isLabelAssigned(label.id) ? handleUnassignLabel(label.id) : handleAssignLabel(label.id)
            }}
            assigned={isLabelAssigned(label.id)}
            disabled={!selectedCard}
          >
            {label.name}
            <DeleteLabelButton onClick={(e) => {
              e.stopPropagation(); // Предотвращаем вызов handleAssignLabel
              handleDeleteLabel(label.id);
            }}>
              X
            </DeleteLabelButton>
          </LabelItem>
        ))}
      </LabelList>
    </LabelManagerContainer>
  );
}

export default LabelManager;