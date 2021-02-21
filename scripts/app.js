
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

  //creating the computers playing grid 
  function createComputerGrid(){  //could pass in a variable in the brackets 
    for (let i = 0; i < gridCellCount; i++){
      const cell = document.createElement('div') //creating the divs for the grid 
      cell.textContent = i //creating text withing the grid with the value of its index
      //creating computer grid
      cell.className += 'computerCell' //adding a class to all computer cells to add event listnerne r
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
      cell.className += 'playerCell'
      playerGrid.appendChild(cell)
      playerCells.push(cell)
    }
    //this is where charlotte added the cat. 
    
  }
  createPlayerGrid() //calling the function to make the player grid 
  createComputerGrid() //calling the function to make the computergrid 

 



  // //*creating the ships
  class Ship {
    constructor(name, length, direction, array, board){
      this.name = name
      this.length = length
      this.direction = direction
      this.array = array
      this.board = board //this relates to player or computer board
    }
    //can add functions to the ship class here 
  }

  //******* players pieces 
  const playerBattleship = new Ship('battleship', 4, 'right', [], 'player')
  const playerSubmarine = new Ship('submarine', 3, 'right', [], 'player')


  //*inserting the piece 
  let shipClassToAdd = playerSubmarine // this can be changed based on the button clicked

  console.log('ship class to add',shipClassToAdd)
  const addBattleship = document.querySelector('.add-battleship')
  const addSubmarine = document.querySelector('.add-submarine')
  const addingPlayerPieces = document.querySelectorAll('.playerCell')

  function insertingPlayerBattleship (event){
    const arrayStarrtingPoint = []
    arrayStarrtingPoint.push(parseFloat(event.target.innerText))
    for ( i = 0; i < shipClassToAdd.length; i ++){
      shipClassToAdd.array.push([parseFloat(arrayStarrtingPoint) + i] )
      console.log('i', i)
    }
    shipClassToAdd.array.forEach( array => { //instead of having playerBattleship here, need something that can push the desired information into here when the ship is selected by the button 
      console.log('current array', array)
      for (let i = 0; i < array.length; i++){
        addingPlayerPieces[array[i]].classList.add('place-ship')
      }
    })
  }


  function handleAddBattleship(){
  
     shipClassToAdd = playerBattleship
    
  } // function to add ships based on the butto pressed
  //can pass information into the fuciton above based on the ship button pressed 

  function handleAddSumbarine(){
    
     shipClassToAdd = playerSubmarine
    
  }

  addingPlayerPieces.forEach(click =>{
    
    click.addEventListener('click', insertingPlayerBattleship) 
  })



  addBattleship.addEventListener('click', handleAddBattleship) //event listener to add battleship
  addSubmarine.addEventListener('click', handleAddSumbarine) //event listener to add submarine




  


 






  
  

  
  






  //*adding ths ship to the player grid 

  // make sure this is dry code

  // function addShip(){ //*potential to add an input so this, and loop through the different ships eg addShip(ship), and pass in the ship vairable in a loop? 

  //   playerCells[5].classList.add(battleship)
    
  // }


  





 

  //* consts for shooting 
  const targetComputerCell = document.querySelectorAll('.computerCell')
  const targetPlayerCell = document.querySelectorAll('.playerCell')

  const computerShotAtID = [] //stores the squares that the computer has shot at randomly
  const playerShotAtID = []
  
 //* player choosing a computer square 
  
//   function shootAtComputer(event){
//     const chosenAlready = playerShotAtID.includes(parseFloat(event.target.innerHTML))
//     // console.log(chosenAlready)
//     if(!chosenAlready){
//       event.target.classList.add('shot-miss') 
//       playerShotAtID.push(parseFloat(event.target.innerHTML))
//     } else {
//       console.log('you have already selected this square')
//       return shootAtComputer() //this restarts the function 
//     }
//     shootAtPlayer() //once the function has run successfully (not had the same sqaure clicked on more than once), the funtion for the computer shooting runs //* maybe put a timer on here
//     //need to be able to dissable the click on this square when clicked on
//     // console.log(event.target.innerHTML)
    
//   }
// //*computer randomly shoots at player after every click 

// //****** this will need a lot more logic with regards to hitting a ship  */
//   function shootAtPlayer(){
//     const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
//     const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random number has already been chosen 
//     if (!chosenAlready){ //If statement runs function again if random number has been chocen before
//       targetPlayerCell[targetRandomPlayerCell].classList.add('shot-miss') 
//       computerShotAtID.push(targetRandomPlayerCell)
//     } else {
//       // console.log('already taken')
//       return shootAtPlayer()
//     }
//   }
  // targetComputerCell.forEach(button =>{
  //   button.addEventListener('click',shootAtComputer)  //****************reactivate shooting here  */
  // })

  
  

 




















}


window.addEventListener('DOMContentLoaded', init )