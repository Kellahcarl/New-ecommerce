// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (let i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  let grandTotal = 0;
  button = event.target;
  let cartItem = button.parentElement;
  let price = cartItem.getElementsByClassName('product-price')[0].innerText;
  
  let imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart (price, imageSrc);
  updateCartPrice()
  const a =document.getElementsByClassName("cart-price");
for(let i = 0; i<a.length;i++){
grandTotal += Number(a[i].innerText.replace('$', ''));
console.log(grandTotal)

}
}

function addItemToCart (price, imageSrc) {
  let productRow = document.createElement('div');
  productRow.classList.add('product-row');
  let productRows = document.getElementsByClassName('product-rows')[0];
  let cartImage = document.getElementsByClassName('cart-image');
  
  for (let i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  let cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (let i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
const quantityInput = document.getElementsByClassName('product-quantity')[0];

for (let i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  let input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input

// update total price
function updateCartPrice() {
  let total = 0
  let discount =0
  let total_with_discount=0
  
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  let priceElement = cartRow.getElementsByClassName('cart-price')[0]
  let quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  let price = parseFloat(priceElement.innerText.replace('$', ''))
  let quantity = quantityElement.value

    if(quantity >=50){
      total = price*quantity;
      discount = quantity*0.5;
      discount =discount.toFixed(2)
      total_with_discount = total-discount;
    }else if(quantity >=25 && quantity<50){
      total = price*quantity;
      discount = quantity*0.25;
      discount =discount.toFixed(2)
      total_with_discount = total-discount;
    }else if(quantity >=10 && quantity<25 ){
      total = price*quantity;
      discount = quantity*0.1;
      discount =discount.toFixed(2)
      total_with_discount = total-discount;
    } else {
    total = price * quantity ;
    total_with_discount=total;
    }

  // console.log(discount, total, total_with_discount)
    
  }
  document.getElementsByClassName('total-price')[0].innerText =  '$' + total
  document.getElementsByClassName('total-discount')[0].innerText =  '$' + discount
  document.getElementsByClassName('net-total-price')[0].innerText =  '$' + total_with_discount
  
  

document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}


// end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 let cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
}
// end of purchase items

//alert user if cart is empty 


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}