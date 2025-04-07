// src/utils/dataHandlers.js

export const handleDownloadBoard = (data) => {
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'курс.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const handleLoadBoard = (event, setData) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let loadedData = JSON.parse(e.target.result);

        // Преобразуем все id в строки
        loadedData = {
          ...loadedData,
          lists: loadedData.lists.map(list => ({
            ...list,
            id: String(list.id),
            cards: list.cards.map(card => ({
              ...card,
              id: String(card.id)
            }))
          }))
        };
        setData(loadedData);
      } catch (error) {
        console.error("Ошибка при разборе JSON:", error);
        alert("Не удалось загрузить доску. Неверный формат файла.");
      }
    };
    reader.readAsText(file);
  }
};

export const handleDeleteBoard = (setData) => {
  setData({ lists: [] });
};