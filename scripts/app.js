
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
  let originalArrayPosition = null
  let possibleArrayPositions = null
  
  let targetRandomPlayerCellGlobal = null
  


  //*functions for non-rnadom computer shooting 

  function createFirstChoiceArray (){
    originalArrayPosition = targetRandomPlayerCellGlobal
    // possibleArrayPositions = [(targetRandomPlayerCellGlobal + 1), (targetRandomPlayerCellGlobal - 1), (targetRandomPlayerCellGlobal + gridWidth), (targetRandomPlayerCellGlobal - gridWidth) ] 

    if (!targetPlayerCell[targetRandomPlayerCellGlobal + 1].classList.contains('shot-miss')){
      possibleArrayPositions = [(targetRandomPlayerCellGlobal + 1)]
    }
    if (!targetPlayerCell[targetRandomPlayerCellGlobal - 1 ].classList.contains('shot-miss')){
      possibleArrayPositions.push((targetRandomPlayerCellGlobal - 1))
    }
    if (!targetPlayerCell[targetRandomPlayerCellGlobal + gridWidth].classList.contains('shot-miss')){
      possibleArrayPositions.push((targetRandomPlayerCellGlobal + gridWidth))
    }
    if (!targetPlayerCell[targetRandomPlayerCellGlobal - gridWidth].classList.contains('shot-miss')){
      possibleArrayPositions.push((targetRandomPlayerCellGlobal - gridWidth))
    }
    
    

    
    

    //Logic to create an array of possible options 
    // console.log('possible array postions', possibleArrayPositions)
  }



  function shootAtPlayer(){
    if (possibleArrayPositions !== null){ //* logic that prevents the random aspec of the function running if possible array positions contains a value (which it will do when the computer has hit a ship)


      //need togic to check if any of the adjacent squares already contain the SHOT-MISS class, and update the array accordingly 

      //need to make sure it cannot randomly target the line above or bellow if ship is on the edge

      console.log('the possible array positions ',possibleArrayPositions)
      
      if (possibleArrayPositions.length === 4){ //logic for the first hit- only time that the array will contain 4 items 
        const targetLikelyRandomPlayerCell = Math.floor(Math.random() * 4)
        console.log('the seccond step of the computers logic is selected!') 
        console.log('target likely random player cell',targetLikelyRandomPlayerCell)
        

        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-hit')
          // possibleArrayPositions.splice(targetLikelyRandomPlayerCell, targetLikelyRandomPlayerCell + 1)

          //*********************************** checking for a vertical match works!  */
          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
            // console.log('this is a vertical match') 

            //* creting a new array if the next smart shot is a hit (vertical ) THIS DOENTS WORK! NEEDS TO BE IF HIT...
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === 10){
              console.log('this is the positive match === +10 ')
              possibleArrayPositions = [originalArrayPosition - 20 , originalArrayPosition + 10 ]
              console.log('new array positions (2 options)', possibleArrayPositions)
            } else if (originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === -10){
              console.log('this is the negative match === -10 ')
              possibleArrayPositions = [originalArrayPosition + 20 ,  originalArrayPosition - 10]
              console.log('new array positions (2 options)', possibleArrayPositions)
            }
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')) {
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === 1){
              console.log('the adjacent square is to the left')
              possibleArrayPositions = [originalArrayPosition - 2 ,  originalArrayPosition + 1]
            } else if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === -1){
              console.log('the adjacent square is to the right')
              possibleArrayPositions = [originalArrayPosition + 2 ,  originalArrayPosition - 1]
            } 
          }
        } else {
          //logic here is flawed- it doesn not work for miss left or miss bottom 
          console.log('this is the splice and slicer ')
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell, 1 )
          // console.log('new array positions ', possibleArrayPositions)
        }
        //randomly choose an item from the created array
        
        console.log('original array position', originalArrayPosition)
        console.log('new array positions ', possibleArrayPositions)
        
      } else if (possibleArrayPositions.length === 3 ){ // logic for if the array contains three numbers 

        //*****************creation of an array of two i think is wrong here */

        const targetLikelyRandomPlayerCell3 = Math.floor(Math.random() * 3)
        // console.log('the seccond step of the computers logic is selected!') 
        // console.log('target likely random player cell',targetLikelyRandomPlayerCell3)
        
        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.add('shot-hit')
          // possibleArrayPositions.splice(targetLikelyRandomPlayerCell3, 1 )

          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) - originalArrayPosition === 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) - originalArrayPosition === -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.contains('ship')){
            
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML)  === 10){
              console.log('this is the positive match === +10 ')
              possibleArrayPositions = [originalArrayPosition - 20 , originalArrayPosition + 10 ]
              console.log('new array positions (2 options)', possibleArrayPositions)
            } else if (originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML)  === -10){
              console.log('this is the negative match === -10 ')
              possibleArrayPositions = [originalArrayPosition + 20 ,  originalArrayPosition - 10]
              console.log('new array positions (2 options)', possibleArrayPositions)
            }

          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) - originalArrayPosition === 1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) - originalArrayPosition === -1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.contains('ship')) {

            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) === 1){
              console.log('the adjacent square is to the left')
              possibleArrayPositions = [originalArrayPosition - 2 ,  originalArrayPosition + 1]
            } else if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].innerHTML) === -1){
              console.log('the adjacent square is to the right')
              possibleArrayPositions = [originalArrayPosition + 2 ,  originalArrayPosition - 1]
            } 
          }
        } else {
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell3]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell3, 1 )
          console.log('possible array positions hit miss miss', possibleArrayPositions)
        }

        //***********************logic for is the array has a length of two */
      } else if ( possibleArrayPositions.length === 2){ //logic for array of length 2
        const targetLikelyRandomPlayerCell2 = Math.floor(Math.random() * 2)
        // console.log('the 2.LENGTH step of the computers logic is selected!') 
        // console.log('target likely random player cell',targetLikelyRandomPlayerCell2)
        
        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.add('shot-hit')
 
          //******this checks if the ship is vertical or horizontal  */
          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition >= 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition <= -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.contains('ship')){

            if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  >= 10) {
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell2 , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) + 10))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  < 10){
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell2 , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - 10))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            }
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition < 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition >= -9 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.contains('ship')) {

            if(parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  < 10 ) {
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell2 , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) + 1))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)

            } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - originalArrayPosition  >= -9 ){
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell2 , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].innerHTML) - 1))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            }
          }
        } else {
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell2]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell2, 1 )
          console.log('possible array positions after length of 2', possibleArrayPositions)
        }
      } else if (possibleArrayPositions.length === 1){

        if (targetPlayerCell[possibleArrayPositions].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions].classList.add('shot-hit')
          if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= 10 && targetPlayerCell[possibleArrayPositions].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition <= -10 && targetPlayerCell[possibleArrayPositions].classList.contains('ship')){
            // console.log('this is a vertical ship!!')

            if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= 10){
              possibleArrayPositions = [parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) + 10]
              // console.log('NEW ARRAY FOR VERTICAL SHIP', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  < 10){
              possibleArrayPositions = [parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - 10]
              console.log('NEW ARRAY FOR VERTICAL SHIP', possibleArrayPositions)
          } 
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition < 10 || parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= -9 ){

            if(parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  < 10 ){
              possibleArrayPositions = [(parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) + 1)]
              console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER +1', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= -9 ){
              possibleArrayPositions =  [(parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - 1)]
              console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER -1 ', possibleArrayPositions)
            }
          }
        } else {
          targetPlayerCell[possibleArrayPositions].classList.add('shot-miss')
          possibleArrayPositions = null
          console.log('possible array positions after length of 2', possibleArrayPositions)
        }
      }

    } else { //this else prevents the rest of the function randomly choosing squares when there is a hit, but before the ship is destroyed 
      const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
      targetRandomPlayerCellGlobal = targetRandomPlayerCell
      const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random number has already been chosen 
      if (!chosenAlready){ //If statement runs function again if random number has been chosen before
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
            } 
            if (playerCarriershipLives === 0){
              console.log('players carrier ship has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-battleship')){
            playerBattleshipLives--
            if(possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerBattleshipLives === 0){
              console.log('players battleship has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-destroyer')){
            playerDestroyerLives--
            if(possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerDestroyerLives === 0){
              console.log('players destroyer has been destroyed ')
              
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-submarine')){
            playerSubmarineLives--
            if(possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerSubmarineLives === 0){
              console.log('players submarine has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-patrol')){
            playerPatrolLives--
            if(possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
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


    
  } //this is the badger!
  targetComputerCell.forEach(button =>{
    button.addEventListener('click',shootAtComputer)  //****************reactivate shooting here  */
  })

  
  

 




















}


window.addEventListener('DOMContentLoaded', init )