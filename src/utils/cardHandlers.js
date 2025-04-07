// src/utils/cardHandlers.js
import { v4 as uuidv4 } from 'uuid';

export const handleAddCard = (listId, data, setData) => {
  const newCard = {
    id: uuidv4(),
    text: 'предмет',
    description: 'Описание',
  };
  const newData = {
    ...data,
    lists: data.lists.map(list => {
      if (list.id === listId) {
        return { ...list, cards: [...list.cards, newCard] };
      }
      return list;
    }),
  };
  setData(newData);
};

export const handleDeleteCard = (listId, cardId, data, setData) => {
  const newData = {
    ...data,
    lists: data.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId),
        };
      }
      return list;
    }),
  };
  setData(newData);
};

export const handleCardTextChange = (listId, cardId, newText, data, setData) => {
  const newData = {
    ...data,
    lists: data.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card => {
            if (card.id === cardId) {
              return { ...card, text: newText };
            }
            return card;
          }),
        };
      }
      return list;
    }),
  };
  setData(newData);
};

export const handleCardDescriptionChange = (listId, cardId, newDescription, data, setData) => {
  const newData = {
    ...data,
    lists: data.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card => {
            if (card.id === cardId) {
              return { ...card, description: newDescription };
            }
            return card;
          }),
        };
      }
      return list;
    }),
  };
  setData(newData);
};