//Variable Declaration
const deck = document.querySelector('.deck');
const moves=document.querySelector('.moves');
const restart=document.querySelector('.restart');
const timer=document.querySelector('.timer');
const pop = document.getElementById('popupContainer');
const star=document.querySelector('.stars');
let previousNode,currentNode,firstClick,beginStatus,timerStatus,completed,counter,second, minute,interval;
let cards;

//call init function when loading the page
document.body.onload = init();

//add event liteners
deck.addEventListener('click',displayCard);
restart.addEventListener('click',restartGame);

/**
* @description Initializes variables and shuffles the array for deck of cards
*/
 function init() {
     /*
      * Create a list that holds all of your cards
      */
     let varCard=['fa fa-diamond',
                    'fa fa-paper-plane-o',
                    'fa fa-anchor',
                    'fa fa-bolt',
                    'fa fa-cube',
                    'fa fa-anchor',
                    'fa fa-leaf',
                    'fa fa-bicycle',
                    'fa fa-diamond',
                    'fa fa-bomb',
                    'fa fa-leaf',
                    'fa fa-bomb',
                    'fa fa-bolt',
                    'fa fa-bicycle',
                    'fa fa-paper-plane-o',
                    'fa fa-cube'];
     const frag=document.createDocumentFragment();
     //Initialize the variables
     timerStatus='true';
     firstClick='false';
     beginStatus='false';
     counter=0;
     second = 0;
     minute = 0;
     completed='false';
     cards=[];
     //Shuffle the array that will be used to build the cards
     varCard=shuffle(varCard);
     //create the html structure for the cards
     for(let i=0;i<16;i++){
         const newListItem=document.createElement('li');
         newListItem.className='card';
         const newItem=document.createElement('i');
         newItem.className=varCard[i];
         newListItem.appendChild(newItem);
         frag.appendChild(newListItem);
      }
    deck.appendChild(frag);
    const frag1=document.createDocumentFragment();
    for(let j=0;j<3;j++){
        const newListItem=document.createElement('li');
        const newItem=document.createElement('i');
        newItem.className='fa fa-star';
        newListItem.appendChild(newItem);
        frag1.appendChild(newListItem);
     }
   deck.appendChild(frag);
   star.appendChild(frag1);
  }

 /**
 * @description Restarts the game by removing the deck of card from the screen and also resetting the variables
 */
function restartGame(){
  //Delete all the child nodes and re invoke the init method
    let children = deck;
    while(deck.hasChildNodes())
        deck.removeChild(deck.lastChild);
    //Stop the Timer clock
    clearInterval(interval);
    moves.innerText=0;
    timer.innerHTML = '0min 0secs';
    pop.classList.remove("show");
    init();
}

/**
* @description Handle the timer display which will be updated every second.
*/
 function startTimer(){
     interval = setInterval(function(){ //this function will be executed every 1 sec
         timer.innerHTML = minute+"mins "+second+"secs";
         second++;
         if(second == 60){
             minute++;
             second = 0;
         }
         if(minute == 60){
             hour++;
             minute = 0;
         }
     },1000);
 }

 /**
 * @description Shuffle a given array and return the same
 * @param {Array} of Strings
 * @returns {Array} of Strings shuffled
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
* @description Remove the cards from the array of cards
*/
function popoutCards(){
  cards.pop();
  cards.pop();
}

/**
* @description Display the cards which have a matching
*/
function showMatchCards(){
    for(let k=0;k<cards.length; k++)
        cards[k].className='card match';
    popoutCards();
}

/**
* @description Hide the cards as there is no matching
*/
function noMatchCards(){
  showCards();
  setTimeout(function tempFunc(){
        cards[0].className='card';
        cards[1].className='card';
        popoutCards();
         },500);
}


/**
* @description Check if the cards have a matching
*/
function matchCards(){
    if(cards[0].firstElementChild.className===cards[1].firstElementChild.className)
        showMatchCards();
    else
        noMatchCards();
  }

/**
* @description Display cards
*/
function showCards(){
  for(let k=0;k<cards.length; k++)
      cards[k].className='card open show';
}

/**
* @description Check for each card as clicked
*/
function cardOpen(){
    //Display the moves
    counter++;
    moves.innerText=counter;
    if(cards.length==1){ //First card clicked
        showCards();
  }
  else if(cards.length==2){//Second card clicked
      matchCards();
  }
  if(counter==20||counter==30||counter==40) //3 stars for moves less than 20, 2 for less than 30
      updateStars();          //1 for less than 40 and 0 for more than 40
}

/**
* @description Event to update the stars
*/
function updateStars(){
    if(star.hasChildNodes())
      star.removeChild(star.lastChild);
}


/**
* @description Event to listen for the clicks of the card
*/
function displayCard(event){
  //start the timer if not started yet
  if(timerStatus=='true'){
      startTimer();
      timerStatus='false';
  }
  if(event.target.className=='card') {
        cards.push(event.target);
        cardOpen();
  }

  if(completed=='false')
      isCompleted();
}

/**
* @description Verify if all the 16 cards has been matched
*/
function isCompleted(){
    let children = deck.childNodes;
    let counterComp=0;
    for(child in children){
        if(children[child].className=='card match')
        counterComp++;
    }
    if(counterComp>=16)    {
        clearInterval(interval);
        completed='true';
        const mov=document.getElementById('finalMove');
        mov.innerText=counter;
        const tim=document.getElementById('totalTime');
        tim.innerText= timer.innerHTML;
        pop.classList.add("show");
        //declare star rating variable
      }

    //showing move, rating, time
    closePop();
}

/**
* @description Close the popup message
*/
function closePop(){
    let closeicon = document.querySelector(".close");
    closeicon.addEventListener("click", function(e){
        pop.classList.remove("show");
    });
}



/* End of the Program */
