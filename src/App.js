// src/App.js
import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import styled from 'styled-components';
import { handleAddList, handleDeleteList, handleListTitleChange } from './utils/listHandlers';
import { handleAddCard, handleDeleteCard, handleCardTextChange, handleCardDescriptionChange } from './utils/cardHandlers';
import { handleDownloadBoard, handleLoadBoard, handleDeleteBoard } from './utils/dataHandlers';
import { AppContainer, FileInput, ButtonContainer, LoadButton, CommonButton, BoardScrollContainer } from './App.styles'; // Import styles
import LabelManager from './components/LabelManager';

const TopSectionContainer = styled.div`
  /* Стили для контейнера верхней секции */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Выравнивание по левому краю */
  margin-bottom: 20px; /* Отступ снизу */
`;

function App() {
  const [data, setData] = useState({
    lists: [
      { id: '1', title: '1 семестр', cards: [{ id: '1', text: '1 предмет', description: 'Описание' }] },
      { id: '2', title: '2 семестр', cards: [{ id: '2', text: '1 предмет', description: 'Описание ' }] },
      { id: '3', title: '3 семестр', cards: [{ id: '3', text: '1 предмет', description: 'Описание ' },] },
      { id: '4', title: '4 семестр', cards: [{ id: '4', text: '1 предмет', description: 'Описание' },] },
      { id: '5', title: '5 семестр', cards: [{ id: '5', text: '1 предмет', description: 'Описание' },] },
      { id: '6', title: '6 семестр', cards: [{ id: '6', text: '1 предмет', description: 'Описание' },] },
      { id: '7', title: '7 семестр', cards: [{ id: '7', text: '1 предмет', description: 'Описание' },] },
      { id: '8', title: '8 семестр', cards: [{ id: '8', text: '1 предмет', description: 'Описание' },] },
    ],
    labels: [],
  });

  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddListClick = useCallback(() => {
    handleAddList(data, setData);
  }, [data, setData]);

  const handleDeleteListClick = useCallback((listId) => {
    handleDeleteList(listId, data, setData);
  }, [data, setData]);

  const handleListTitleChangeClick = useCallback((listId, newTitle) => {
    handleListTitleChange(listId, newTitle, data, setData);
  }, [data, setData]);

  const handleAddCardClick = useCallback((listId) => {
    handleAddCard(listId, data, setData);
  }, [data, setData]);

  const handleDeleteCardClick = useCallback((listId, cardId) => {
    handleDeleteCard(listId, cardId, data, setData);
  }, [data, setData]);

  const handleCardTextChangeClick = useCallback((listId, cardId, newText) => {
    handleCardTextChange(listId, cardId, newText, data, setData);
  }, [data, setData]);

  const handleCardDescriptionChangeClick = useCallback((listId, cardId, newDescription) => {
    handleCardDescriptionChange(listId, cardId, newDescription, data, setData);
  }, [data, setData]);

  const handleDownloadBoardClick = () => {
    handleDownloadBoard(data);
  };

  const handleLoadBoardChange = useCallback((event) => {
    handleLoadBoard(event, setData);
  }, [setData]);

  const handleDeleteBoardClick = () => {
    handleDeleteBoard(setData);
  };
 const moveCard = useCallback((draggedCardId, sourceListId, targetCardId, targetListId, direction) => {
        setData(prevData => {
            const sourceList = prevData.lists.find(list => list.id === sourceListId);
            const draggedCard = sourceList.cards.find(card => card.id === draggedCardId);
            const cardIndex = sourceList.cards.findIndex(card => card.id === draggedCardId);
            // Remove card from source list
            const updatedSourceList = {
                ...sourceList,
                cards: sourceList.cards.filter(card => card.id !== draggedCardId),
            };
            // Find target list
            const targetList = prevData.lists.find(list => list.id === targetListId);
            let newIndex;
            let updatedTargetList;
            if (direction === "up" || direction === "down") {
                // Move within the same list
                if (targetListId === sourceListId) { //move within the same List
                    newIndex = (direction === 'up') ? Math.max(0, cardIndex - 1) : Math.min(sourceList.cards.length - 1, cardIndex + 1);
                    // If the card doesn't move, return previous data
                    if (newIndex === cardIndex) {
                        return prevData;
                    }
                    updatedTargetList = {
                        ...sourceList,
                        cards: [
                            draggedCard
                        ],
                    };
                }
                else {
                    targetCardIndex = targetList.cards.findIndex(card => card.id === targetCardId);
                    updatedTargetList = {
                        ...targetList,
                        cards: [
                            ...targetList.cards.slice(0, targetCardIndex),
                            draggedCard,
                            ...targetList.cards.slice(targetCardIndex),
                        ],
                    };
                }
            }
            else {
                updatedTargetList = {
                    ...targetList,
                    cards: [
                        ...targetList.cards,
                        draggedCard,
                    ],
                };
            }
            return {
                ...prevData,
                lists: prevData.lists.map(list => {
                    if (list.id === sourceListId) {
                        return updatedSourceList;
                    } else if (list.id === targetListId) {
                        return updatedTargetList;
                    } else {
                        return list;
                    }
                }),
            };
        });
    }, [setData]);
      const moveCardTop = useCallback((draggedCardId, sourceListId) => {
          setData(prevData => {
              const sourceList = prevData.lists.find(list => list.id === sourceListId);
              const draggedCard = sourceList.cards.find(card => card.id === draggedCardId);
              const cardIndex = sourceList.cards.findIndex(card => card.id === draggedCardId);

              if (cardIndex <= 0) {
                  return prevData;
              }

              const updatedSourceList = {
                  ...sourceList,
                  cards: [...sourceList.cards.slice(0, cardIndex), ...sourceList.cards.slice(cardIndex + 1)]
              };

              const newIndex = 0
              const updatedTargetList = {
                  ...sourceList,
                  cards: [
                      ...sourceList.cards.slice(0, newIndex),
                      draggedCard,
                      ...sourceList.cards.slice(newIndex),
                  ],
              };


              return {
                  ...prevData,
                  lists: prevData.lists.map(list => {
                      if (list.id === sourceListId) {
                          return updatedTargetList;
                      } else {
                          return list;
                      }
                  }),
              };
          });
      }, [setData]);

      const moveCardBottom = useCallback((draggedCardId, sourceListId) => {
          setData(prevData => {
              const sourceList = prevData.lists.find(list => list.id === sourceListId);
              const draggedCard = sourceList.cards.find(card => card.id === draggedCardId);
              const cardIndex = sourceList.cards.findIndex(card => card.id === draggedCardId);
              if (cardIndex == sourceList.cards.length - 1) {
                  return prevData;
              }

              const updatedSourceList = {
                  ...sourceList,
                  cards: [...sourceList.cards.slice(0, cardIndex), ...sourceList.cards.slice(cardIndex + 1)]
              };

              const newIndex = sourceList.cards.length - 1;
              const updatedTargetList = {
                  ...sourceList,
                  cards: [
                      ...sourceList.cards.slice(0, newIndex),
                      draggedCard,
                      ...sourceList.cards.slice(newIndex),
                  ],
              };
              return {
                  ...prevData,
                  lists: prevData.lists.map(list => {
                      if (list.id === sourceListId) {
                          return updatedTargetList;
                      } else {
                          return list;
                      }
                  }),
              };
          });
      }, [setData]);
    const handleUnassignLabel = useCallback((listId, cardId, labelId) => {
        setData(prevData => {
            const updatedLists = prevData.lists.map(list => ({
                ...list,
                cards: list.cards.map(card => {
                    if (card.id === cardId) {
                        const newLabels = card.labels ? card.labels.filter(id => id !== labelId) : [];
                        return { ...card, labels: newLabels };
                    }
                    return card;
                }),
            }));
            return { ...prevData, lists: updatedLists };
        });
    }, [setData]);

  return (
    <AppContainer>
      <TopSectionContainer>
        <ButtonContainer>
          <button onClick={handleAddListClick}>Добавить семестр</button>
          <CommonButton onClick={handleDownloadBoardClick}>Скачать курс</CommonButton>
          <LoadButton htmlFor="fileInput">Загрузить курс</LoadButton>
          <FileInput
            type="file"
            id="fileInput"
            accept=".json"
            onChange={handleLoadBoardChange}
          />
          <CommonButton onClick={handleDeleteBoardClick}>Удалить курс</CommonButton>
        </ButtonContainer>
        <LabelManager
          data={data}
          setData={setData}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </TopSectionContainer>
      <BoardScrollContainer>
        <Board
          data={data}
          setData={setData}
          onCardTextChange={handleCardTextChangeClick}
          onCardDescriptionChange={handleCardDescriptionChangeClick}
          onAddCard={handleAddCardClick}
          onListTitleChange={handleListTitleChangeClick}
          onDeleteList={handleDeleteListClick}
          onDeleteCard={handleDeleteCardClick}
          setSelectedCard={setSelectedCard}
          moveCard={moveCard} // Pass moveCard to Board
          moveCardTop={moveCardTop}
          moveCardBottom={moveCardBottom}
              onUnassignLabel={handleUnassignLabel}
        />
      </BoardScrollContainer>
    </AppContainer>
  );
}

export default App;