'use strict';
var productList = document.getElementById('product-list');
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
  if (Product.sumVotes >= 25){
    imgEl1.removeEventListener('click', handleClick);
    imgEl2.removeEventListener('click', handleClick);
    imgEl3.removeEventListener('click', handleClick);
    render();
  }
  Product.sumVotes = 0;
  randomImg ();
}

function render (){
  var ulEl = document.createElement('ul');

  for (var i = 0; i < Product.productArray.length; i++){
    var liEl = document.createElement('li');
    liEl.textContent = Product.productArray[i].name + ' has ' + Product.productArray[i].votes + ' votes and showed on the screen ' + Product.productArray[i].views + ' many times.';
    ulEl.appendChild(liEl);
  }
  productList.appendChild(ulEl);
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

new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water can', 'images/water-can.jpg');
new Product('wine glass', 'images/wine-glass.jpg');

randomImg();
