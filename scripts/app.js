
function init(){

  const playerGrid = document.querySelector('.player-grid')
  const computerGrid = document.querySelector('.computer-grid')
  // const playerGrid = document.querySelector('.computer-grid')
  //creating the size of the grid that is going to be used
  const playerCells = []
  const computerCells = []
  const gridWidth = 10 // if want 15 the width is 6%
  const gridCellCount =  gridWidth * gridWidth
  

  function createComputerGrid(){
    for (let i = 0; i < gridCellCount; i++){
      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      //creating computer grid
      computerGrid.appendChild(cell)
      computerCells.push(cell)
    }
  }


  function createPlayingGrid(){ //could pass in a variable in the brackets 
    for (let i = 0; i < gridCellCount; i++){
      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      //creating the player grid 
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    //this is where charlotte added the cat. 
  }

  createPlayingGrid()
  createComputerGrid()
 
  console.log('player cells',playerGrid)
  



}





window.addEventListener('DOMContentLoaded', init )