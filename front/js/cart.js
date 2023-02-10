// cart


let cart = JSON.parse(localStorage.getItem('scart')) || [];
//turn into workable data
console.log('cart:', cart);
//loop through the data to get access to it
for (let i = 0; i < cart.length; i++) {
    populateCartInfo(cart[i]);
}

/*
** function call
*/



//use looped cart above to push data into DOM node

function populateCartInfo(cart) {
    //get access
    let section = document.getElementById('cart__items');
    //create dom elements in order
    //parent
    let article = document.createElement('div');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', `${cart._id}`)
    article.setAttribute('data-color', `${cart.color}`)
    section.appendChild(article);
    //image
    let cartItemImgP = document.createElement('div');
    cartItemImgP.setAttribute('class', 'cart__item__img');
    article.appendChild(cartItemImgP);

    let img = document.createElement('img');
    img.setAttribute('class','img' );
    cartItemImgP.appendChild(img);
    //contentParent
    let contentP = document.createElement('div');
    contentP.setAttribute('class', 'cart__item__content');
    article.appendChild(contentP);
    //description Parent
    let contentDescriptionP  = document.createElement('div');
    contentDescriptionP .setAttribute("class", "cart__item__content__description");
    contentP.appendChild(contentDescriptionP);
    //productName
    let nameOfProduct = document.createElement('h2');
    nameOfProduct.setAttribute('class', 'product__name');
    contentDescriptionP.appendChild(nameOfProduct);
    //color
    let color = document.createElement('p');
    color.setAttribute('class', 'item__color');
    contentDescriptionP.appendChild(color);
    //price
    let price = document.createElement('p');
    price.setAttribute('class', 'item__price');
    contentDescriptionP.appendChild(price);
    //settingsParent
    let contentSettingsP = document.createElement('div');
    contentSettingsP.setAttribute('class', 'cart__item__content__settings');
    contentP.appendChild(contentSettingsP);
    //quantity Parent
    let contentSettingsQuantityP  = document.createElement('div');
    contentSettingsQuantityP.setAttribute('class', 'cart__item__content__settings__quantity');
    contentSettingsP.appendChild(contentSettingsQuantityP);
    //quantity
    let chosenQ = document.createElement('p');
    chosenQ.setAttribute('class', 'chosenQ');
    contentSettingsQuantityP.appendChild(chosenQ);
    //quantity Input
    let itemQuantity = document.createElement('input');
    itemQuantity.setAttribute('type', 'number');
    itemQuantity.setAttribute('class', 'itemQuantity');
    itemQuantity.setAttribute('id', 'itemQuantity');
    //itemQuantity.setAttribute('name', 'itemQuantity');
    itemQuantity.setAttribute('min', '1');
    itemQuantity.setAttribute('max', '100');
    itemQuantity.setAttribute('value', '');
    contentSettingsQuantityP.appendChild(itemQuantity);
    //deleteParent
    let contentSettingsDeleteP  = document.createElement('div');
    contentSettingsDeleteP.setAttribute('class', 'cart__item__content__settings__delete');
    contentSettingsP.appendChild( contentSettingsDeleteP);
    //delete
    let deleteItem = document.createElement('p');
    deleteItem.setAttribute('class', 'deleteItem');
    contentSettingsDeleteP.appendChild(deleteItem);
    //populate 
    img.src= cart.image;
    nameOfProduct.innerText = cart.name;
    color.innerText = cart.color;
    price.innerText = '€' + cart.price;
    chosenQ.innerText = 'quantity :' 
    itemQuantity.value = cart.quantity; 
    deleteItem.innerText = 'Delete';
   
    return populateCartInfo;
}