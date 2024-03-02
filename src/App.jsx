import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame, checkOverlapping } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { Piece } from './components/Piece.jsx'

function App () {
  const [board, setBoard] = useState(() => {
    return Array(9).fill(null)
  })

  const [selectedPiece, setSelectedPiece] = useState(null)

  const [turn, setTurn] = useState(TURNS.square)

  const [placedPieces, setPlacedPieces] = useState([])


  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.square)
    setWinner(null)
    setSelectedPiece(null)
    setPlacedPieces([])

  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    const overlap = checkOverlapping(board[index], selectedPiece)
    if (overlap || winner || !selectedPiece) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = { ...selectedPiece }
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.square ? TURNS.circle : TURNS.square
    setTurn(newTurn)

    // Add selected piece to placedPieces array
    setPlacedPieces([...placedPieces, selectedPiece]);

    // quitar la pieza seleccionada
    setSelectedPiece(null)

    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard, newTurn)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1><img src='/logo-stratotac.png' alt="StratoTac"/></h1>
      <section className='game-container'>

    <section className={`pieces ${turn === TURNS.square ? 'current-turn' : ''}`}>
      {
        TURNS.square.map((piece, index) => {
          const isPlaced = placedPieces.includes(piece);

          const isSelected = selectedPiece === piece;
          const isCurrentTurn = turn === TURNS.square; // Adjust this condition for square pieces
          return (
            <div key={index} onClick={() => !isPlaced && setSelectedPiece(piece)}>
              <Piece
                shape={piece.shape}
                color={piece.color}
                size={piece.size}
                isSelected={isSelected} // Pass isSelected prop
                isSelectable={!isPlaced && isCurrentTurn}
              />
            </div>
          )
        })
      }
    </section>

    <section className='game'>
      {
        board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square && (
                <Piece
                  shape={square.shape}
                  color={square.color}
                  size={square.size}
                  isPlaced={true}
                />
        )}
            </Square>
          )
        })
      }
    </section>

    <section className={`pieces ${turn === TURNS.circle ? 'current-turn' : ''}`}>
      {
        TURNS.circle.map((piece, index) => {
          const isPlaced = placedPieces.includes(piece);

          const isSelected = selectedPiece === piece;
          const isCurrentTurn = turn === TURNS.circle; // Adjust this condition for square pieces
          return (
            <div key={index} onClick={() => !isPlaced && setSelectedPiece(piece)}>
              <Piece
                shape={piece.shape}
                color={piece.color}
                size={piece.size}
                isSelected={isSelected} // Pass isSelected prop
                isSelectable={!isPlaced && isCurrentTurn}
                />
            </div>
          )
        })
      }
    </section>

  </section>

      <section className='turn'>
        {turn === TURNS.square ? 'Your Turn' : 'Rival Turn'}
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
