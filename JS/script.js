const rows = 6;
const columns = 5;
const gridContainer = document.getElementById("container");

Array.from({ length: rows }).forEach(() => {
  Array.from({ length: columns }).forEach(() => {
    const cell = document.createElement("input");
    cell.classList.add("cell");
    cell.type = "text";
    cell.maxLength = 1;
    gridContainer.appendChild(cell);
  });
});
