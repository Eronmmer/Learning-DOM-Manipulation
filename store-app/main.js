if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

function ready() {
  let cartButtons = document.querySelectorAll('.add-to-cart-btn');
  for(let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener('click', addItem)
  }
  
  function addItem(e) {
    let button = e.target;
    let item = button.parentElement.parentElement.parentElement;
    let title = item.querySelector('.item-title').textContent;
    let price = item.querySelector('.item-price').textContent;
    let image = item.getElementsByTagName('img')[0].src;

    addItemToCart(title, price, image);
    updateCartTotal();
  }

  function removeCartItem(e) {
    if(confirm('Are you sure you want to remove this item from your shopping list?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
    updateCartTotal();
  }

  function quantityChanged(e) {
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  function addItemToCart(title, price, image) {
    let cart = document.querySelector('.cart');
    let itemInCart = document.createElement('div');
    itemInCart.className = 'cart-row new-row';
    itemInCart.style.borderBottom = "1px solid #555";
    itemInCart.style.marginTop = "0.8rem";
    itemInCart.style.marginBottom = "0.5rem";
    let titles = cart.querySelectorAll('.item-title');
    for(let i = 0; i < titles.length; i++) {
      if(titles[i].textContent === title) {
        alert('This item has already been added to the cart');
        return;
      }
    }
    itemInCart.innerHTML = 
      ` <div class="cart-row-content cart-row-image"><img class="cart-item-image" src="${image}" width="100" height="100"><div class="item-title" style="float: right; margin: 2.5rem 2rem 0 0; font-size: 18px; font-weight: bold;">${title}</div></div>
      <div class="cart-row-content cart-row-price"><div class="list-price" style="float: right; margin: 0 4.2rem 1.6rem 0; font-size: 18px; font-weight: bold;">${price}</div></div>
      <div class="cart-row-content cart-row-input style=""><div style="display: flex; justify-content: center; bottom: 2.5rem; position: relative;"><input type="number" value="1" class="cart-input" style="width: 50px; border-radius: 5px; border: 0; padding: 8px; font-size: 18px"><button class="delete-btn">Remove</button></div></div>
    `
    cart.appendChild(itemInCart);
    itemInCart.querySelectorAll('.delete-btn')[0].addEventListener('click', removeCartItem);
    itemInCart.querySelectorAll('.cart-input')[0].addEventListener('change', quantityChanged);
  }

  function updateCartTotal() {
    let cart = document.querySelector('.cart');
    let items = cart.querySelectorAll('.new-row');
    let totalPrice = 0;
    for(let i = 0; i < items.length; i++) {
      let priceElement = items[i].querySelectorAll('.list-price')[0];
      let quantityElement = items[i].querySelector('.cart-input');
      let price = parseFloat(priceElement.innerText.replace('$', ''));
      let quantity = quantityElement.value;
      totalPrice = totalPrice + (price * quantity);
    }
    totalPrice = Math.round(totalPrice * 100) / 100;
    document.querySelector('.total-price').innerText = totalPrice;
  }

  let purchaseButton = document.querySelector('.purchase');
  purchaseButton.addEventListener('click', function() {
    let cart = document.querySelector('.cart');
    alert('Thanks for your purchase, see you next time');
    let items = cart.querySelectorAll('.new-row');
    for(let i = 0; i < items.length; i++) {
      cart.removeChild(items[i]);
    }
    updateCartTotal();
  })
}
