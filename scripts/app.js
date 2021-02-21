
function init(){

  //consts for the game
                               //**** creating the grids  */
  // consts for creating the grids
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

 
                         //*** creating the ships  */


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
  const playerCarriership = new Ship('carriership', 5, 'right', [], 'player')
  const playerBattleship = new Ship('battleship', 4, 'right', [], 'player')
  const playerDestroyer = new Ship('deatroyer', 3, 'right', [], 'player')
  const playerSubmarine = new Ship('submarine', 3, 'right', [], 'player')
  const playerPatrol = new Ship('patrol', 2, 'right', [], 'player')
  


  //*inserting the piece 
  let shipClassToAdd = null // this can be changed based on the button clicked
  let shipStylingToAdd = ''

  // let shipStylingToHover = '' // used this to try and get the styling to work on hover- populated the whole grid! 
  
  const yAxis = document.querySelector('.y-axis')
  const xAxis = document.querySelector('.x-axis')
 

  
  const addCarrierShip = document.querySelector('.add-carriership')
  const addBattleship = document.querySelector('.add-battleship')
  const addDestroyer = document.querySelector('.add-destroyer')
  const addSubmarine = document.querySelector('.add-submarine')
  const addPatrol = document.querySelector('.add-patrol')
  const addingPlayerPieces = document.querySelectorAll('.playerCell')
  const addingComputerPieces = document.querySelectorAll('.computerCell')


//*Adding the players ships 
  function insertingPlayerBattleship (event){ //function to place the ships 
    const arrayStarrtingPoint = []
    if (shipClassToAdd.direction === 'right'  ){ 
      arrayStarrtingPoint.push(parseFloat(event.target.innerText))
      for ( i = 0; i < shipClassToAdd.length; i ++){
        shipClassToAdd.array.push([parseFloat(arrayStarrtingPoint) + i ] ) 
      }
      shipClassToAdd.array.forEach( array => {       
        for (let i = 0; i < array.length; i++){
          addingPlayerPieces[array[i]].classList.add(shipStylingToAdd)
        }
      })
    } else if (shipClassToAdd.direction === 'vert'){ //*** function to add ships on y
      arrayStarrtingPoint.push(parseFloat(event.target.innerText))
      for ( i = 0; i < shipClassToAdd.length; i ++){        
        shipClassToAdd.array.push([parseFloat(arrayStarrtingPoint) + i * gridWidth ] )         
      }
      shipClassToAdd.array.forEach( array => {       
        for (let i = 0; i < array.length; i++){
          addingPlayerPieces[array[i]].classList.add(shipStylingToAdd)
        }
      })


    }
    addComputerShips()
    shipClassToAdd = null
    
  }


  //* adding the computers ships 
  
  function addComputerShips(){
    // console.log('function add computers ships is working ')
    // const arrayStarrtingPoint = []
    const randomShipStart = Math.floor(Math.random() * gridCellCount)

    // for ( i = 0; i < shipClassToAdd.length; i ++){        
    //   shipClassToAdd.array.push([randomShipStart + i  ] )         
    // }

    shipClassToAdd.array.forEach(array =>{
      for(let i=0; i<array.length; i++){
        addingComputerPieces[randomShipStart].classList.add(shipStylingToAdd)
      }
    })
    addingComputerPieces[randomShipStart].classList.add('place-carriership') //this places the ship on a random square 
    


  }
  







  //* could add individual styling in the same way here- give each ship a style class in css and add in in same way here
  function handleAddCarriership(){    //refactor this code- very messy 
    shipClassToAdd = playerCarriership
    shipStylingToAdd = 'place-carriership'
    addCarrierShip.classList.add('hidden')
    
  }
  function handleAddBattleship(){
    shipClassToAdd = playerBattleship
    shipStylingToAdd = 'place-battleship'
    addBattleship.classList.add('hidden')
    
  } 
  function handleAddDestroyer(){    
    shipClassToAdd = playerDestroyer
    shipStylingToAdd = 'place-destroyer'
    addDestroyer.classList.add('hidden')
  }
  function handleAddSumbarine(){    
    shipClassToAdd = playerSubmarine
    shipStylingToAdd = 'place-submarine'
    addSubmarine.classList.add('hidden')
  }
  function handleAddPatrol(){    
    shipClassToAdd = playerPatrol
    shipStylingToAdd = 'place-patrol'
    addPatrol.classList.add('hidden')
    
  }
  //event listener to insert ships on click of a grid square 
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('click', insertingPlayerBattleship) 
  })

//this is the function for hovering over the board- dont know how to add the ship to this wihtout blocking up the whole grid! 
  function displayingPlayerBattleship(event){
    console.log('this is working')
  }
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('mouseenter', displayingPlayerBattleship) 
  })
  


  //event listeners to insert the correct ship depending on button clicked 
  addCarrierShip.addEventListener('click', handleAddCarriership) //event listener to add battleship
  addBattleship.addEventListener('click', handleAddBattleship) //event listener to add battleship
  addDestroyer.addEventListener('click', handleAddDestroyer) //event listener to add submarine
  addSubmarine.addEventListener('click', handleAddSumbarine) //event listener to add submarine
  addPatrol.addEventListener('click', handleAddPatrol) //event listener to add submarine


  // functions to flip the axis
  function handleYAxis(){
    shipClassToAdd.direction = 'vert'
  }
  function handleXAxis(){
    shipClassToAdd.direction = 'right'
  }
  //Event Listener for flipping the axis 
  yAxis.addEventListener('click', handleYAxis)
  xAxis.addEventListener('click', handleXAxis)
  



  


 






  
  

  
  






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
//   targetComputerCell.forEach(button =>{
//     button.addEventListener('click',shootAtComputer)  //****************reactivate shooting here  */
//   })

  
  

 




















}


window.addEventListener('DOMContentLoaded', init )