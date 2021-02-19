
function init(){

  const playerGrid = document.querySelector('.player-grid')
  // const playerGrid = document.querySelector('.computer-grid')
  //creating the size of the grid that is going to be used
  const playerCells = []
  const gridWidth = 14
  const gridCellCount =  gridWidth * gridWidth




  

  


  function createPlayingGrid(){ //could pass in a variable in the brackets 
    for (let i = 0; i < gridCellCount; i++){

      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      playerGrid.appendChild(cell)
      playerCells.push(cell)
      


    }

    //this is where charlotte added the cat. 

  }
  console.log('player grid',createPlayingGrid())
  console.log('player cells',playerGrid)



}





window.addEventListener('DOMContentLoaded', init )