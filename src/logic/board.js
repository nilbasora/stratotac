import { WINNER_COMBOS } from '../constants.js'
import { TURNS } from '../constants.js'

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

export const checkEndGame = (newBoard, newTurn) => {
  // Count the number of each size of piece placed on the board for each player
  let placedSquares = { big: 0, medium: 0, small: 0 };
  let placedCircles = { big: 0, medium: 0, small: 0 };

  newBoard.forEach(square => {
    if (square) {
      if (square.shape === 'square') {
        placedSquares[square.size]++;
      } else if (square.shape === 'circle') {
        placedCircles[square.size]++;
      }
    }
  });

  // Determine the number of each size of piece remaining for the current player
  const remainingPieces = newTurn === TURNS.square ? placedSquares : placedCircles;
  const totalPiecesPerSize = 2; // Since each opponent has 2 big, 2 medium, and 2 small

  // Check if there are larger pieces available to be placed for the current turn
  const canPlaceLargerPiece = Object.keys(remainingPieces).some(size => {
    const sizeIndex = ['small', 'medium', 'big'].indexOf(size);
    const largerSizes = ['small', 'medium', 'big'].slice(sizeIndex + 1);
    return largerSizes.some(largerSize => remainingPieces[largerSize] < totalPiecesPerSize);
  });

  // The game ends (returns true for endGame) if no larger pieces are available to be placed
  return !canPlaceLargerPiece;
};
