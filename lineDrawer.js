function drawLine(screen, { x: x1, y: y1 }, { x: x2, y: y2 }) {
  function drawPixel(x, y) {
    const block = "██";
    
    screen[x][y] = block;
  }

  let x = x1;
  let y = y1;
  let deltaX = Math.abs(x2 - x1);
  let deltaY = Math.abs(y2 - y1);
  const s1 = Math.sign(x2 - x1);
  const s2 = Math.sign(y2 - y1);
  let interchange = 0;

  if (deltaY > deltaX) {
    let temp = deltaX;
    deltaX = deltaY;
    deltaY = temp;
    interchange = 1;
  }

  let error = 2 * deltaY - deltaX;
  const A = 2 * deltaY;
  const B = 2 * (deltaY - deltaX);

  // drawPixel(x, y);

  for (let i = 1; i <= deltaX; i++) {
    if (error < 0) {
      if (interchange === 1) {
        y += s2;
      } else {
        x += s1;
      }
      error += A;
    } else {
      y += s2;
      x += s1;
      error += B;
    }
    drawPixel(x, y);
  }
}

module.exports = { drawLine };
