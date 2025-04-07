import React, { useState, useCallback } from 'react';
import Card from './Card';
import { ListContainer, ListTitleContainer, ListTitleInput, AddCardButton, DeleteListButton } from './List.styles';

function List({ list, onCardTextChange, onCardDescriptionChange, onAddCard, onListTitleChange, onDeleteList, onDeleteCard, setSelectedCard, data, moveCard, prevListId, nextListId, moveCardTop, moveCardBottom, onUnassignLabel }) {
    const [title, setTitle] = useState(list.title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const handleTitleChange = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const handleTitleBlur = useCallback(() => {
        setIsEditingTitle(false);
        onListTitleChange(list.id, title);
    }, [list.id, title, onListTitleChange]);

    const handleTitleClick = useCallback(() => {
        setIsEditingTitle(true);
    }, []);

    return (
        <ListContainer>
            <ListTitleContainer>
                {isEditingTitle ? (
                    <ListTitleInput
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        autoFocus
                    />
                ) : (
                    <h2 onClick={handleTitleClick}>
                        {title}
                    </h2>
                )}
                <DeleteListButton onClick={() => onDeleteList(list.id)}>Удалить семестр</DeleteListButton>
            </ListTitleContainer>
            <div>
                {list.cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        listId={list.id}
                        onTextChange={onCardTextChange}
                        onDescriptionChange={onCardDescriptionChange}
                        onDeleteCard={onDeleteCard}
                        setSelectedCard={setSelectedCard}
                        data={data} // Передаем data в Card
                        moveCard={moveCard}
                        prevListId={prevListId}
                        nextListId={nextListId}
                        moveCardTop={moveCardTop}
                        moveCardBottom={moveCardBottom}
                        onUnassignLabel={onUnassignLabel}
                    />
                ))}
            </div>
            <AddCardButton onClick={() => onAddCard(list.id)}>Добавить карточку</AddCardButton>
        </ListContainer>
    );
}

export default List;
