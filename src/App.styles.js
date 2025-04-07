// src/App.styles.js
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  overflow-x: auto;
  min-height: 100vh;
  background-color: #f4f5f7;
  padding: 20px;
`;

export const TopSectionContainer = styled.div`
  /* Стили для контейнера верхней секции */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Выравнивание по левому краю */
  margin-bottom: 20px; /* Отступ снизу */
`;

export const AddButtonContainer = styled.div`
  top: 10px;                  // Отступ сверху
  left: 10px;                 // Отступ слева
  z-index: 100;               // Убедитесь, что кнопка поверх других элементов
`;

export const AddButton = styled.button`
  background-color: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  cursor: pointer;
  /* Уменьшаем размер шрифта и отступы */
  font-size: 0.8rem;
  padding: 6px 10px;
`;

export const FileInput = styled.input`
  margin-left: 10px;
  display: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const LoadButton = styled.label`
  background-color: #2e86de;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
  display: inline-block;
`;

export const CommonButton = styled.button`
  background-color: #2e86de;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  margin-left: 10px;
  cursor: pointer;
`;

export const BoardScrollContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;