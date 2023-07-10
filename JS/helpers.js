const rows = 6;
const columns = 5;
const gridContainer = document.getElementById("container");
let currentRow = 0;
let currentColumn = 0;
let isCurrentRowFilled = false;

export const handleCellInput = (event) => {
  const currentCell = event.target;
  const inputValue = currentCell.value.slice(0, 1).toUpperCase();
  currentCell.value = inputValue;

  if (currentRow === rows - 1 && currentColumn === columns - 1) {
    return;
  }
  if (currentColumn < columns - 1) {
    const nextCell =
      gridContainer.children[currentRow * columns + currentColumn + 1];
    nextCell.focus();
    currentColumn++;
  } else if (currentRow < rows - 1 && isCurrentRowFilled) {
    currentRow++;
    currentColumn = 0;
    const nextCell = gridContainer.children[currentRow * columns];
    nextCell.focus();
  }
};

export const updateCurrentRow = (gridContainer, currentRow, columns) => {
  const allRows = Array.from(gridContainer.children);
  const rowStartIndex = currentRow * columns;
  const rowEndIndex = rowStartIndex + columns;

  allRows.forEach((cell, i) => {
    const isCurrentRowCell = i >= rowStartIndex && i < rowEndIndex;
    cell.classList.toggle("curr-row-cell", isCurrentRowCell);
  });
};

export const applyClassLists = (randomWord, isHardMode) => {
  const gridContainer = document.getElementById("container");
  const allCells = Array.from(gridContainer.getElementsByClassName("cell"));
  console.log(randomWord);
  const currRowCells = allCells.filter((cell) =>
    cell.classList.contains("curr-row-cell")
  );

  const splitRandom = randomWord.split("");
  const arrayOfCells = currRowCells.map((cell) => cell);

  arrayOfCells.forEach((cell, i) => {
    const cellValue = cell.value ? cell.value.toUpperCase() : "";
    const randomChar = randomWord[i];

    cell.classList.remove("matching-char", "correct-position");

    if (splitRandom.includes(cellValue)) {
      cell.classList.add(
        isHardMode ? "matching-char-hardMode" : "matching-char"
      );
      cell.setAttribute("aria-label", "Matching character");
    }

    if (cellValue === randomChar) {
      cell.classList.add(
        isHardMode ? "correct-position-hardMode" : "correct-position"
      );
      cell.setAttribute("aria-label", "Correct position");
    }
  });
};
