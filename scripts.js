import data from './data.js'

const itemsContainer = document.querySelector('#items')
const cart = []

// the length of our data detemines how manu time this loop goes around
for (let i =0; i < data.length; i += 1) {
    // create new Div element and give it a class name
    const newDiv = document.createElement('div');
    newDiv.className = 'item'
    //create an image element
    const img = document.createElement('img');
    //this will change each time we go through the loop because 'i' will be changing to adapt to the new length
    img.src = data[i].image
    img.width = 300
    img.height = 300
    //add the image to the div
    newDiv.appendChild(img)
    
    itemsContainer.appendChild(newDiv)
    //create paragraph element
    const desc = document.createElement('P')
    //give the paragraph text from the data
    desc.innerText = data[i].desc
    // append the paragraph to the div
    newDiv.appendChild(desc)
    // do the same thing for price
    const price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    //make button
    const button = document.createElement('button')
    //add an id name to the button
    button.dataset.id =data[i].name
    //create a custom attribute called data-price
    button.dataset.price = data[i].price
    button.className = 'add-to-cart'
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const itemName = e.target.dataset.id;
        const itemPrice = parseFloat(e.target.dataset.price);
        // Check if item is already in the cart
        const itemInCart = cart.find(item => item.name === itemName);
        if (itemInCart) {
            itemInCart.qty += 1;  // Increase quantity if item already exists
        } else {
            cart.push({ name: itemName, price: itemPrice, qty: 1 });
        }
        console.log(`Added ${itemName} to cart for $${itemPrice}`);
        displayCart();
    }
    // handle quantity increase
    if (e.target.classList.contains('button-add')) {
        const itemId = e.target.dataset.id;
        const itemInCart = cart.find(item => item.name === itemId);
        if (itemInCart) {
            itemInCart.qty += 1;
        }
        displayCart();
    }
    // handle quantity decrease
    if (e.target.classList.contains('button-sub')) {
        const itemId = e.target.dataset.id;
        const itemInCart = cart.find(item => item.name === itemId);
        if (itemInCart && itemInCart.qty > 1) {
            itemInCart.qty -= 1;
        } else if (itemInCart && itemInCart.qty === 1) {
            cart.splice(cart.indexOf(itemInCart), 1);
        }
        displayCart();
    }
});
// display the cart
const displayCart = () => {
    console.log(cart)
    let cartStr = '';
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];
        cartStr += `<li>
            <span>${item.name}</span>
            <input type="number" value="${item.qty}" class="input-qty" data-id="${item.name}">
            <span>$${item.price}</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
            <button class="button-add" data-id="${item.name}">+</button>
            <button class="button-sub" data-id="${item.name}">-</button>
        </li>`;
    }
    const cartTotal = getCartTotal()
    // append a li tag at the end of the cartStr with the total
    cartStr += `<li>Total: ${cartTotal}</li>`

    const cartItems = document.querySelector('#cart-items');
        cartItems.innerHTML ='';
        cartItems.innerHTML = cartStr;
    
}

document.body.addEventListener('change', (e) => {
    if (e.target.matches('.input-qty')) {
        const name = e.target.dataset.id
        const value = parseInt(e.target.value, 10)
        updateCart(name, value)
        displayCart()
    }
})

document.body.addEventListener('keydown', (e) => {
    if (e.target.matches('.input-qty')) {
        if (e.key === "Enter") {
            const name = e.target.dataset.id;
            const value = parseInt(e.target.value);
            updateCart(name, value);
            console.log(e)
            displayCart();
        }
    }
});

const updateCart = (id,val) => {
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i]
        if (id === item.id) {
            item.qty = val
         if (item.qty < 1) {
            cart.splice(i, 1)
         }
         return
        }
    }
}

const getCartTotal = () => {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i]
        total += item.qty * item.price

    }
    return total.toFixed(2)
}


const theTotal = getCartTotal()
console.log(theTotal)

const answer = 10 / 3
console.log(answer)
console.log(answer.toFixed(2))