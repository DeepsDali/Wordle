export const applyClassLists = async (randomWord, isHardMode) => {
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
