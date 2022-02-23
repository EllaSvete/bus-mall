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

// Canvas element for chart.js
let ctx = document.getElementById('my-chart');

// ***** local storage continued ******

// step 3: get it out of local storage
let retrievedProds = localStorage.getItem('products');

console.log('retrieved products', retrievedProds);

// step 4: Parse our data for our code to read

let parsedProds = JSON.parse(retrievedProds);

console.log('parsed prods', parsedProds);


// ***** Constructor *****

function Product(name, fileExtension = 'jpeg'){
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

// ***** Local Storage
// Step : 5 Use the data that came out of localStorage

if(retrievedProds){
  allProducts = parsedProds;
} else {
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

}

console.log(allProducts);

// Executable Code

// need a random number between 0 and length-1
function getRandomIndex() {
  return Math.floor(Math.random()* allProducts.length);
}

let randomIndexes = []; // will be populated with 6 unique numbers
// push - add to the end of the array [2,3,10,17,1,5]

// render images
function renderImgs() {

  while(randomIndexes.length < 6) {
    let randoProd = getRandomIndex();
    while(!randomIndexes.includes(randoProd)) {
      randomIndexes.push(randoProd);
    }
  }

  let prodOneIndex = randomIndexes.shift(); // 2
  let prodTwoIndex = randomIndexes.shift(); // 3
  let prodThreeIndex = randomIndexes.shift(); // 10
  // shift re-indexes



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

// while(prodOneIndex === prodTwoIndex){
//   prodTwoIndex = getRandomIndex();
// }
// while(prodThreeIndex === prodOneIndex || prodThreeIndex === prodTwoIndex){
//   prodThreeIndex = getRandomIndex();
// } this is old code from above ^

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

    renderChart();

    // ***** local storage begins ****** 

    // step 1: Stringify Data
    let stringifiedProds = JSON.stringify(allProducts);
    console.log('Stringified Prods', stringifiedProds);

    // Step 2: Set item into local Storage
    localStorage.setItem('products', stringifiedProds);
  }
}

// function handleShowResults(event){

//   if(votesAllowed === 0){
//     for(let i = 0; i < allProducts.length; i++){
//       let li = document.createElement('li');
//       li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times, and was voted for ${allProducts[i].clicks} times.`;
//       showResults.appendChild(li);
//     }
//   }
// }

// function that will render the chart once the voting round is done

function renderChart() {
  let prodNames = [];
  let prodClicks = [];
  let prodViews = [];

  for (let i = 0; i < allProducts.length; i++){
    prodNames.push(allProducts[i].name);
    prodClicks.push(allProducts[i].clicks);
    prodViews.push(allProducts[i].views);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Click',
        data: prodClicks,
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'red'
        ],
        borderWidth: 1,
        hoverBorderColor: 'black'
      },
      {
        label: '# of Views',
        data: prodViews,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleClick);

// resultsBtn.addEventListener('click', handleShowResults);
