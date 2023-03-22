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
        console.log(data);
        createProductCardsInfo(data);
});  

/*
** | create product cards (using loop)
*/

function createProductCardsInfo(array) {
    for (let i = 0; i<array.length; i++) {
        createProductCardView(array[i]);
    }
}

/*
** | cards view (modify the DOM)
*/

function createProductCardView(object) {
    //DOM creation of product descriptor parent - 'article' 
    let items = document.createElement('items');
    //DOM creation of product descriptors + link
    let productName = document.createElement('h3');
    let productDescription = document.createElement('p');
    let img = document.createElement('img');
    let pageLink = document.createElement('a');
   
    //populate
    productName.innerText = object.name;
    productDescription.innerText= object.description;
    pageLink.innerText= object.Link;
    
    img.src= object.imageUrl;

}
