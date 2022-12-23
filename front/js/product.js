/*
** |single product page
*/

//get _id of product from query parameters
const QUERY_STRING = window.location.search;
console.log(QUERY_STRING);
let PRODUCT_ID = QUERY_STRING.slice(5);
console.log(PRODUCT_ID);

const PRODUCT_URI = 'http://localhost:3000/api/products/' + PRODUCT_ID;
let product;

/*
** | fetch
*/

//fetch the new URI from get request
fetch(PRODUCT_URI) 
    .then((response) => response.json())
    .then((data) => {
        product = data;
        console.log(data)
        createIndividualProductView(data);
        populateDropdown(data);
        
}); //gives back an individual object

/*
** create Product View
*/

//populate data, image ,description, price using key/value
function createIndividualProductView(data) {
