import { getEasyModeWord } from "./getEasyModeWords.js";
import { getHardModeWord } from "./getHardModeWords.js";
import { applyClassLists } from "./applyClasslists.js";

const rows = 6;
const columns = 5;
const gridContainer = document.getElementById("container");
let currentRow = 0;
let currentColumn = 0;
let randomWord = "";
let isCurrentRowFilled = false;

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

const updateCurrentRow = () => {
  const allRows = Array.from(gridContainer.children);
  const rowStartIndex = currentRow * columns;
  const rowEndIndex = rowStartIndex + columns;

  allRows.forEach((cell, i) => {
    const isCurrentRowCell = i >= rowStartIndex && i < rowEndIndex;
    cell.classList.toggle("curr-row-cell", isCurrentRowCell);
  });
};

//Get random word
let hardModeWord = await getHardModeWord();
let easyModeWord = getEasyModeWord();
randomWord = easyModeWord;
console.log(`Easy-mode word: ${randomWord}`);
applyClassLists(randomWord);

//Handle key event
const handleEnterKey = (event) => {
  if (event.key === "Enter") {
    currentRow++;
    currentColumn = 0;
    const nextCellIndex = currentRow * columns;
    if (nextCellIndex < gridContainer.children.length) {
      const nextCell = gridContainer.children[nextCellIndex];
      nextCell.focus();
    }
    applyClassLists(randomWord, document.body.classList.contains("hardMode"));
    updateCurrentRow(gridContainer, currentRow, columns);
  }
};

//Enter button eventlistener
const enterButton = document.getElementById("enter");
enterButton.addEventListener("click", () => {
  currentRow++;
  currentColumn = 0;
  const nextCell = gridContainer.children[currentRow * columns];
  nextCell.focus();
  applyClassLists(randomWord, document.body.classList.contains("hardMode"));
  updateCurrentRow(gridContainer, currentRow, columns);
});

// Create basic grid
Array.from({ length: rows }).forEach(() => {
  Array.from({ length: columns }).forEach(() => {
    const cell = document.createElement("input");
    cell.classList.add("cell");
    cell.type = "text";
    cell.maxLength = 1;
    cell.addEventListener("input", handleCellInput);
    cell.addEventListener("keydown", handleEnterKey);
    cell.setAttribute("aria-label", "Cell");
    gridContainer.appendChild(cell);
  });
});

// Add focus to the first cell on site load
const initialCell = gridContainer.children[0];
initialCell.focus();
updateCurrentRow(gridContainer, currentRow, columns);
const hardModeBtn = document.querySelector("#hard");

//HardMode eventlistener
hardModeBtn.addEventListener("click", () => {
  document.body.classList.add("hardMode");
  hardModeBtn.style.width = "100px";
  easyModeBtn.style.width = "150px";
  randomWord = hardModeWord.word;
  applyClassLists(randomWord, document.body.classList.contains("hardMode"));
  console.log(`Hard-mode word: ${randomWord}`);
  hardModeBtn.setAttribute("aria-pressed", "true");
  easyModeBtn.setAttribute("aria-pressed", "false");
});

//EasyMode eventlistener
const easyModeBtn = document.querySelector("#easy");
easyModeBtn.addEventListener("click", () => {
  document.body.classList.remove("hardMode");
  easyModeBtn.style.width = "100px";
  hardModeBtn.style.width = "150px";
  randomWord = easyModeWord;
  console.log(`Easy-mode word: ${randomWord}`);
  hardModeBtn.setAttribute("aria-pressed", "false");
  easyModeBtn.setAttribute("aria-pressed", "true");
});
