export const PAWN_HEIGHT = 0;
export const COIN_HEIGHT = 1;
const MIN_TILE = 0;
const MAX_TILE = 7;

export const possiblePositions = (i, j) => {
  const newCoordinates = [
    [i, j + 1],
    [i, j - 1],
    [i + 1, j],
    [i - 1, j]
  ].filter((coord) => inRange(coord[0], coord[1]));
  return newCoordinates;
};

export const tilePosition = (i, j, height) => {
  const position = [i - 3.5, height, j - 3.5];
  return position;
};

export const inRange = (i, j) => {
  return i >= MIN_TILE && i <= MAX_TILE && j >= MIN_TILE && j <= MAX_TILE;
};
