

function init(){
  const startButton = document.querySelector('.start-game')
  const bannerMessage = document.querySelector('.banner-message')
  const rules = document.querySelector('.rules')
  const yAxis = document.querySelector('.y-axis')
  const xAxis = document.querySelector('.x-axis')
  const overlay = document.querySelector('.overlay-page1')
  const reMatchButton = document.querySelector('.Reload-page')
  const reMatchOverlay = document.querySelector('.overlay-win-screen')



  const backgroundMusic = document.querySelector('.background-music')
  const backgroundAudio = document.querySelector('#background-music')
  
  
  

  startButton.addEventListener('click', handleStartButton)
  reMatchButton.addEventListener('click', handleNewGameButton)

  //**** creating the landing page  */

  yAxis.classList.add('hidden')
  xAxis.classList.add('hidden')
  reMatchOverlay.classList.add('hidden') 


  
  function handleNewGameButton(){
    window.location.reload()
  }
  
  

  function handleStartButton(){
    
    bannerMessage.innerHTML = 'Place your pieces!'

    rules.classList.add('hidden')
    yAxis.classList.remove('hidden')
    xAxis.classList.remove('hidden')
    startButton.classList.add('hidden')
    overlay.classList.add('hidden')


  }

  const makeIt = document.querySelector('.make-it')
  const makeItAudio = document.getElementById('make-it')

  function playMakeItAudio() {
    makeItAudio.src = './assets/background.wav'
    makeItAudio.play()
    document.getElementById('make-it').loop = true
  }
  makeIt.addEventListener('click', playMakeItAudio)

  
  
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
  

 

  const addCarrierShip = document.querySelector('.add-carriership')
  const addBattleship = document.querySelector('.add-battleship')
  const addDestroyer = document.querySelector('.add-destroyer')
  const addSubmarine = document.querySelector('.add-submarine')
  const addPatrol = document.querySelector('.add-patrol')
  const addingPlayerPieces = document.querySelectorAll('.playerCell')
  const addingComputerPieces = document.querySelectorAll('.computerCell')


  //*Adding the players ships 



  function insertingPlayerBattleship (event){ //function to place the ships 

    if (event.target.classList.contains('mouse-hover-invalid')){ //*logic to prevent the ship being added if it is in the wrong place!

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
    for ( let i = 0; i < shipClassToAdd.length; i ++){
      shipClassToAdd.array.push([parseFloat(arrayStarrtingPoint) + i * vertOrHoriz] ) 
      playerProjectedPosition.push([parseFloat(arrayStarrtingPoint) + i * vertOrHoriz] ) 
    }

    // console.log('player projected position', playerProjectedPosition)
    
      
    shipClassToAdd.array.forEach( array => {       
      for (let i = 0; i < array.length; i++){
        addingPlayerPieces[array[i]].classList.add(addClassOfShip)
        addingPlayerPieces[array[i]].classList.add(shipStylingToAdd)
        addingPlayerPieces[array[i]].classList.remove('ship-outline')
        
      }
    })
    addComputerShips()
    shipClassToAdd = 0
  }
  //* ADDING COMPUTER SHIPS
  const computerShipPosition = [] //keeps track of the computers ships positions 
  // console.log('all ships positions', computerShipPosition)

  function addComputerShips(){
    //     const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
    //     const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random 
    //consts for the function to work 
    
    const randomShipStart = Math.floor(Math.random() * gridCellCount)
    console.log('Random Ship Start',randomShipStart)
    shipClassToAdd.array = []
    const shipsprojectedPosition = []
    console.log('ships projected position', shipsprojectedPosition)
    const randomAxis = Math.floor(Math.random() * 10)
    let shipToVert = 0
    const placedAlready = computerShipPosition.includes(randomShipStart) //finds if contains random start position

    if (!placedAlready){ //*if statement start for spotting ships being placed at the start 
      
      if (randomAxis % 2 === 0){
        shipToVert = gridWidth
      } else {
        shipToVert = 1
      }
      for ( let i = 0; i < shipClassToAdd.length; i ++){    
        if (computerShipPosition.includes(randomShipStart + (i * shipToVert))){ //*code to prevent ships from stacking on computer grid
          // console.log('ships are intersecting')
          return addComputerShips()
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

      console.log('target comupter cell ranfom ship start',targetComputerCell[randomShipStart])

      if (lastItemInArray > 99 || seccondLastItemInArray % gridWidth === 9 || thirdLastItemInArray % gridWidth === 9  || fourthLastItemInArray % gridWidth === 9 || fifthLastItemInArray % gridWidth === 9){    // stops the ships from going over the bottom edge
        return addComputerShips()
      } else if (targetComputerCell[randomShipStart] < 99 && targetComputerCell[(randomShipStart + 1)].classList.contains('ship') || targetComputerCell[randomShipStart] > 0 && targetComputerCell[(randomShipStart - 1)].classList.contains('ship') || targetComputerCell[randomShipStart] < 90 && targetComputerCell[randomShipStart + 10].classList.contains('ship') ||  targetComputerCell[randomShipStart] > 9 && targetComputerCell[randomShipStart - 10].classList.contains('ship')){
        return addComputerShips()
      } else if (targetComputerCell[lastItemInArray] < 99 && targetComputerCell[(lastItemInArray + 1)].classList.contains('ship') || targetComputerCell[lastItemInArray] > 0 && targetComputerCell[(lastItemInArray - 1)].classList.contains('ship') || targetComputerCell[lastItemInArray] < 90 && targetComputerCell[(lastItemInArray + 10)].classList.contains('ship') ||  targetComputerCell[lastItemInArray] > 9 && targetComputerCell[(lastItemInArray - 10)].classList.contains('ship')){
        return addComputerShips()
      } else if (targetComputerCell[seccondLastItemInArray] < 99 && targetComputerCell[(seccondLastItemInArray + 1)].classList.contains('ship') || targetComputerCell[seccondLastItemInArray] > 0 && targetComputerCell[(seccondLastItemInArray - 1)].classList.contains('ship') || targetComputerCell[seccondLastItemInArray] < 90 && targetComputerCell[(seccondLastItemInArray + 10)].classList.contains('ship') ||  targetComputerCell[seccondLastItemInArray] > 9 && targetComputerCell[(seccondLastItemInArray - 10)].classList.contains('ship')){
        return addComputerShips()
      } else if (targetComputerCell[thirdLastItemInArray] < 99 && targetComputerCell[(thirdLastItemInArray + 1)].classList.contains('ship') || targetComputerCell[thirdLastItemInArray] > 0 && targetComputerCell[(thirdLastItemInArray - 1)].classList.contains('ship') || targetComputerCell[thirdLastItemInArray] < 90 && targetComputerCell[(thirdLastItemInArray + 10)].classList.contains('ship') ||  targetComputerCell[thirdLastItemInArray] > 9 && targetComputerCell[(thirdLastItemInArray - 10)].classList.contains('ship')){
        return addComputerShips()
      } else if (targetComputerCell[fourthLastItemInArray] < 99 && targetComputerCell[(fourthLastItemInArray + 1)].classList.contains('ship') || targetComputerCell[fourthLastItemInArray] > 0 && targetComputerCell[(fourthLastItemInArray - 1)].classList.contains('ship') || targetComputerCell[fourthLastItemInArray] < 90 && targetComputerCell[(fourthLastItemInArray + 10)].classList.contains('ship') ||  targetComputerCell[fourthLastItemInArray] > 9 && targetComputerCell[(fourthLastItemInArray - 10)].classList.contains('ship')){
        return addComputerShips()
      } else if (targetComputerCell[fifthLastItemInArray] < 99 && targetComputerCell[(fifthLastItemInArray + 1)].classList.contains('ship') || targetComputerCell[fifthLastItemInArray] > 0 && targetComputerCell[(fifthLastItemInArray - 1)].classList.contains('ship') || targetComputerCell[fifthLastItemInArray] < 90 && targetComputerCell[(fifthLastItemInArray + 10)].classList.contains('ship') ||  targetComputerCell[fifthLastItemInArray] > 9 && targetComputerCell[(fifthLastItemInArray - 10)].classList.contains('ship')){
        return addComputerShips()
      } else {   //*** put the conditions in hers as an else-if */
        shipClassToAdd.array.forEach(array =>{
          for (let i = 0; i < array.length; i++){
            addingComputerPieces[array].classList.add(addClassOfShip) 
            addingComputerPieces[array].classList.add(compShipStylingToAdd) 
          }
        })        
      }

      

      // else if ( targetPlayerCell[parseFloat(event.target.innerText) + 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) + 10].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 10].classList.contains('ship')){
      //   event.target.classList.add('mouse-hover-invalid')
      // } else if ( targetPlayerCell[lastItem + 1].classList.contains('ship') || targetPlayerCell[lastItem - 1].classList.contains('ship') || targetPlayerCell[lastItem + 10].classList.contains('ship') || targetPlayerCell[lastItem - 10].classList.contains('ship')){
      //   event.target.classList.add('mouse-hover-invalid')
      // }

    } else {
      // console.log('starting on square with ship') //*end of if statement stopping ships starting on a square containing another ship
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
    bannerMessage.innerHTML = 'You are now placing your Carriership!'
    
  }
  function handleAddBattleship(){
    shipClassToAdd = playerBattleship
    shipStylingToAdd = 'place-battleship'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-battleship'
    addBattleship.classList.add('hidden')
    bannerMessage.innerHTML = 'You are now placing your Battleship!'
    
  } 
  function handleAddDestroyer(){    
    shipClassToAdd = playerDestroyer
    shipStylingToAdd = 'place-destroyer'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-destroyer'
    addDestroyer.classList.add('hidden')
    bannerMessage.innerHTML = 'You are now placing your Destroyer!'
  }
  function handleAddSumbarine(){    
    shipClassToAdd = playerSubmarine
    shipStylingToAdd = 'place-submarine'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-submarine'
    addSubmarine.classList.add('hidden')
    bannerMessage.innerHTML = 'You are now placing your Submarine !'
  }
  function handleAddPatrol(){    
    shipClassToAdd = playerPatrol
    shipStylingToAdd = 'place-patrol'
    addClassOfShip = 'ship'
    compShipStylingToAdd = 'place-comp-patrol'
    addPatrol.classList.add('hidden')
    bannerMessage.innerHTML = 'You are now placing your Patrol Boat!'
    
  }


  //this is the function for hovering over the board- //****need to be able to add the whole ship ************* WORKING HERE ******

  // const lastItemInArray =  shipClassToAdd.array[ (shipClassToAdd.array.length - 1) ]

  

  
  

  function displayingPlayerBattleship(event){ //***** this contains the logic to prevent the players ships going over the bottom/side borders */ 
    event.target.classList.add('mouse-hover')
    
    // console.log('this is working')
    // const lastItemInArray =  playerProjectedPosition[ (playerProjectedPosition.length - 1) ]
    if (shipClassToAdd.length > 0){
      // console.log('event.target',event.target)

      // ** consts needed to make sure that player can only add ships if sdhering to certain conditions 
      const lastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length - 1))  )
      const secondLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length - 2))  )
      const thirdLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length - 3))  )
      const fourthLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length - 4))  )
      const fifthLastItemVert = (parseFloat(event.target.innerText) + (gridWidth * (shipClassToAdd.length - 5))  )
      // console.log(lastItemVert)
      const lastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 1
      const secondLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 2
      const thirdLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 3
      const fourthLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 4
      const fifthLastItem = parseFloat(event.target.innerText) + shipClassToAdd.length - 5

    
      if (shipClassToAdd.direction === 'right'){ //*conditions for player placing the ships horizontally 

        for (let i = 0; i < shipClassToAdd.length; i++){
          targetPlayerCell[parseFloat(event.target.innerText) + (i )].classList.add('ship-outline')
        }
        if (addingPlayerPieces[lastItem].classList.contains('ship') && lastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[secondLastItem].classList.contains('ship') && secondLastItem >= parseFloat(event.target.innerText)  || addingPlayerPieces[thirdLastItem].classList.contains('ship') && thirdLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fourthLastItem].classList.contains('ship') && fourthLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fifthLastItem].classList.contains('ship') && fifthLastItem >= parseFloat(event.target.innerText) ){
          event.target.classList.add('mouse-hover-invalid')
        } else if (secondLastItem % gridWidth === 9 || thirdLastItem >= parseFloat(event.target.innerText) && thirdLastItem % gridWidth === 9 || fourthLastItem >= parseFloat(event.target.innerText) && fourthLastItem % gridWidth === 9 || fifthLastItem >= parseFloat(event.target.innerText) && fifthLastItem % gridWidth === 9){
          // console.log('array is going over the edge')
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[parseFloat(event.target.innerText) + 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) + 10].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[lastItem + 1].classList.contains('ship') || targetPlayerCell[lastItem - 1].classList.contains('ship') || targetPlayerCell[lastItem + 10].classList.contains('ship') || targetPlayerCell[lastItem - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[secondLastItem + 1].classList.contains('ship') || targetPlayerCell[secondLastItem - 1].classList.contains('ship') || targetPlayerCell[secondLastItem + 10].classList.contains('ship') || targetPlayerCell[secondLastItem - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        }  else {
          event.target.classList.add('mouse-hover')

          for (let i = 0; i < shipClassToAdd.length; i++){
            targetPlayerCell[parseFloat(event.target.innerText) + i].classList.add('ship-outline')
          }
        }
      } else if (shipClassToAdd.direction === 'vert'){           //* conditions for playe placing ship verically 

  
        if (lastItemVert >= 99){
          event.target.classList.add('mouse-hover-invalid')
        } 

        for (let i = 0; i < shipClassToAdd.length; i++){
          targetPlayerCell[parseFloat(event.target.innerText) + (i * gridWidth)].classList.add('ship-outline')
        }

        
        // console.log('last item vert',typeof(lastItemVert))
        if (addingPlayerPieces[lastItemVert].classList.contains('ship') || addingPlayerPieces[secondLastItemVert].classList.contains('ship') || addingPlayerPieces[thirdLastItemVert].classList.contains('ship') && thirdLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fourthLastItemVert].classList.contains('ship') && fourthLastItem >= parseFloat(event.target.innerText) || addingPlayerPieces[fifthLastItemVert].classList.contains('ship') && fifthLastItem >= parseFloat(event.target.innerText) ){
          // console.log('vertical ship category selector ')
          event.target.classList.add('mouse-hover-invalid')
        } else if (lastItemVert >= 99){
          console.log('gone over the bottom ')
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[parseFloat(event.target.innerText) + 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 1].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) + 10].classList.contains('ship') || targetPlayerCell[parseFloat(event.target.innerText) - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[lastItemVert + 1].classList.contains('ship') || targetPlayerCell[lastItemVert - 1].classList.contains('ship') || targetPlayerCell[lastItemVert + 10].classList.contains('ship') || targetPlayerCell[lastItemVert - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        } else if ( targetPlayerCell[secondLastItemVert + 1].classList.contains('ship') || targetPlayerCell[secondLastItemVert - 1].classList.contains('ship') || targetPlayerCell[secondLastItemVert + 10].classList.contains('ship') || targetPlayerCell[secondLastItemVert - 10].classList.contains('ship')){
          event.target.classList.add('mouse-hover-invalid')
        } else {
          event.target.classList.add('mouse-hover')
          for (let i = 0; i < shipClassToAdd.length; i++){
            targetPlayerCell[parseFloat(event.target.innerText) + (i * gridWidth)].classList.add('ship-outline')
          }
        }
      }
    }
  }
  //*event listeners for adding and removing players ships
  function removingPlayerBattleship(event){


    // console.log('this is working')
    event.target.classList.remove('mouse-hover')
    event.target.classList.remove('mouse-hover-invalid')
    for (let i = 0; i < shipClassToAdd.length; i++){
      targetPlayerCell[parseFloat(event.target.innerText) + i].classList.remove('ship-outline')
    }

    for (let i = 0; i < shipClassToAdd.length; i++){
      targetPlayerCell[parseFloat(event.target.innerText) + (i * gridWidth)].classList.remove('ship-outline')
    }

 
   
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
  console.log('COMPUTER SHOT AT ID',computerShotAtID)
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
        
        event.target.classList.add('shot-hit')
        playerShotAtID.push(parseFloat(event.target.innerHTML))
        
        if (event.target.classList.contains('place-comp-carriership')){  //*series of if statements to determine what ship has been hit 
          compCarriership--
          bannerMessage.innerHTML = 'You have hit the computers carriership'
          //can add messags in here - you have hit the enemyss battleship etc. 
          if (compCarriership === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('carrier ship dead ')
            bannerMessage.innerHTML = 'The computers carriership is desroyed!'
          }
        } else if (event.target.classList.contains('place-comp-battleship')){
          compBattleship--
          bannerMessage.innerHTML = 'You have hit the computers battleship'
          if (compBattleship === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('BATTLESHIP dead ')
            bannerMessage.innerHTML = 'The computers battleship is destroyed!'
          }
        } else if (event.target.classList.contains('place-comp-destroyer')){
          compDestroyer--
          bannerMessage.innerHTML = 'You have hit the computers destroyer'
          if (compDestroyer === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('destroyer dead ')
            bannerMessage.innerHTML = 'The computers destroyer is destroyed!!'
          }
        } else if (event.target.classList.contains('place-comp-submarine')){
          compSubmarine--
          bannerMessage.innerHTML = 'You have hit the computers submarine'
          if (compSubmarine === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('carrier ship dead ')
            bannerMessage.innerHTML = 'The computers submarine is destroyed '
          }
        } else if (event.target.classList.contains('place-comp-patrol')){
          compPatrol--
          bannerMessage.innerHTML = 'You have hit the computers patrol boat'
          if (compPatrol === 0){ //***********************THIS IFSTATEMNT WILL BE USEFUL LATER- ADDING MESSAGES TO THE MESSAGE BOARD ****************/
            console.log('partol ship dead ')
            bannerMessage.innerHTML = 'The computers patrol boat is destroyed '
          }
        }
      } else {
        event.target.classList.add('shot-miss') 
        playerShotAtID.push(parseFloat(event.target.innerHTML))
      }

    } else {
      // console.log('you have already selected this square')
      return shootAtComputer() //this restarts the function 
    }


    bannerMessage.innerHTML = ('Your opponent is thinking!')
    setTimeout(()=>{
      bannerMessage.innerHTML = ('Your opponent missed, your turn!')

      shootAtPlayer() 
      
    }, 1000)
    //once the function has run successfully (not had the same sqaure clicked on more than once), the funtion for the computer shooting runs //* maybe put a timer on here



    
  }
  //*computer randomly shoots at player after every click 

  //* the consts for the players ships lives 
  let playerCarriershipLives = 5 
  let playerBattleshipLives = 4
  let playerDestroyerLives = 3
  let playerSubmarineLives = 3      
  let playerPatrolLives = 2

  

  const winMessage = document.querySelector('.win-message')

  function checkForWinner (){ //FUNCTION TO CEHCK FOR WINNER 
    if (playerCarriershipLives === 0 && playerBattleshipLives === 0 && playerDestroyerLives === 0 && playerSubmarineLives === 0 &&  playerPatrolLives === 0){
      console.log('THE COMPUTER IS VICTORIOUS')
      reMatchOverlay.classList.remove('hidden')
      winMessage.innerHTML = 'The computer is victorious! Do you want a rematch?'
    }

    if (compCarriership === 0 && compBattleship === 0 && compDestroyer === 0 && compSubmarine === 0 && compPatrol === 0){
      console.log('PLAYER IS VICTORIOUS ')
      reMatchOverlay.classList.remove('hidden')
      winMessage.innerHTML = 'You are victorious! Do you want to try your luck again?'

    }
  }
  //* arrays for non-random shooting from computer 
  let originalArrayPosition = null
  let possibleArrayPositions = null
  
  let targetRandomPlayerCellGlobal = null

  //* storing the randomly shot at div
  let thisIsWhatINeedToTest = null

  function keepinfTrackOfPlayerLives(){


    if ( thisIsWhatINeedToTest.classList.contains('place-carriership')){
      playerCarriershipLives--
      bannerMessage.innerHTML = 'The computer has hit your carriership!'
      console.log('THIS IS THE LIVES LEFT AT THE END OF THE FUNCTION RUNNING', playerCarriershipLives)
      if (playerCarriershipLives === 0){
        bannerMessage.innerHTML = 'Watch out! The computer has sunk your carriership!'
        possibleArrayPositions = null
      }
    }  else if ( thisIsWhatINeedToTest.classList.contains('place-battleship')){
      playerBattleshipLives--
      bannerMessage.innerHTML = 'The computer has hit your battleship!'
      console.log('THIS IS THE LIVES LEFT AT THE END OF THE FUNCTION RUNNING', playerBattleshipLives)
      if (playerBattleshipLives === 0){
        bannerMessage.innerHTML = 'Watch out! The computer has sunk your battleship!'
        possibleArrayPositions = null
      }
    }  else if ( thisIsWhatINeedToTest.classList.contains('place-destroyer')){
      playerDestroyerLives--
      bannerMessage.innerHTML = 'The computer has hit your destroyer!'
      console.log('THIS IS THE LIVES LEFT AT THE END OF THE FUNCTION RUNNING', playerDestroyerLives)
      if (playerDestroyerLives === 0){
        bannerMessage.innerHTML = 'Watch out! The computer has sunk your destroyer!'
        possibleArrayPositions = null
      }
    }  else if ( thisIsWhatINeedToTest.classList.contains('place-submarine')){
      playerSubmarineLives--
      bannerMessage.innerHTML = 'The computer has hit your submarine!'
      console.log('THIS IS THE LIVES LEFT AT THE END OF THE FUNCTION RUNNING', playerSubmarineLives)
      if (playerSubmarineLives === 0){
        bannerMessage.innerHTML = 'Watch out! The computer has sunk your submarine!'
        possibleArrayPositions = null
      }
    }  else if ( thisIsWhatINeedToTest.classList.contains('place-patrol')){
      playerPatrolLives--
      bannerMessage.innerHTML = 'The computer has hit your patrol boat!'
      console.log('THIS IS THE LIVES LEFT AT THE END OF THE FUNCTION RUNNING', playerPatrolLives)
      if (playerPatrolLives === 0){
        bannerMessage.innerHTML = 'Watch out! The computer has sunk your patrol boat!'
        possibleArrayPositions = null
      }
    }  
    checkForWinner()
  }
  
  
  





  //*functions for non-rnadom computer shooting 

  function createFirstChoiceArray (){
    originalArrayPosition = targetRandomPlayerCellGlobal

    possibleArrayPositions = [(targetRandomPlayerCellGlobal + 1), (targetRandomPlayerCellGlobal - 1), (targetRandomPlayerCellGlobal + gridWidth), (targetRandomPlayerCellGlobal - gridWidth) ] 

    // if (!targetPlayerCell[targetRandomPlayerCellGlobal + 1].classList.contains('shot-miss')){
    //   possibleArrayPositions = [(targetRandomPlayerCellGlobal + 1)]
    // }
    // if (!targetPlayerCell[targetRandomPlayerCellGlobal - 1 ].classList.contains('shot-miss')){
    //   possibleArrayPositions.push((targetRandomPlayerCellGlobal - 1))
    // }
    // if (!targetPlayerCell[targetRandomPlayerCellGlobal + gridWidth].classList.contains('shot-miss')){
    //   possibleArrayPositions.push((targetRandomPlayerCellGlobal + gridWidth))
    // }
    // if (!targetPlayerCell[targetRandomPlayerCellGlobal - gridWidth].classList.contains('shot-miss')){
    //   possibleArrayPositions.push((targetRandomPlayerCellGlobal - gridWidth))
    // }

    checkForWinner()

  
    //Logic to create an array of possible options
    // console.log('possible array postions', possibleArrayPositions)
  }

  function shootAtPlayer(){
    // console.log('THIS IS WHAT I NEED TO TEST  ',thisIsWhatINeedToTest)
    
   

    if (possibleArrayPositions !== null){ 

      
      
      
      

      //*************this lags by 1 life, and needs more conditions  */
      


      //need togic to check if any of the adjacent squares already contain the SHOT-MISS class, and update the array accordingly 

      //need to make sure it cannot randomly target the line above or bellow if ship is on the edge

      // console.log('the possible array positions ',possibleArrayPositions)
      
      if (possibleArrayPositions.length === 4){ //logic for the first hit- only time that the array will contain 4 items 
        const targetLikelyRandomPlayerCell = Math.floor(Math.random() * 4)

       
        // console.log('the seccond step of the computers logic is selected!') 
        // console.log('target likely random player cell',targetLikelyRandomPlayerCell)
      
        thisIsWhatINeedToTest = targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]]
        
        // console.log('IS THIS THE VALUE OF THE CELL, OR SOMETHING ELSE?',thisIsWhatINeedToTest)
        

        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-hit')

          keepinfTrackOfPlayerLives()
          
  
          //*********************************** checking for a vertical match works!  */
          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){

            
            //**************** create a function that i can add to this location in all the arguments that tracks lives *************/
            
            
            //* creting a new array if the next smart shot is a hit (vertical ) 
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === 10){
              // console.log('this is the positive match === +10 ')
              possibleArrayPositions = [originalArrayPosition - 20 , originalArrayPosition + 10 ]
              // console.log('new array positions (2 options)', possibleArrayPositions)
            } else if (originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === -10){
              // console.log('this is the negative match === -10 ')
              possibleArrayPositions = [originalArrayPosition + 20 ,  originalArrayPosition - 10]
              // console.log('new array positions (2 options)', possibleArrayPositions)
            }
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')) {
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === 1){
              // console.log('the adjacent square is to the left')
              possibleArrayPositions = [originalArrayPosition - 2 ,  originalArrayPosition + 1]
            } else if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === -1){
              // console.log('the adjacent square is to the right')
              possibleArrayPositions = [originalArrayPosition + 2 ,  originalArrayPosition - 1]
            } 

          }
        } else {         
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell, 1 )
          // console.log('new array positions ', possibleArrayPositions)
        }
        //randomly choose an item from the created array
        
        // console.log('original array position', originalArrayPosition)
        // console.log('new array positions ', possibleArrayPositions)
        
      } else if (possibleArrayPositions.length === 3 ){ // logic for if the array contains three numbers 

        const targetLikelyRandomPlayerCell = Math.floor(Math.random() * 3)
        // console.log('the seccond step of the computers logic is selected!') 
        // console.log('target likely random player cell',targetLikelyRandomPlayerCell3)

        thisIsWhatINeedToTest = targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]]
        
        // console.log('IS THIS THE VALUE OF THE CELL, OR SOMETHING ELSE?',thisIsWhatINeedToTest)
        
        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-hit')
          // possibleArrayPositions.splice(targetLikelyRandomPlayerCell3, 1 )

          keepinfTrackOfPlayerLives()
          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
            
            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === 10){
              possibleArrayPositions = [originalArrayPosition - 20 , originalArrayPosition + 10 ]
              // console.log('new array positions (2 options)', possibleArrayPositions)
            } else if (originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML)  === -10){
              possibleArrayPositions = [originalArrayPosition + 20 ,  originalArrayPosition - 10]
              // console.log('new array positions (2 options)', possibleArrayPositions)
            }

          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === 1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition === -1 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')) {

            if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === 1){
              // console.log('the adjacent square is to the left')
              possibleArrayPositions = [originalArrayPosition - 2 ,  originalArrayPosition + 1]
            } else if ( originalArrayPosition - parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) === -1){
              // console.log('the adjacent square is to the right')
              possibleArrayPositions = [originalArrayPosition + 2 ,  originalArrayPosition - 1]
            } 
          }
        } else {
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell, 1 )
          // console.log('possible array positions hit miss miss', possibleArrayPositions)
        }

        //***********************logic for is the array has a length of two */
      } else if ( possibleArrayPositions.length === 2){ //logic for array of length 2
        const targetLikelyRandomPlayerCell = Math.floor(Math.random() * 2)
        // console.log('the 2.LENGTH step of the computers logic is selected!') 
        // console.log('target likely random player cell',targetLikelyRandomPlayerCell2)
        thisIsWhatINeedToTest = targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]]
       
        // console.log('IS THIS THE VALUE OF THE CELL, OR SOMETHING ELSE?',thisIsWhatINeedToTest)
        
        if (targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-hit')
 
          keepinfTrackOfPlayerLives()
          //******this checks if the ship is vertical or horizontal  */
          if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition >= 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition <= -10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')){

            if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  >= 10) {
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) + 10))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  < 10){
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - 10))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            }
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition < 10 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition >= -9 && targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.contains('ship')) {

            if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  < 10 ) {
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) + 1))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)

            } else if (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - originalArrayPosition  >= -9 ){
              possibleArrayPositions.splice(targetLikelyRandomPlayerCell , 1, (parseFloat(targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].innerHTML) - 1))
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER + 10', possibleArrayPositions)
            }
          }
        } else {
          targetPlayerCell[possibleArrayPositions[targetLikelyRandomPlayerCell]].classList.add('shot-miss')
          possibleArrayPositions.splice(targetLikelyRandomPlayerCell, 1 )
        }
        //**************final part of the logic  */
      } else if (possibleArrayPositions.length === 1){

        thisIsWhatINeedToTest = targetPlayerCell[possibleArrayPositions]
       
        // console.log('IS THIS THE VALUE OF THE CELL, OR SOMETHING ELSE?',thisIsWhatINeedToTest)

        if (targetPlayerCell[possibleArrayPositions].classList.contains('ship')){
          targetPlayerCell[possibleArrayPositions].classList.add('shot-hit')
          keepinfTrackOfPlayerLives()
          if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= 10 && targetPlayerCell[possibleArrayPositions].classList.contains('ship') || parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition <= -10 && targetPlayerCell[possibleArrayPositions].classList.contains('ship')){
            
            

            if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= 10){
              possibleArrayPositions = [parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) + 10]
              // console.log('NEW ARRAY FOR VERTICAL SHIP', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  < 10){
              possibleArrayPositions = [parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - 10]
            } 
          } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition < 10 || parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition >= -9 ){

            if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= 1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  < 10 ){
              possibleArrayPositions = [(parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) + 1)]
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER +1', possibleArrayPositions)
            } else if (parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  <= -1 && parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - originalArrayPosition  >= -9 ){
              possibleArrayPositions =  [(parseFloat(targetPlayerCell[possibleArrayPositions].innerHTML) - 1)]
              // console.log('THIS IS CREATINA NEW ARRAY WITH TARGET NUMBER -1 ', possibleArrayPositions)
            }
          }
            
        } else {
          targetPlayerCell[possibleArrayPositions].classList.add('shot-miss')
          possibleArrayPositions = null
          checkForWinner()

        }
      }

    }  else { //this else prevents the rest of the function randomly choosing squares when there is a hit, but before the ship is destroyed 

      
      const targetRandomPlayerCell = Math.floor(Math.random() * gridCellCount)
      targetRandomPlayerCellGlobal = targetRandomPlayerCell
      const chosenAlready = computerShotAtID.includes(targetRandomPlayerCell) //checks to see if the random number has already been chosen 
      // const chosenAlreadyContainsShotHit = 
      // targetPlayerCell[targetRandomPlayerCell]

      const  chosenAlreadyContainsShotHit = targetPlayerCell[targetRandomPlayerCell].classList.contains('shot-hit')

      

      if (!chosenAlready && !chosenAlreadyContainsShotHit ){ //If statement runs function again if random number has been chosen before
        checkForWinner()
        targetPlayerCell[targetRandomPlayerCell].classList.add('shot-miss') 
        computerShotAtID.push(targetRandomPlayerCell)
        if (targetPlayerCell[targetRandomPlayerCell].classList.contains('ship')){ // ii* if computer hits any ship, styling is added 
          targetPlayerCell[targetRandomPlayerCell].classList.add('shot-hit')

          thisIsWhatINeedToTest = targetPlayerCell[targetRandomPlayerCell]
          keepinfTrackOfPlayerLives()
          // console.log('IS THIS THE VALUE OF THE CELL, OR SOMETHING ELSE?',thisIsWhatINeedToTest)

        
          
          
  
          //* this is the logic that keeps track of which ships have been shot and their lives- not locations however shich may be needed later 


          if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-carriership')){
            // playerCarriershipLives-- // decrease lives of this ship
            if (possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerCarriershipLives === 0){
              console.log('players carrier ship has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-battleship')){
            // playerBattleshipLives--
            if (possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerBattleshipLives === 0){
              console.log('players battleship has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-destroyer')){
            // playerDestroyerLives--
            if (possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerDestroyerLives === 0){
              console.log('players destroyer has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-submarine')){
            // playerSubmarineLives--
            if (possibleArrayPositions === null){ //logic to create the first array of possible outcomes
              createFirstChoiceArray()
            } 
            if (playerSubmarineLives === 0){
              console.log('players submarine has been destroyed ')
            }
          } else if (targetPlayerCell[targetRandomPlayerCell].classList.contains('place-patrol')){
            // playerPatrolLives--
            if (possibleArrayPositions === null){ //logic to create the first array of possible outcomes
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

  } 
  targetComputerCell.forEach(button =>{
    button.addEventListener('click',shootAtComputer)  //****************reactivate shooting here  */
  })


  
  
  

 




  
  

}


window.addEventListener('DOMContentLoaded', init )