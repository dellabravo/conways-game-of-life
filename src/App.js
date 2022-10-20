import { cloneDeep } from "lodash"
import { useState } from "react"
import "./App.css"

const BOARD_SIZE = 40
const generateEmptyBoard = () => {
  const board = []
  for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = []
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = false
    }
  }
  return board
}
// 33, 32 should have 3 alive neigbors
const initialPatterns = {
  glider: [
    [30, 31],
    [31, 32],
    [32, 30],
    [32, 31],
    [32, 32],
  ],
}

const turnOnInitialPattern = (board) => {
  initialPatterns.glider.map(
    (coordinates) => (board[coordinates[0]][coordinates[1]] = true)
  )
  return board
}
const emptyBoard = generateEmptyBoard()
const initialBoard = turnOnInitialPattern(emptyBoard)

function App() {
  const [board, setBoard] = useState(initialBoard)

  const getNumberOfLiveNeighbors = (row, column) => {
    let numberOfLiveNeighbors = 0
    if (board[row + 1] && board[row + 1][column - 1]) numberOfLiveNeighbors++
    if (board[row + 1] && board[row + 1][column]) numberOfLiveNeighbors++
    if (board[row + 1] && board[row + 1][column + 1]) numberOfLiveNeighbors++
    if (board[row][column - 1]) numberOfLiveNeighbors++
    if (board[row][column + 1]) numberOfLiveNeighbors++
    if (board[row - 1] && board[row - 1][column - 1]) numberOfLiveNeighbors++
    if (board[row - 1] && board[row - 1][column]) numberOfLiveNeighbors++
    if (board[row - 1] && board[row - 1][column + 1]) numberOfLiveNeighbors++
    return numberOfLiveNeighbors
  }

  const nextGeneration = () => {
    const nextBoard = cloneDeep(board)
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const numberOfLiveNeighbors = getNumberOfLiveNeighbors(i, j)
        // If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
        if (board[i][j]) {
          if (numberOfLiveNeighbors !== 2 && numberOfLiveNeighbors !== 3)
            nextBoard[i][j] = false
        } else {
          // If the cell is dead, then it springs to life only in the case that it has 3 live neighbors
          if (numberOfLiveNeighbors === 3) nextBoard[i][j] = true
        }
      }
    }
    setBoard(nextBoard)
  }

  return (
    <>
      <button onClick={() => nextGeneration()}>Next generation</button>
      <div>
        {board.map((row, i) => (
          <div style={{ display: "flex" }} key={`row-${i}`}>
            {row.map((value, j) => (
              <span
                style={{
                  width: 10,
                  height: 10,
                  border: "1px solid black",
                  background: value ? "black" : "white",
                }}
                key={`${i}-${j}-${board[i][j] ? "on" : "off"}`}></span>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
