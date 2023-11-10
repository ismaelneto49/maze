/*
  Maps a real cartesian point into a javascript matrix point.
  It essentially transforms a matrix that goes from zero to N into a matrix that goes from -N/2 to N/2
*/
function coordinateMapper({ x, y }, SCREEN_DIMENSION) {
  const bothPositive = x >= 0 && y >= 0;
  const bothNegative = x <= 0 && y <= 0;
  const xPositive_yNegative = x >= 0 && y <= 0;
  const xNegative_yPositive = x <= 0 && y >= 0;

  const differenceFactor = SCREEN_DIMENSION / 2;
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

/*
  Receives a 3d vertex and a focal length and return the 2d projection of the vertex in a plane
*/
function projectVertex(vertex, focalLength) {
  const { x, y, z } = vertex;

  const xProjected = Math.trunc((focalLength * x) / (z + focalLength));
  const yProjected = Math.trunc((focalLength * y) / (z + focalLength));

  return { x: xProjected, y: yProjected };
}

function getRotationMatrix(angleDegrees) {
  const radians = {
    0: 0,
    30: Math.PI / 6,
    45: Math.PI / 4,
    90: Math.PI / 2,
    180: Math.PI,
    360: 2 * Math.PI,
  };

  return [
    [
      Number(Math.cos(radians[angleDegrees]).toFixed(2)),
      Number(-Math.sin(radians[angleDegrees]).toFixed(2)),
    ],
    [
      Number(Math.sin(radians[angleDegrees]).toFixed(2)),
      Number(Math.cos(radians[angleDegrees]).toFixed(2)),
    ],
  ];
}

function rotateOnX({ x, y, z }, degrees) {
  const rotationMatrix = getRotationMatrix(degrees);

  // multiply rotation matrix and y and z coordinates, then add x back
  const yRotated = rotationMatrix[0][0] * y + rotationMatrix[0][1] * z;
  const zRotated = rotationMatrix[1][0] * y + rotationMatrix[1][1] * z;

  return {
    x,
    y: Number(yRotated.toFixed(0)),
    z: Number(zRotated.toFixed(0)),
  };
}

function rotateOnY({ x, y, z }, degrees) {
  const rotationMatrix = getRotationMatrix(degrees);
}

function rotateOnZ({ x, y, z }, degrees) {
  const rotationMatrix = getRotationMatrix(degrees);
}

module.exports = {
  coordinateMapper,
  projectVertex,
  rotationFunctions: { rotateOnX, rotateOnY, rotateOnZ },
};
