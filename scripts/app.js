
function init(){

  //consts for the game

  //consts for creating the grids
  const playerGrid = document.querySelector('.player-grid')
  const computerGrid = document.querySelector('.computer-grid')
  // const playerGrid = document.querySelector('.computer-grid')
  //creating the size of the grid that is going to be used
  const playerCells = []
  const computerCells = []
  const gridWidth = 10 // if want 15 the width is 6%
  const gridCellCount =  gridWidth * gridWidth

  //consts to create the ships 
  const battleship = document.querySelector('.battleship')
  const battleshipWidth = 4
  // const battleshipCellCount =
  const battleshipCells = []


  






  
  //creating the computers playing grid 
  function createComputerGrid(){  //could pass in a variable in the brackets 
    for (let i = 0; i < gridCellCount; i++){
      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      //creating computer grid
      computerGrid.appendChild(cell)
      computerCells.push(cell)
    }
  }


  // creating the players playing grid 
  function createPlayerGrid(){ //could pass in a variable in the brackets 
    for (let i = 0; i < gridCellCount; i++){
      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      //creating the player grid 
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    //this is where charlotte added the cat. 
  }

  createPlayerGrid() //calling the function to make the player grid 
  createComputerGrid() //calling the function to make the computergrid 
  
  //creating the ships
  function createBattleship(){
    for (let i = 0; i < battleshipWidth; i++){
      const cell = document.createElement('div')
      cell.textContent = i

      battleship.appendChild(cell)
      battleshipCells.push(cell)
    }
  }
  createBattleship()

 




















}


window.addEventListener('DOMContentLoaded', init )