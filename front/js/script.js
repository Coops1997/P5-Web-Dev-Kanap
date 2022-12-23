fetch('http://localhost:3000/api/products')
.then(data => {
    return data.json();
})
.then(items => {
    insertItems(items);
});

    
const itemHolder = document.getElementById('items');

    
        
function insertItems(items){

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(items);
    
const itemElement = document.createElement('items');
itemElement.setAttribute('id', items.id);
itemElement.classList.add('item');

itemElement.innerHTML = `
<h3>${item.name}</h3>
<a href="./product.html?id=42${item.id}">image</a>
<p>${item.description}</p>
`;

itemHolder.appendChild(itemElement);

    }
}