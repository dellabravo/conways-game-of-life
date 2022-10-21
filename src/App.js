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
const initialPatterns = {
  glider: [
    [30, 31],
    [31, 32],
    [32, 30],
    [32, 31],
    [32, 32],
  ],
  gosper: [
    [10, 10],
    [10, 11],
    [11, 10],
    [11, 11],
    [12, 10],
    [12, 11],
    [9, 12],
    [13, 12],
    [8, 14],
    [9, 14],
    [13, 14],
    [14, 14],
  ],
  shark: [
    [28, 10],
    [28, 11],
    [28, 12],
    [28, 13],
    [28, 14],
    [29, 15],
    [28, 16],
    [29, 16],
    [30, 16],
    [31, 16],
    [30, 15],
    [30, 14],
    [30, 13],
    [30, 12],
    [30, 11],
    [30, 10],
    [27, 11],
    [27, 12],
    [26, 12],
    [27, 13],
    [29, 9],
  ],
  heart: [
    [30, 19],
    [29, 20],
    [28, 21],
    [27, 22],
    [26, 22],
    [25, 22],
    [25, 21],
    [25, 20],
    [26, 19],
    [25, 18],
    [25, 17],
    [25, 16],
    [26, 16],
    [27, 16],
    [28, 17],
    [29, 18],
  ],
  mama: [
    [28, 14],
    [27, 14],
    [26, 15],
    [26, 16],
    [27, 16],
    [28, 16],
    [26, 17],
    [27, 18],
    [28, 18],
    [26, 21],
    [27, 20],
    [27, 22],
    [28, 22],
    [29, 22],
    [28, 20],
    [29, 20],
    [28, 21],
    [28, 25],
    [27, 25],
    [26, 26],
    [27, 27],
    [28, 27],
    [26, 28],
    [27, 29],
    [28, 29],
    [29, 32],
    [28, 32],
    [27, 32],
    [26, 33],
    [27, 34],
    [28, 34],
    [29, 34],
    [28, 33],
  ],
}

const turnOnInitialPattern = (board) => {
  initialPatterns.glider.map(
    (coordinates) => (board[coordinates[0]][coordinates[1]] = true)
  )
  initialPatterns.gosper.map(
    (coordinates) => (board[coordinates[0]][coordinates[1]] = true)
  )
  initialPatterns.shark.map(
    (coordinates) => (board[coordinates[0]][coordinates[1]] = true)
  )
  initialPatterns.heart.map(
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
                onClick={() => {
                  board[i][j] = !board[i][j]
                  setBoard([...board])
                  console.log(`[${i}, ${j}]`)
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
