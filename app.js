'use strict';

Product.productArray = [];
Product.lastDisplayed = [];
Product.sumVotes = 0;
var imgEl1 = document.getElementById('product-img1');
var imgEl2 = document.getElementById('product-img2');
var imgEl3 = document.getElementById('product-img3');
imgEl1.addEventListener('click', handleClick);
imgEl2.addEventListener('click', handleClick);
imgEl3.addEventListener('click', handleClick);

function Product (name, filepath){
  this.name = name;
  this.filepath = filepath;
  this.votes = 0;
  this.views = 0;
  Product.productArray.push(this);
}

function handleClick (e){
  for (var i = 0; i < Product.productArray.length; i++){
    if(e.target.id === Product.productArray[i].name){
      Product.productArray[i].votes++;
    }
  }
  for (var j = 0; j < Product.productArray.length; j++){
    Product.sumVotes += Product.productArray[j].votes;
  }
  if (Product.sumVotes >= 10){
    imgEl1.removeEventListener('click', handleClick);
    imgEl2.removeEventListener('click', handleClick);
    imgEl3.removeEventListener('click', handleClick);
    render();
  }
  Product.sumVotes = 0;
  randomImg ();
}

function render (){
  var graph = document.getElementById('chart').getContext('2d');
  var barGraph = new Chart(graph, {
    type: 'bar',
    data: {
      labels: [Product.productArray[0].name],
      datasets: [{
        label: Product.productArray[0].name,
        data: [Product.productArray[0]],
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255,206,86,0.2)',
          'rgba(75,192,192,0.2)',
          'rgba(153,102,255,0.2)',
          'rgba(255,159,64,0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
  for (var i = 0; i < Product.productArray.length; i++){
    graph.data.datasets.data[i] = Product.productArray[1].votes;
  }
  chart.appendChild(graph);
  /*var ulEl = document.createElement('ul');

  for (var i = 0; i < Product.productArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Product.productArray[i].name + ' has ' + Product.productArray[i].votes + ' votes and showed on the screen ' + Product.productArray[i].views + ' many times.';
    ulEl.appendChild(liEl);
  }
  productList.appendChild(ulEl);*/
}

function randomImg (){
  var randomIndex1 = 0;
  var randomIndex2 = 0;
  var randomIndex3 = 0;

  if (Product.lastDisplayed.length > 6){
    Product.lastDisplayed.splice(6, (Product.lastDisplayed.length - 6));
  }
  while(randomIndex1 === randomIndex2 || randomIndex2 === randomIndex3 || randomIndex1 === randomIndex3 || Product.lastDisplayed.includes(randomIndex1) || Product.lastDisplayed.includes(randomIndex2) || Product.lastDisplayed.includes(randomIndex3)){
    randomIndex1 = Math.floor(Math.random() * Product.productArray.length);
    randomIndex2 = Math.floor(Math.random() * Product.productArray.length);
    randomIndex3 = Math.floor(Math.random() * Product.productArray.length);
  }
  imgEl1.src = Product.productArray[randomIndex1].filepath;
  imgEl1.id = Product.productArray[randomIndex1].name;
  imgEl2.src = Product.productArray[randomIndex2].filepath;
  imgEl2.id = Product.productArray[randomIndex2].name;
  imgEl3.src = Product.productArray[randomIndex3].filepath;
  imgEl3.id = Product.productArray[randomIndex3].name;
  Product.lastDisplayed.unshift(randomIndex1, randomIndex2, randomIndex3);
  Product.productArray[randomIndex1].views++;
  Product.productArray[randomIndex2].views++;
  Product.productArray[randomIndex3].views++;
}

new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('athroom', 'images/bathroom.jpg');
new Product('Boots', 'images/boots.jpg');
new Product('Breakfast', 'images/breakfast.jpg');
new Product('Bubblegum', 'images/bubblegum.jpg');
new Product('Chair', 'images/chair.jpg');
new Product('Cthulhu', 'images/cthulhu.jpg');
new Product('Dog duck', 'images/dog-duck.jpg');
new Product('Dragon', 'images/dragon.jpg');
new Product('Pen', 'images/pen.jpg');
new Product('Pet sweep', 'images/pet-sweep.jpg');
new Product('Scissors', 'images/scissors.jpg');
new Product('Shark', 'images/shark.jpg');
new Product('Sweep', 'images/sweep.png');
new Product('Tauntaun', 'images/tauntaun.jpg');
new Product('Unicorn', 'images/unicorn.jpg');
new Product('Usb', 'images/usb.gif');
new Product('Water can', 'images/water-can.jpg');
new Product('Wine glass', 'images/wine-glass.jpg');

randomImg();
