'use strict';

console.log ('what up!');

// Global Variables

let votesAllowed = 25; // decrement -- to end voting round

//Product storage

let allProducts = [];

//DOM REFERENCES

let myContainer = document.getElementById('container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
// console.log(imgOne);
let resultsBtn = document.getElementById('show-results-btn');
let showResults = document.getElementById('display-results-list');

// ***** Constructor *****

function Product(name, fileExtension = 'jpeg'){
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

console.log(allProducts);

// Executable Code

// need a random number between 0 and length-1
function getRandomIndex() {
  return Math.floor(Math.random()* allProducts.length);
}


// render images
function renderImgs(){
  let prodOneIndex = getRandomIndex();
  let prodTwoIndex = getRandomIndex();
  let prodThreeIndex = getRandomIndex();

  while(prodOneIndex === prodTwoIndex){
    prodTwoIndex = getRandomIndex();
  }
  while(prodThreeIndex === prodOneIndex || prodThreeIndex === prodTwoIndex){
    prodThreeIndex = getRandomIndex();
  }

  imgOne.src = allProducts[prodOneIndex].src;
  imgOne.alt = allProducts[prodTwoIndex].name;
  allProducts[prodOneIndex].views++;

  imgTwo.src = allProducts[prodTwoIndex].src;
  imgTwo.alt = allProducts[prodTwoIndex].name;
  allProducts[prodTwoIndex].views++;

  imgThree.src = allProducts[prodThreeIndex].src;
  imgThree.alt = allProducts[prodThreeIndex].name;
  allProducts[prodThreeIndex].views++;
}

renderImgs();

// ***** Event Listeners *******

function handleClick(event){
  votesAllowed--;

  let imgClicked = event.target.alt;

  for(let i =0; i < allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].clicks++;
    }
  }

  renderImgs();

  if(votesAllowed === 0){
    myContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event){

  if(votesAllowed === 0){
    for(let i = 0; i < allProducts.length; i++){
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times, and was voted for ${allProducts[i].clicks} times.`;
      showResults.appendChild(li);
    }
  }
}

myContainer.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleShowResults);
