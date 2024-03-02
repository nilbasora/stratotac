import { WINNER_COMBOS } from '../constants.js'

export const checkOverlapping = (currentPiece, selectedPiece) => {
  // Check if the selected piece is not present
  if (!selectedPiece) return true;

  // Check if there's no current piece on the board square
  if (!currentPiece) return false;

  // Check if the shapes are the same
  if (currentPiece.shape === selectedPiece.shape) return true;

  // Define the order of sizes for comparison
  const sizeOrder = {small: 1, medium: 2, big: 3};

  // Compare the sizes of the current and selected pieces
  if (sizeOrder[selectedPiece.size] > sizeOrder[currentPiece.size]) {
    // The selected piece is bigger, so it can replace the current piece
    return false;
  } else {
    // The selected piece is not bigger, overlapping is not allowed
    return true;
  }
}

export const checkWinnerFrom = (boardToCheck) => {
  // Check all winning combinations to see if there's a winner based on color
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] && boardToCheck[b] && boardToCheck[c] && // Ensure none of the positions are null
      boardToCheck[a].color === boardToCheck[b].color &&
      boardToCheck[a].color === boardToCheck[c].color
    ) {
      // If a winning combination is found, return the color of the winner
      return boardToCheck[a];
    }
  }
  // If no winner is found, return null
  return null;
}

export const checkEndGame = (newBoard) => {
  // revisamos si hay un empate
  // si no hay más espacios vacíos
  // en el tablero
  return newBoard.every((square) => square !== null)
}
