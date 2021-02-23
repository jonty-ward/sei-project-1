
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
  let shipClassToAdd = [] // this can be changed based on the button clicked
  let shipStylingToAdd = ''
  let addClassOfShip = ''
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

    if(event.target.classList.contains('mouse-hover-invalid')) //*logic to prevent the ship being added if it is in the wrong place!
    {
      // console.log('CANT PUT A SHIP HERE!! ')
      return insertingPlayerBattleship()
    }
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
    
      
    shipClassToAdd.array.forEach( array => {       
      for (let i = 0; i < array.length; i++){
        addingPlayerPieces[array[i]].classList.add(addClassOfShip)
        addingPlayerPieces[array[i]].classList.add(shipStylingToAdd)
      }
    })
    addComputerShips()
    shipClassToAdd = 0
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
        if(computerShipPosition.includes(randomShipStart + (i * shipToVert))){ //*code to prevent ships from stacking on computer grid
          console.log('ships are intersecting')
          return addComputerShips ()
        } else {
          shipClassToAdd.array.push([randomShipStart + i * shipToVert  ] )                 
          shipsprojectedPosition.push(randomShipStart + i * shipToVert   )  
          computerShipPosition.push(randomShipStart + i * shipToVert   ) 
          // console.log('computer ship position ', computerShipPosition)

        }
        
      }
      
      const lastItemInArray =  shipsprojectedPosition[ (shipsprojectedPosition.length - 1) ]//***finding the last item in the array- used for stopping ships added over bottom edge //this could be a lot cleaner with a loop
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
            addingComputerPieces[array].classList.add(addClassOfShip) 
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
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-carriership'
    addCarrierShip.classList.add('hidden')
    
  }
  function handleAddBattleship(){
    shipClassToAdd = playerBattleship
    shipStylingToAdd = 'place-battleship'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-battleship'
    addBattleship.classList.add('hidden')
    
  } 
  function handleAddDestroyer(){    
    shipClassToAdd = playerDestroyer
    shipStylingToAdd = 'place-destroyer'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-destroyer'
    addDestroyer.classList.add('hidden')
  }
  function handleAddSumbarine(){    
    shipClassToAdd = playerSubmarine
    shipStylingToAdd = 'place-submarine'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-submarine'
    addSubmarine.classList.add('hidden')
  }
  function handleAddPatrol(){    
    shipClassToAdd = playerPatrol
    shipStylingToAdd = 'place-patrol'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-patrol'
    addPatrol.classList.add('hidden')
    
  }


  //this is the function for hovering over the board- //****need to be able to add the whole ship ************* WORKING HERE ******

  // const lastItemInArray =  shipClassToAdd.array[ (shipClassToAdd.array.length - 1) ]

  

  
  

  function displayingPlayerBattleship(event){ //***** this contains the logic to prevent the players ships going over the bottom/side borders */ 
    event.target.classList.add('mouse-hover')
    // console.log('this is working')
    // const lastItemInArray =  playerProjectedPosition[ (playerProjectedPosition.length - 1) ]
    if(shipClassToAdd.length > 0){
      // console.log('event.target',event.target)

      // ** consts needed to make sure that player can only add ships if sdhering to certain conditions 
      const lastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length -1))  )
      const secondLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length -2))  )
      const thirdLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length -3))  )
      const fourthLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length -4))  )
      const fifthLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length -5))  )
      // console.log(lastItemVert)
      const lastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 1
      const secondLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 2
      const thirdLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 3
      const fourthLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 4
      const fifthLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 5

    
      if(shipClassToAdd.direction === 'right'){ //*conditions for player placing the ships horizontally 

        if (addingPlayerPieces[lastItem].classList.contains('ship') && lastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[secondLastItem].classList.contains('ship') && secondLastItem >= parseFloat(event.target.innerText)  || addingPlayerPieces[thirdLastItem].classList.contains('ship') && thirdLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fourthLastItem].classList.contains('ship') && fourthLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fifthLastItem].classList.contains('ship') && fifthLastItem >= parseFloat(event.target.innerText) ){
          event.target.classList.add('mouse-hover-invalid')
        } else if (secondLastItem % gridWidth === 9 || thirdLastItem >= parseFloat(event.target.innerText) && thirdLastItem % gridWidth === 9 || fourthLastItem >= parseFloat(event.target.innerText) && fourthLastItem % gridWidth === 9 || fifthLastItem >= parseFloat(event.target.innerText) && fifthLastItem % gridWidth === 9){
          console.log('array is going over the edge')
          event.target.classList.add('mouse-hover-invalid')
        } else {
          event.target.classList.add('mouse-hover')
        }
      } else if (shipClassToAdd.direction === 'vert'){           //* conditions for playe placing ship verically 

        if (addingPlayerPieces[lastItemVert].classList.contains('ship') || addingPlayerPieces[secondLastItemVert].classList.contains('ship') || addingPlayerPieces[thirdLastItemVert].classList.contains('ship') && thirdLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fourthLastItemVert].classList.contains('ship') && fourthLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fifthLastItemVert].classList.contains('ship') && fifthLastItem >= parseFloat(event.target.innerText) ){
          console.log('vertical ship category selector ')
          event.target.classList.add('mouse-hover-invalid')
        } else if (lastItemVert >= 99){
          console.log('gone over the bottom ')
          event.target.classList.add('mouse-hover-invalid')
        } else{
          event.target.classList.add('mouse-hover')
        }
      }
    }
  }
  //*event listeners for adding and removing players ships
  function removingPlayerBattleship(event){
    // console.log('this is working')
    event.target.classList.remove('mouse-hover')
    event.target.classList.remove('mouse-hover-invalid')
  }
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('mouseenter', displayingPlayerBattleship) 
  })
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('mouseleave', removingPlayerBattleship) 
  })

  //event listener to insert ships on click of a grid square 
  addingPlayerPieces.forEach(click =>{    
    click.addEventListener('click', insertingPlayerBattleship) 
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







  //* consts for shooting 
  const targetComputerCell = document.querySelectorAll('.computerCell')
  const targetPlayerCell = document.querySelectorAll('.playerCell')

  const computerShotAtID = [] //stores the squares that the computer has shot at randomly
  const playerShotAtID = [] //array of squares player has targeted
  // console.log('player shot at id',playerShotAtID)

  //* consts for computer ships lives 

  let compCarriership = 5 
  let compBattleship = 4
  let compDestroyer = 3
  let compSubmarine = 3
  let compPatrol = 2

  //* player choosing a computer square 
  
  function shootAtComputer(event){

    const chosenAlready = playerShotAtID.includes(parseFloat(event.target.innerHTML))

    // console.log(chosenAlready)
    if (!chosenAlready){

      if (event.target.classList.contains('ship' ) ){   //if statement for if player hits hip to change colour 
        console.log('hit a ship')
        event.target.classList.add('shot-hit')
        playerShotAtID.push(parseFloat(event.target.innerHTML))
        
        if (event.target.classList.contains('place-comp-carriership')){  //*series of if statements to determine what ship has been hit 
          compCarriership--
          //can add messags in here - you have hit the enemyss battleship etc. 
          if (compCarriership === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('carrier ship dead ')
          }
        } else if (event.target.classList.contains('place-comp-battleship')){
          compBattleship--
          if (compBattleship === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('BATTLESHIP dead ')
          }
        } else if (event.target.classList.contains('place-comp-destroyer')){
          compDestroyer--
          if (compDestroyer === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('destroyer dead ')
          }
        } else if (event.target.classList.contains('place-comp-submarine')){
          compSubmarine--
          if (compSubmarine === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('carrier ship dead ')
          }
        } else if (event.target.classList.contains('place-comp-patrol')){
          compPatrol--
          if (compPatrol === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('partol ship dead ')
          }
        }
      } else {
        event.target.classList.add('shot-miss') 
        playerShotAtID.push(parseFloat(event.target.innerHTML))
      }

    } else {
      console.log('you have already selected this square')
      return shootAtComputer() //this restarts the function 
    }
    shootAtPlayer() //once the function has run successfully (not had the same sqaure clicked on more than once), the funtion for the computer shooting runs //* maybe put a timer on here



    
  }
  //*computer randomly shoots at player after every click 

  //* the consts for the players ships lives 
  let playerCarriershipLives = 5 
  let playerBattleshipLives = 4
  let playerDestroyerLives = 3
  let playerSubmarineLives = 3      
  let playerPatrolLives = 2

  //* arrays for non-random shooting from computer 
  let possibleArrayPositions = null
  let targetRandomPlayerCellGlobal = null


  //*functions for non-rnadom computer shooting 

  function createFirstChoiceArray (){
    possibleArrayPositions = [(targetRandomPlayerCellGlobal + 1), (targetRandomPlayerCellGlobal - 1), (targetRandomPlayerCellGlobal + gridWidth), (targetRandomPlayerCellGlobal - gridWidth) ]  //Logic to create an array of possible options 
    console.log('possible array postions', possibleArrayPositions)
  }





  function shootAtPlayer(){
    const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
    targetRandomPlayerCellGlobal = targetRandomPlayerCell
    const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random number has already been chosen 
    if (!chosenAlready){ //If statement runs function again if random number has been chocen before
      targetPlayerCell[targetRandomPlayerCell].classList.add('shot-miss') 
      computerShotAtID.push(targetRandomPlayerCell)
      if (targetPlayerCell[targetRandomPlayerCell].classList.contains('ship')){ // ii* if computer hits any ship, styling is added 
        targetPlayerCell[targetRandomPlayerCell].classList.add('shot-hit')
        console.log('computer has hit a players ship')

        //* this is the logic that keeps track of which ships have been shot and their lives- not locations however shich may be needed later 
        if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-carriership')){
          playerCarriershipLives-- // decrease lives of this ship
          if(possibleArrayPositions === null){ //logic to create the first array of possible outcomes
            createFirstChoiceArray()
          } else if (targetRandomPlayerCellGlobal.length = 4){
            console.log('the seccond step of the computers logic is selected!')

          }

          if (playerCarriershipLives === 0){
            console.log('players carrier ship has been destroyed ')
          }
        } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-battleship')){
          playerBattleshipLives--
          if (playerBattleshipLives === 0){
            console.log('players battleship has been destroyed ')
          }
        } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-destroyer')){
          playerDestroyerLives--
          if (playerDestroyerLives === 0){
            console.log('players destroyer has been destroyed ')
            
          }
        } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-submarine')){
          playerSubmarineLives--
          if (playerSubmarineLives === 0){
            console.log('players submarine has been destroyed ')
          }
        } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-patrol')){
          playerPatrolLives--
          if (playerPatrolLives === 0){
            console.log('players patrol ship has been destroyed ')
          }
        }
      }
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