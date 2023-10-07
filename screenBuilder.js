const MATRIX_ORDER = 100;
const space = "░░";

function makeScreen(dimension = MATRIX_ORDER, fill = space) {
  return Array.from({ length: dimension }, () =>
    Array.from({ length: dimension }, () => fill)
  );
}

function printScreen(screen) {
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
  for (let i = screen.length - 1; i >= 0; i--) {
    const line = screen[i];
    console.log(line.join(""));
  }
}

module.exports = {
  makeScreen,
  printScreen,
};
