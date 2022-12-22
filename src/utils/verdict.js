export const verdict = (board) => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const arrObj = {
    0: "0 0",
    1: "0 1",
    2: "0 2",
    3: "1 0",
    4: "1 1",
    5: "1 2",
    6: "2 0",
    7: "2 1",
    8: "2 2",
  };

  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = board[arrObj[winCondition[0]][0]][arrObj[winCondition[0]][2]];
    let b = board[arrObj[winCondition[1]][0]][arrObj[winCondition[1]][2]];
    let c = board[arrObj[winCondition[2]][0]][arrObj[winCondition[2]][2]];

    console.log(a, b, c);

    if (!a && !b && !c) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  for (let i = 0; i < board.length; i++) {
    //
  }

  if (!roundWon) {
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        console.log(board[i][j]);
        if (!board[i][j]) {
          isDraw = false;
          break;
        }
      }
    }
    if (isDraw) {
      console.log(isDraw);
      return "Draw";
    }
  }

  return roundWon ? "Win" : "Not Win";
};
