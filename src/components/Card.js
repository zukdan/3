import React, { useState, useCallback } from 'react';
import { CardContainer, CardText, CardDescription, DeleteCardButton } from './Card.styles';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

const LabelsContainer = styled.div`
  /* Стили для контейнера меток */
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Label = styled.span`
  /* Стили для отдельной метки */
  background-color: ${props => props.color || '#ccc'};
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  font-size: 0.8em;
  display: flex; /* Добавляем flex для выравнивания элементов */
  align-items: center; /* Выравниваем элементы по вертикали */
`;

const DeleteLabelButton = styled.button`
  /* Стили для кнопки удаления метки */
  background-color: #c0392b;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0px 3px;
  cursor: pointer;
  margin-left: 3px;
  font-size: 0.7em;
  display: flex; /* flex to align items */
  align-items: center;
  text-align: center;
`;

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 5px;
  font-size: 1.2em;
  color: #888;

  &:hover {
    color: #555;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Card({ card, listId, onTextChange, onDescriptionChange, onDeleteCard, setSelectedCard, data, moveCard, prevListId, nextListId, moveCardTop, moveCardBottom, onUnassignLabel }) {
  const [text, setText] = useState(card.text);
  const [description, setDescription] = useState(card.description);
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleTextBlur = useCallback(() => {
    setIsEditingText(false);
    onTextChange(listId, card.id, text);
  }, [card.id, listId, text, onTextChange]);

  const handleDescriptionBlur = useCallback(() => {
    setIsEditingDescription(false);
    onDescriptionChange(listId, card.id, description);
  }, [card.id, listId, description, onDescriptionChange]);

  const handleTextClick = useCallback(() => {
    setIsEditingText(true);
  }, []);

  const handleDescriptionClick = useCallback(() => {
    setIsEditingDescription(true);
  }, []);

  const handleCheckboxChange = useCallback((e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    setSelectedCard(checked ? card : null); // Обновляем selectedCard только при изменении чекбокса
  }, [card, setSelectedCard]);

  return (
    <CardContainer>
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label>Изменить метки</label>
      </CheckboxContainer>
      {isEditingText ? (
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          autoFocus
        />
      ) : (
        <CardText onClick={handleTextClick}>
          {text}
        </CardText>
      )}
      {isEditingDescription ? (
        <CardDescription
          value={description}
          onChange={handleDescriptionChange}
          onBlur={handleDescriptionBlur}
        />
      ) : (
        <CardText onClick={handleDescriptionClick}>
          {description}
        </CardText>
      )}
      <LabelsContainer>
        {card.labels && card.labels.map(labelId => {
          const label = data.labels.find(l => l.id === labelId);
          return label ? (
            <Label key={label.id} color={label.color}>
              {label.name}
              <DeleteLabelButton
                onClick={(e) => {
                  e.stopPropagation(); // Предотвращаем выделение карточки
                  onUnassignLabel(listId, card.id, labelId);
                }}
              >
                X
              </DeleteLabelButton>
            </Label>
          ) : null;
        })}
      </LabelsContainer>
      <ArrowButton
        onClick={() => moveCard(card.id, listId, null, prevListId)}
        disabled={!prevListId}
      >
        &#9664;
      </ArrowButton>
      <ArrowButton
        onClick={() => moveCard(card.id, listId, null, nextListId)}
        disabled={!nextListId}
      >
        &#9654;
      </ArrowButton>
          <ArrowButton onClick={() => moveCard(card.id, listId, null, listId, 'up')}
              disabled={false}>&#9650;</ArrowButton>
          <ArrowButton onClick={() => moveCard(card.id, listId, null, listId, 'down')}
              disabled={false}>&#9660;</ArrowButton>
      <DeleteCardButton onClick={() => onDeleteCard(listId, card.id)}>Удалить карточку</DeleteCardButton>
    </CardContainer>
  );
}

export default Card;