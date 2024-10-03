import data from './data.js'

const itemsContainer = document.querySelector('#items')

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
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
}