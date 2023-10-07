const { drawLine } = require("./lineDrawer");
const { makeScreen, printScreen } = require("./screenBuilder");

const MATRIX_ORDER = 100;
const space = "░░";

let mainScreen = makeScreen(MATRIX_ORDER, space);

// 3d projection

const vertices = [
  [22, 22, 22],
  [22, -22, 22],
  [-22, -22, 22],
  [-22, 22, 22],
  [22, 22, -22],
  [22, -22, -22],
  [-22, -22, -22],
  [-22, 22, -22],
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function coordinateMapper({ x, y }) {
  const bothPositive = x >= 0 && y >= 0;
  const bothNegative = x <= 0 && y <= 0;
  const xPositive_yNegative = x >= 0 && y <= 0;
  const xNegative_yPositive = x <= 0 && y >= 0;

  const differenceFactor = MATRIX_ORDER / 2;
  let realX = 0;
  let realY = 0;
  if (bothPositive || bothNegative) {
    realX = differenceFactor + x;
    realY = differenceFactor - y;
  } else if (xPositive_yNegative || xNegative_yPositive) {
    realX = differenceFactor - x;
    realY = differenceFactor + y;
  }
  return { x: realX, y: realY };
}

function projectVertex(vertex, focalLength) {
  const [x, y, z] = vertex;

  const xProjected = Math.trunc((focalLength * x) / (z + focalLength));
  const yProjected = Math.trunc((focalLength * y) / (z + focalLength));

  return { x: xProjected, y: yProjected };
}

function createLines(vertices, edges, focalLength) {
  const projectedVertices = vertices.map((vertex) =>
    projectVertex(vertex, focalLength)
  );

  const lines = [];
  edges.forEach((edge) => {
    const point1 = projectedVertices[edge[0]];
    const point2 = projectedVertices[edge[1]];

    const point1Real = coordinateMapper(point1);
    const point2Real = coordinateMapper(point2);

    lines.push([point1Real, point2Real]);
  });
  return lines;
}

const lines = createLines(vertices, edges, 75);

lines.forEach((lines) => {
  const point1 = lines[0];
  const point2 = lines[1];
  drawLine(mainScreen, point1, point2);
});

printScreen(mainScreen);
