export const applyClassLists = (randomWord) => {
  const gridContainer = document.getElementById("container");
  const allCells = Array.from(gridContainer.getElementsByClassName("cell"));

  console.log(randomWord);
  const currRowCells = allCells.filter((cell) =>
    cell.classList.contains("curr-row-cell")
  );
  console.log("Curr row cells:", currRowCells);
  console.log(`rw: ${randomWord}`);
  const splitRandom = randomWord.split("");
  console.log(`splitw: ${splitRandom}`);
  const arrayOfCells = currRowCells.map((cell) => cell);

  console.log("Curr row cells:", arrayOfCells);
  console.log("All cells:", allCells);
  arrayOfCells.forEach((cell, i) => {
    const cellValue = cell.value ? cell.value.toUpperCase() : "";
    const randomChar = randomWord[i];
    if (splitRandom.includes(cellValue)) {
      cell.classList.add("matching-char");
    }
    if (cellValue === randomChar) {
      cell.classList.add("correct-position");
    }
  });
};
