const rows = 6;
const columns = 5;
const gridContainer = document.getElementById("container");
let currentRow = 0;
let currentColumn = 0;
let isCurrentRowFilled = false;

//Handle inputs into the cell
const handleCellInput = (event) => {
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

// Create basic grid
Array.from({ length: rows }).forEach(() => {
  Array.from({ length: columns }).forEach(() => {
    const cell = document.createElement("input");
    cell.classList.add("cell");
    cell.type = "text";
    cell.maxLength = 1;
    cell.addEventListener("input", handleCellInput);
    gridContainer.appendChild(cell);
  });
});
