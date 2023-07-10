import { getEasyModeWord } from "./getEasyModeWords.js";
import { getHardModeWord } from "./getHardModeWords.js";
import {
  handleCellInput,
  updateCurrentRow,
  applyClassLists,
} from "./helpers.js";

const rows = 6;
const columns = 5;
const gridContainer = document.getElementById("container");
let currentRow = 0;
let currentColumn = 0;
let randomWord = "";

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
