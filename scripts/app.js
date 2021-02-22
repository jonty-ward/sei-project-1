
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
  let compShipStylingToAdd = ''

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
    let vertOrHoriz = 0
    const playerProjectedPosition = []
    if (shipClassToAdd.direction === 'right'  ){ 
      vertOrHoriz = 1     
    } else if (shipClassToAdd.direction === 'vert'){ //*** function to add ships on y
      vertOrHoriz = gridWidth
    }

    arrayStarrtingPoint.push(parseFloat(event.target.innerText))
    for ( i = 0; i < shipClassToAdd.length; i ++){
      shipClassToAdd.array.push([parseFloat(arrayStarrtingPoint) + i * vertOrHoriz] ) 
      playerProjectedPosition.push([parseFloat(arrayStarrtingPoint) + i * vertOrHoriz] ) 
    }

    console.log('player projected position', playerProjectedPosition)
    


    //****************************************** LOGIC TO STOP SHIPSS ADDING OVER BOTTOM EDGE - NOT WORKING  */
    const lastItemInArray =  playerProjectedPosition[ (playerProjectedPosition.length - 1) ]//***finding the last item in the array- used for stopping ships added over bottom edge 
    if (lastItemInArray > 99){    // stops the ships from going over the bottom edge
      console.log('gone over the edge, try again! ')
      return vertOrHoriz = 1
      
     
      

    } else {
      shipClassToAdd.array.forEach( array => {       
        for (let i = 0; i < array.length; i++){
          addingPlayerPieces[array[i]].classList.add(shipStylingToAdd)
        }
      })
      


      addComputerShips()
    }

    
    shipClassToAdd = null

  }
  //* ADDING COMPUTER SHIPS
  let computerShipPosition = [] //keeps track of the computers ships positions 
  console.log('all ships positions', computerShipPosition)

  function addComputerShips(){
    //     const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
    //     const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random 
    //consts for the function to work 
    
    const randomShipStart = Math.floor(Math.random() * gridCellCount)
    shipClassToAdd.array = []
    const shipsprojectedPosition = []
    const randomAxis = Math.floor(Math.random() * 10)
    let shipToVert = 0
    const placedAlready = computerShipPosition.includes(randomShipStart) //finds if contains random start position

    if (!placedAlready){ //*if statement start for spotting ships being placed at the start 
      
      if (randomAxis % 2 === 0){
        shipToVert = gridWidth
      } else {
        shipToVert = 1
      }
      for ( i = 0; i < shipClassToAdd.length; i ++){        
        shipClassToAdd.array.push([randomShipStart + i * shipToVert  ] )                 
        shipsprojectedPosition.push(randomShipStart + i * shipToVert   )  
        computerShipPosition.push(randomShipStart + i * shipToVert   ) 
        // console.log('computer ship position ', computerShipPosition)
      }
      
      const lastItemInArray =  shipsprojectedPosition[ (shipsprojectedPosition.length - 1) ]//***finding the last item in the array- used for stopping ships added over bottom edge 
      const seccondLastItemInArray = parseFloat(shipsprojectedPosition[(shipsprojectedPosition.length - 2)])
      const thirdLastItemInArray = parseFloat(shipsprojectedPosition[(shipsprojectedPosition.length - 3)])
      const fourthLastItemInArray = parseFloat(shipsprojectedPosition[(shipsprojectedPosition.length - 4)])
      const fifthLastItemInArray = parseFloat(shipsprojectedPosition[(shipsprojectedPosition.length - 5)])

      if (lastItemInArray > 99 || seccondLastItemInArray % gridWidth === 9 || thirdLastItemInArray % gridWidth === 9  || fourthLastItemInArray % gridWidth === 9 || fifthLastItemInArray % gridWidth === 9){    // stops the ships from going over the bottom edge
        console.log('gone over the edge, try again! ')
       
        return addComputerShips()
      } else {
        shipClassToAdd.array.forEach(array =>{
          for (let i = 0; i < array.length; i++){
            addingComputerPieces[array].classList.add(compShipStylingToAdd)
            
          }
        })        
      }
    } else {
      console.log('starting on square with ship') //*end of if statement stopping ships starting on a square containing another ship
      return addComputerShips()
    }
  }
 
  

  //* could add individual styling in the same way here- give each ship a style class in css and add in in same way here
  function handleAddCarriership(){    //refactor this code- very messy 
    shipClassToAdd = playerCarriership
    shipStylingToAdd = 'place-carriership'
    compShipStylingToAdd = 'place-comp-carriership'
    addCarrierShip.classList.add('hidden')
    
  }
  function handleAddBattleship(){
    shipClassToAdd = playerBattleship
    shipStylingToAdd = 'place-battleship'
    compShipStylingToAdd = 'place-comp-battleship'
    addBattleship.classList.add('hidden')
    
  } 
  function handleAddDestroyer(){    
    shipClassToAdd = playerDestroyer
    shipStylingToAdd = 'place-destroyer'
    compShipStylingToAdd = 'place-comp-destroyer'
    addDestroyer.classList.add('hidden')
  }
  function handleAddSumbarine(){    
    shipClassToAdd = playerSubmarine
    shipStylingToAdd = 'place-submarine'
    compShipStylingToAdd = 'place-comp-submarine'
    addSubmarine.classList.add('hidden')
  }
  function handleAddPatrol(){    
    shipClassToAdd = playerPatrol
    shipStylingToAdd = 'place-patrol'
    compShipStylingToAdd = 'place-comp-patrol'
    addPatrol.classList.add('hidden')
    
  }
  //event listener to insert ships on click of a grid square 
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('click', insertingPlayerBattleship) 
  })

  //this is the function for hovering over the board- dont know how to add the ship to this wihtout blocking up the whole grid! 
  function displayingPlayerBattleship(){
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
  const playerShotAtID = [] //array of squares player has targeted
  // console.log('player shot at id',playerShotAtID)
  
  //* player choosing a computer square 
  
  function shootAtComputer(event){

    const hitShip = null




    const chosenAlready = playerShotAtID.includes(parseFloat(event.target.innerHTML))
    // console.log(chosenAlready)
    if (!chosenAlready){

      if (event.target.classList.contains('place-comp-carriership' ) || event.target.classList.contains('place-comp-battleship' ) || event.target.classList.contains('place-comp-destroyer' ) || event.target.classList.contains('place-comp-submarine' ) || event.target.classList.contains('place-comp-patrol' )){
        console.log('hit a ship')
        event.target.classList.add('shot-hit')
        playerShotAtID.push(parseFloat(event.target.innerHTML))
      } else {
        event.target.classList.add('shot-miss') 
        playerShotAtID.push(parseFloat(event.target.innerHTML))
      }

    } else {
      console.log('you have already selected this square')
      return shootAtComputer() //this restarts the function 
    }
    shootAtPlayer() //once the function has run successfully (not had the same sqaure clicked on more than once), the funtion for the computer shooting runs //* maybe put a timer on here
    //need to be able to dissable the click on this square when clicked on
    // console.log(event.target.innerHTML)
    
  }
  //*computer randomly shoots at player after every click 

  //****** this will need a lot more logic with regards to hitting a ship  */
  function shootAtPlayer(){
    const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
    const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random number has already been chosen 
    if (!chosenAlready){ //If statement runs function again if random number has been chocen before
      targetPlayerCell[targetRandomPlayerCell].classList.add('shot-miss') 
      computerShotAtID.push(targetRandomPlayerCell)
    } else {
      // console.log('already taken')
      return shootAtPlayer()
    }
  }
  targetComputerCell.forEach(button =>{
    button.addEventListener('click',shootAtComputer)  //****************reactivate shooting here  */
  })

  
  

 




















}


window.addEventListener('DOMContentLoaded', init )