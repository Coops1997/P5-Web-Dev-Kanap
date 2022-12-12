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
    
const articleElement = document.createElement ('item');
articleElement.setAttribute('id', items.id);
articleElement.classList.add('item');

articleElement.innerHTML = `
<h3>${items.name}</h3>
<a href="./product.html?id=42$(items.id)">click me</a>
<p>${items.text}</p>
`;

itemHolder.appendChild(articleElement);

    }
}