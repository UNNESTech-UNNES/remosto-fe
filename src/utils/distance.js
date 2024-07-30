export function distanceFromHere({ xPosition = 0, yPosition = 0 }) {
  const initialXPosition = 0;
  const initialYPosition = 0;

  const difference = {
    x: Math.abs(xPosition - initialXPosition),
    y: Math.abs(yPosition - initialYPosition),
  };

  const distance = pythagorean(difference.x, difference.y);

  return distance;
}

function pythagorean(sideA, sideB) {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}
