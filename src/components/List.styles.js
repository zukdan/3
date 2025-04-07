// src/components/List.styles.js
import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;

export const ListTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

export const ListTitleInput = styled.input`
  font-weight: 600;
  font-size: 1.1em;
  border: none;
  background-color: transparent;
  width: 80%;
  &:focus {
    outline: none;
    background-color: #fff; /* Подсветка при редактировании */
  }
`;

export const AddCardButton = styled.button`
  background-color: #5aac44;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  cursor: pointer;
  margin-top: 8px;
`;

export const DeleteListButton = styled.button`
  background-color: #c0392b;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 8px;
  cursor: pointer;
  margin-left: 8px;
`;