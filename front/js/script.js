/*
** | Declare index page (for all products)
*/

const URI = 'http://localhost:3000/api/products';
const Single_Product_Link = './product.html?=';


/*
** | Fetch (for products)
*/

fetch(URI)
.then((response) => response.json())
.then(data => {
    console.log(data); //works without console but is handy for access
    createProductCardsInfo(data);  
});


/*
** | Create Product Cards & Information
*/

function createProductCardsInfo(array) {
    for (let i = 0; i<array.length; i++) {
        createProductCardsView(array[i]);
    }
}

/*
** | Create Product Cards View
*/
 
function createProductCardsView(object) {
    //DOM creation of a product descriptor parent; refered to as "article"
    let artcile = document.createElement ('article');
    //DOM creation of a product descriptor and link
    let productName = document.createElement ('h3');
    let productDescription = document.createElement ('p');
    let img = document.createElement ('img');
    let pageLink = document.createElement ('a');
    
    //Populate collected data
    productName.innerText = object.name;
    productDescription.innerText= object.description;
    
    img.src= object.imageUrl;
    
    pageLink.href = '${Single_Product_Link} ${object._id}'; //need to double check this later
    
    //append created product description parent to link parent
    items.appendChild(pageLink);
    pageLink.appendChild(article);
    
    //append product descriptors to parent chronologically
    article.appendChild(img);
    article.appendChild(productName);
    article.appendChild(productDescription);
    
}
