const MATRIX_ORDER = 100;
const space_character = "░░";

function makeScreen(dimension = MATRIX_ORDER, fill = space_character) {
  return Array.from({ length: dimension }, () =>
    Array.from({ length: dimension }, () => fill)
  );
}

/*
  Prints a javascript matrix as a cartesian plane
*/
function fillScreen(screen) {
  function rotateMatrix(matrix) {
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    for (let i = 0; i < numRows; i++) {
      for (let j = i + 1; j < numCols; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
  }

  rotateMatrix(screen);
  return screen.map((line) => line.join("")).reverse();
}

function clearScreen(screen) {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      screen[i][j] = space_character;
    }
  }
}

module.exports = {
  makeScreen,
  fillScreen,
  clearScreen,
};
