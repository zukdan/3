import React from 'react';
import List from './List';
import { BoardContainer } from './Board.styles';

function Board({ data, setData, onCardTextChange, onCardDescriptionChange, onAddCard, onListTitleChange, onDeleteList, onDeleteCard, setSelectedCard, moveCard, moveCardTop, moveCardBottom, onUnassignLabel }) {

  return (
    <BoardContainer>
      {data.lists.map((list, index) => {
        const prevListId = index > 0 ? data.lists[index - 1].id : null;
        const nextListId = index < data.lists.length - 1 ? data.lists[index + 1].id : null;

        return (
          <List
            key={list.id}
            list={list}
            onCardTextChange={onCardTextChange}
            onCardDescriptionChange={onCardDescriptionChange}
            onAddCard={onAddCard}
            onListTitleChange={onListTitleChange}
            onDeleteList={onDeleteList}
            onDeleteCard={onDeleteCard}
            setSelectedCard={setSelectedCard}
            data={data}
            moveCard={moveCard} // передаем moveCard в List
            moveCardTop={moveCardTop}
            moveCardBottom={moveCardBottom}
             prevListId={prevListId}
              nextListId={nextListId}
           onUnassignLabel={onUnassignLabel}
          />
        );
      })}
    </BoardContainer>
  );
}

export default Board;