// src/components/Card.styles.js
import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
`;

export const CardText = styled.p`
  margin-bottom: 5px;
`;

export const CardDescription = styled.textarea`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
`;

export const DeleteCardButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 8px;
  cursor: pointer;
  margin-top: 5px;
`;

export const LabelsContainer = styled.div`
  /* Стили для контейнера меток */
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export const Label = styled.span`
  /* Стили для отдельной метки */
  background-color: ${props => props.color || '#ccc'};
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  font-size: 0.8em;
`;