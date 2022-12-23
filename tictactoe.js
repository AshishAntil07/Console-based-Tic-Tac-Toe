// Functions

const getObj = coord => {return {x: Number(coord.slice(0, 1)), y: Number(coord.slice(2, 3))}};
function emptyBoxes(matrix){
  let boxes=[];
  matrix.forEach((row, RInd) => row.forEach((box, CInd) => box==='.'?boxes.push(`${RInd} ${CInd}`):0));
  return [boxes.length, boxes];
}

function filledBoxes(matrix){
  let boxes=[];
  matrix.forEach((row, RInd) => row.forEach((box, CInd) => box!=='.'?boxes.push(`${RInd} ${CInd}`):0));
  return [boxes.length, boxes];
}

function filled(arr, ref){
  let coordinates = [];
  (ref.toLowerCase()==='corners'?['0 0', '0 2', '2 0', '2 2']:['0 1', '1 0', '1 2', '2 1']).forEach(coordinate => arr.includes(coordinate)?coordinates.push(coordinate):0);
  return [coordinates.length!==0, coordinates];
}

function validateWin(matrix, x){
  let filledbox = emptyBoxes(matrix)[0];
  matrix = matrix.flat(1);
  if(matrix[0]==='O' && matrix[1]==='O' && matrix[2]==='O' || matrix[3]==='O'  && matrix[4]==='O'  && matrix[5]==='O'  || matrix[6]==='O'  && matrix[7]==='O'   && matrix[8]==='O'  || matrix[0]==='O'  && matrix[3]==='O'  && matrix[6]==='O'  || matrix[0]==='O'  && matrix[4]==='O'  && matrix[8]==='O'  || matrix[2]==='O'  && matrix[4]==='O'  && matrix[6]==='O'  || matrix[1]==='O'  && matrix[4]==='O'  && matrix[7]==='O'  || matrix[2]==='O'  && matrix[5]==='O' && matrix[8]==='O'){
    console.log(`\n${x==='computer'?'User':'Computer'} Wins!\n`);
    return true;
  }else if(matrix[0]==='X'  && matrix[1]==='X'  && matrix[2]==='X'  || matrix[3]==='X'  && matrix[4]==='X'  && matrix[5]==='X'  || matrix[6]==='X'  && matrix[7]==='X'   && matrix[8]==='X'  || matrix[0]==='X'  && matrix[3]==='X'  && matrix[6]==='X'  || matrix[0]==='X'  && matrix[4]==='X'  && matrix[8]==='X'  || matrix[2]==='X'  && matrix[4]==='X'  && matrix[6]==='X'  || matrix[1]==='X'  && matrix[4]==='X'  && matrix[7]==='X'  || matrix[2]==='X'  && matrix[5]==='X'  && matrix[8]==='X'){
    console.log(`\n${x==='computer'?'Computer':'User'} Wins!\n`);
    return true;
  }else if(!filledbox){
    console.log(`\nMatch Tie!\n`);
    return true;
  }
  return false;
}


// for Best move

function best(matrix, side){
  function getSide(side){
    let boxes=[];
    matrix.forEach((row, RInd) => row.forEach((box, CInd) => box===side?boxes.push(`${RInd} ${CInd}`):0));
    return boxes;
  }

  const empty = emptyBoxes(matrix);
  const filledBox = filledBoxes(matrix);
  const filledCorners = filled(filledBox[1], 'corners');
  const filledWalls = filled(filledBox[1], 'walls');
  if(empty[0] === 0) return -1
  if(empty[0] === 9 || ((filledCorners[0] || filledWalls[0]) && empty[0] === 8)) return {x: 1, y: 1}
  if(empty[0] === 1) return {x: getObj(empty[1][0]).x, y: getObj(empty[1][0]).y}
  if(empty[0] === 8 && !empty[1].includes('1 1')) return {x: 0, y: 0}
  if(empty[0] === 7 && filledWalls[0] && !empty[1].includes('1 1')) return {x: getObj(filledWalls[1][0]).x%2===0?2-getObj(filledWalls[1][0]).x:0, y: getObj(filledWalls[1][0]).y===2?0:2}

  const coordinates = [['0 0', '0 1', '0 2'], ['0 1', '0 2', '0 0'], ['0 0', '0 2', '0 1'], ['1 0', '1 1', '1 2'], ['1 1', '1 2', '1 0'], ['1 0', '1 2', '1 1'], ['2 0', '2 1', '2 2'], ['2 1', '2 2', '2 0'], ['2 0', '2 2', '2 1'], ['0 0', '1 1', '2 2'], ['1 1', '2 2', '0 0'], ['2 2', '0 0', '1 1'], ['0 2', '1 1', '2 0'], ['1 1', '2 0', '0 2'], ['2 0', '0 2', '1 1'], ['0 0', '1 0', '2 0'], ['1 0', '2 0', '0 0'], ['0 0', '2 0', '1 0'], ['0 1', '1 1', '2 1'], ['1 1', '2 1', '0 1'], ['0 1', '2 1', '1 1'], ['0 2', '1 2', '2 2'], ['1 2', '2 2', '0 2'], ['0 2', '2 2', '1 2'], ['1 2', '1 1', '1 0']]

  let bestMove;

  const sideBoxes = getSide(side);
  const oppSideBoxes = getSide(side==='X'?'O':'X');

  if(oppSideBoxes.includes('1 1') && oppSideBoxes.includes('2 2') && !empty.includes('0 0')) return {x:0,y:2};
  [sideBoxes, oppSideBoxes].forEach(boxes=>coordinates.forEach(coords=>!bestMove&&boxes.includes(coords[0])&&boxes.includes(coords[1])&&!filledBox[1].includes(coords[2])?bestMove=getObj(coords[2]):0))

  if(!bestMove && filledCorners[0]) (filledCorners[1].includes('0 0') && filledCorners[1].includes('2 2'))? bestMost=[{x:0,y:2},{x:2,y:0}][parseInt(Math.random()*2)]:(filledCorners[1].includes('0 2') && filledCorners[1].includes('2 0'))? bestMove=[{x:0,y:0},{x:2,y:2}][parseInt(Math.random()*2)]:0
  if(!bestMove && filledWalls[0]) (filledWalls[1].includes('0 1') && filledWalls[1].includes('1 0'))? bestMove={x:0,y:0}:(filledWalls[1].includes('1 0') && filledWalls[1].includes('2 1'))? bestMove={x:2,y:0}:(filledWalls[1].includes('1 2') && filledWalls[1].includes('2 1'))?bestMove={x:2,y:2}:(filledWalls[1].includes('1 2') && filledWalls[1].includes('0 1'))?bestMove={x:0,y:2}:0
  if(!bestMove)
    [
      ['1 0', '2 2', '0 0', '2 1', '2 0'],
      ['0 0', '1 2', '0 1', '2 2', '0 2'],
      ['1 2', '2 0', '0 2', '2 1', '2 2'],
      ['1 0', '0 2', '0 1', '2 0', '0 0']
    ].forEach(coord => !bestMove && ((filledBox[1].includes(coord[0]) && filledBox[1].includes(coord[1]) || filledBox[1].includes(coord[2]) && filledBox[1].includes(coord[3])) && !filledBox[1].includes(coord[4]))? bestMove=getObj(coord[4]):0)

  !bestMove?bestMove=getObj(empty[1][parseInt(Math.random()*empty[1].length)]):0
  return bestMove;
}


// For game

function askReRun(){
  return prompt('Would you like to play again?(Y/N): ')==='Y'?true:false;
}

function start(){
  let arr = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
  ]

  function getField(matrix){
    let str='';
    matrix.forEach(row => {
      str+='\n';
      row.forEach(cell => str+=cell==='.'?' - ':' '+cell+' ');
    })
    return str;
  }

  let userSide = ['O', 'X'][parseInt(Math.random()*2)];
  let computerSide = userSide==='X'?'O':'X';
  let turn = ['Computer', 'User'][parseInt(Math.random()*2)];
  
  console.log(`First turn is of ${turn}.`);

  function move(){
    if(turn==='Computer'){
      const bestMove = best(arr, computerSide);
      console.log(`It's Computer's move.`);
      arr[bestMove.x].splice(bestMove.y, 1, computerSide);
      arr[bestMove.x][bestMove.y][computerSide==='X'?'cross':'circle'] = true;
      console.log(`\n${getField(arr)}\n`);
      turn='User';
      validateWin(arr, computerSide==='X'?'computer':'user')?askReRun()?start():0:move();
    }else if(turn==='User'){
      console.log(`It's your move.`);
      let userMove, emptyBox=emptyBoxes(arr)[1];
      for(;1;){
        userMove=prompt('Enter your move(in the format, x y ): ')
        if(emptyBox.includes(userMove)) break;
        console.log('Enter a valid Move.\n');
      }
      userMove=getObj(userMove)
      arr[userMove.x].splice(userMove.y, 1, userSide);
      arr[userMove.x][userMove.y][computerSide==='X'?'cross':'circle'] = true;
      console.log(`\n${getField(arr)}\n`);
      turn='Computer';
      validateWin(arr, computerSide==='X'?'computer':'user')?askReRun()?start():0:move();
    }
  }
  move();
}


start();