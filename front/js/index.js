/*
** | index page (all products)
*/

const URI = 'http://localhost:3000/api/products/';
const SINGLE_PRODUCT_LINK = './productFront.html?=';

/*
** | fetch
*/

fetch(URI) 
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // works without console.log, good for access however
        createProductCardsInfo(data);
});  

/*
** | create product cards 
*/

function createProductCardsInfo(array) {
    for (let i = 0; i<array.length; i++) {
        createProductCardView(array[i]);
    }
}

/*
** | cards view
*/

function createProductCardView(object) {
    //DOM creation of product descriptor parent - 'article' 
    let article = document.createElement('article');
    //DOM creation of product descriptors + link
    let productName = document.createElement('h3');
    let productDescription = document.createElement('p');
    let img = document.createElement('img');
    let pageLink = document.createElement('a');
   
    //populate
    productName.innerText = object.name;
    productDescription.innerText= object.description;
    
    img.src= object.imageUrl; 
