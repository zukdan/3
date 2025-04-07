// src/components/LabelManager.styles.js
import styled from 'styled-components';

export const LabelManagerContainer = styled.div`
  /* Стили для контейнера LabelManager */
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const LabelList = styled.ul`
  /* Стили для списка меток */
  list-style: none;
  padding: 0;
`;

export const LabelItem = styled.li`
  /* Стили для элемента метки */
  background-color: ${props => props.color || '#ccc'};
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  opacity: ${props => (props.assigned ? 1 : 0.5)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

export const AddLabelButton = styled.button`
  /* Стили для кнопки добавления метки */
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
   &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const LabelInput = styled.input`
  /* Стили для поля ввода названия метки */
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 5px;
`;

export const DeleteLabelButton = styled.button`
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