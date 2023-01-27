import {  menuArray  } from '/data.js' 

const cartEl = document.getElementById('cart')
const cartContainer = document.getElementById('cart-item-container')
const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')

const cartArray = []


document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        handleAddItemToCart(e.target.dataset.add)
    }
    if (e.target.dataset.remove) {
        handleRemoveItemBtn(e.target.dataset.remove)
    }
    if (e.target.id === 'complete-order-btn') {
        handleCompleteOrderBtn()
    }
    if (e.target.id === 'pay-btn') {
        e.preventDefault()
        const paymentFormData = new FormData(paymentForm)
        handlePayBtn(paymentFormData)
    }
    if (e.target.id === 'close-modal-btn') {
        handleCloseModalBtn()
    }
})



function handleAddItemToCart(itemId) {
    const cartItem = menuArray.filter(item => {
        return item.id === parseInt(itemId)
        
    })[0]
    cartArray.push(cartItem)
    cartContainer.classList.remove('hidden')
    render()
    
}

function handleRemoveItemBtn(itemId) {
    cartArray.splice(itemId, 1)
    if (cartArray.length < 1) {
        cartContainer.classList.add('hidden')
        render()
    }
    else{
        render()
    }
}

function handleCompleteOrderBtn() {
    paymentModal.classList.remove('hidden')
    render()
}

function handlePayBtn(paymentData) {
    let name = paymentData.get('name').split(" ")
    document.getElementById('confirmation-msg').innerHTML = `Thanks, ${name[0]}! Your order is on its way!`
    paymentModal.classList.add('hidden')
    cartContainer.classList.add('hidden')
    document.getElementById('thank-you-card').classList.remove('hidden')
    render()

}

function handleCloseModalBtn() {
    paymentModal.classList.add('hidden')
    render()
}

function render() {
    renderMenu()
    renderCart()
}

function renderMenu() {
    document.getElementById('menu-item-container').innerHTML = getMenuItems()
}


function getMenuItems() {
    let menuItems = ''
    menuArray.forEach((item) => {
        menuItems += `
        <div class="menu-item-card">
            <div class="items">
                <p class="emoji">${item.emoji}</p>
                <div class="menu-item-description">
                    <p>${item.name}</p>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
            </div>
            <i class="fa-regular fa-square-plus" data-add="${item.id}"></i>
        </div>`
    })
    return menuItems
}


function renderCart() {
    if(cartArray.length > 0){
        cartEl.innerHTML = getCartItems()
        document.getElementById('total').textContent = getCartTotal()
    }
    
}

function getCartItems() {
    if (cartArray.length > 0) {
        let cartItems = ''
        let total = 0
        cartArray.forEach((item, index) => {
            cartItems += `
            <div class="cart-item">
                <p>${item.name}</p>
                <button class="remove-item-btn" data-remove="${index}">remove</button>
                <p>$${item.price}</p>
            </div>`
        })
        return cartItems
    }
}

function getCartTotal() {
    let total = 0
    cartArray.forEach(item => {
        total += item.price
    })
    return total
}


render()    
