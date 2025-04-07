// src/utils/listHandlers.js
import { v4 as uuidv4 } from 'uuid';

export const handleAddList = (data, setData) => {
  const newList = {
    id: uuidv4(),
    title: 'семестр',
    cards: [],
  };
  setData({ ...data, lists: [...data.lists, newList] });
};

export const handleDeleteList = (listId, data, setData) => {
  const newData = {
    ...data,
    lists: data.lists.filter(list => list.id !== listId),
  };
  setData(newData);
};

export const handleListTitleChange = (listId, newTitle, data, setData) => {
    const newData = {
        ...data,
        lists: data.lists.map(list => {
            if (list.id === listId) {
                return { ...list, title: newTitle };
            }
            return list;
        }),
    };
    setData(newData);
};