import './App.css';
import { useState } from 'react';

let curGrid  =  [ [0, 0, 0, 0, 2, 0],
                  [0, 0, 0, 1, 1, 1],
                  [0, 0, 0, 0, 0, 0],
                  [1, 1, 1, 1, 0, 0],
                  [0, 0, 0, 0, 0, 0],
                  [0, 0, 1, 1, 1, 1],
                  [0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 3, 0, 0] ];
    

function draw(grid) {
    let row = grid.length, col = grid[0].length;
    let size = "calc(100%/"+col+")";
    let res=[];
  
    for(let i=0; i<row; i++) {
      let tmp=[];
  
      for(let j=0; j<col; j++) {
        switch(grid[i][j]) {
          case 0: 
                  tmp[j] =  (
                    <div id={i+''+j} key={i+''+j} className='grid' style={{width: size}}>
                      <img src="img/white.png" alt="a" width="100%"/>
                    </div>
                  );
                  break;
          case 1: 
                  tmp[j] =  (
                    <div id={i+''+j} key={i+''+j} className='grid' style={{width: size}}>
                      <img src="img/wall.png" alt="a" width="100%"/>
                    </div>
                  );
                  break;
          case 2: 
                  tmp[j] =  (
                    <div id={i+''+j} key={i+''+j} className='grid' style={{width: size}}>
                      <img src="img/diamond.png" alt="a" width="100%"/>
                    </div>
                  );
                  break;  
          default: 
                  tmp[j] =  (
                    <div id={i+''+j} key={i+''+j} className='grid' style={{width: size}}>
                      <img src="img/mario.png" alt="a" width="100%"/>
                    </div>
                  );
                  break;      
        }
      }
  
      res[i] = tmp;
    }
  
    return res;
  }

  function getMario(grid) {
    let row = grid.length, col = grid[0].length; 
    let res=[];
  
    for(let i=0; i<row; i++) {
      for(let j=0; j<col; j++) {
        if(grid[i][j]===3) res=[i, j];
      }
    }

    return res;
  }

function App() {                                
  let [grid, setGrid] = useState(curGrid);
  let message = [];
  let isWin = false;

  function moveUp(step) {
    let x=getMario(curGrid)[0], y=getMario(curGrid)[1];
    let row = curGrid.length, col = curGrid[0].length;

    if(x===0 || curGrid[x-1][y]===1) {
      message.push("Can't move up at step "+step+"!");
      return;
    }

    if(curGrid[x-1][y]===2) {
      isWin = true;
    }
    
    for(let i=0; i<row; i++) {
      let tmp = [];
      for(let j=0; j<col; j++) {
        if(i === x && j === y) tmp[j] = 0;
        else tmp[j] = curGrid[i][j];
      }
      curGrid[i] = tmp;
    }

    curGrid[x-1][y]=3;
  }

  function moveDown(step) {
    let x=getMario(curGrid)[0], y=getMario(curGrid)[1];
    let row = curGrid.length, col = curGrid[0].length; 

    if(x===row-1 || curGrid[x+1][y]===1) {
      message.push("Can't move down at step "+step+"!");
      return;
    }

    if(curGrid[x+1][y]===2) {
      isWin = true;
    }

    for(let i=0; i<row; i++) {
      let tmp = [];
      for(let j=0; j<col; j++) {
        if(i === x && j === y) tmp[j] = 0;
        else tmp[j] = curGrid[i][j];
      }
      curGrid[i] = tmp;
    }

    curGrid[x+1][y]=3;
  }

  function moveLeft(step) {
    let x=getMario(curGrid)[0], y=getMario(curGrid)[1];
    let row = curGrid.length, col = curGrid[0].length; 

    if(y===0 || curGrid[x][y-1]===1) {
      message.push("Can't move left at step "+step+"!");
      return;
    }

    if(curGrid[x][y-1]===2) {
      isWin = true;
    }

    for(let i=0; i<row; i++) {
      let tmp = [];
      for(let j=0; j<col; j++) {
        if(i === x && j === y) tmp[j] = 0;
        else tmp[j] = curGrid[i][j];
      }
      curGrid[i] = tmp;
    }

    curGrid[x][y-1]=3;
  }

  function moveRight(step) {
    let x=getMario(curGrid)[0], y=getMario(curGrid)[1];
    let row = curGrid.length, col = curGrid[0].length; 

    if(y===col-1 || curGrid[x][y+1]===1) {
      message.push("Can't move right at step "+step+"!");
      return;
    }

    if(curGrid[x][y+1]===2) {
      isWin = true;
    }

    for(let i=0; i<row; i++) {
      let tmp = [];
      for(let j=0; j<col; j++) {
        if(i === x && j === y) tmp[j] = 0;
        else tmp[j] = curGrid[i][j];
      }
      curGrid[i] = tmp;
    }

    curGrid[x][y+1]=3;
  }

  function handleRun() {
    let list = document.querySelector('textarea').value.split('\n');

    for(let i=0; i<list.length; i++) {
      if(isWin === true) break;

      let act = list[i].toLowerCase().trim();
      if(act === 'up'   ) moveUp(i+1);
      if(act === 'down' ) moveDown(i+1);
      if(act === 'left' ) moveLeft(i+1);
      if(act === 'right') moveRight(i+1);
    };

    if (message.length !== 0) {
      for(let i=0; i<message.length; i++) alert(message[i]);
    }

    let nextGrid = [];

    for(let i=0; i<grid.length; i++) {
      let tmp=[];
      for(let j=0; j<grid[0].length; j++) tmp[j] = curGrid[i][j];
      nextGrid[i]=tmp;
    }

    setGrid(nextGrid);

    if(isWin === true) {
      alert("You win!");
    } 

    document.querySelector('textarea').value = '';
    document.querySelector('textarea').focus();
  }

  return (
    <div className='Wrapper'>
      <div className="Maze">
        {
          draw(grid).map((item, index) => (
            <div key={index}>{item}</div>
          ))
        }
      </div>

      <div className='Text'>
        <textarea autoFocus placeholder='Input here ...'></textarea>
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
}

export default App;
