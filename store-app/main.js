if(document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

function ready() {
  let cartButtons = document.querySelectorAll('.add-to-cart-btn');
  Array.from(cartButtons).forEach(element => element.addEventListener('click', addItem));
  
  function addItem(e) {
    let button = e.target;
    let item = e.target.parentElement.parentElement.parentElement;
    let title = item.querySelector('.item-title').textContent;
    let price = item.querySelector('.item-price').textContent;
    let image = item.getElementsByTagName('img')[0].src;

    addItemToCart(title, price, image);
    updateCartTotal();
  }

  function addItemToCart(title, price, image) {
    let itemInCart = document.createElement('div');
    itemInCart.className = 'cart-row';
    itemInCart.style.borderBottom = "1px solid #555";
    itemInCart.style.marginTop = "0.8rem";
    itemInCart.style.marginBottom = "0.5rem";
    itemInCart.innerHTML = 
      ` <div class="cart-row-content cart-row-image"><img class="cart-item-image" src="${image}" width="100" height="100"><div style="float: right; margin: 2.5rem 2rem 0 0; font-size: 18px; font-weight: bold;">${title}</div></div>
      <div class="cart-row-content cart-row-price"><div style="float: right; margin: 0 4.2rem 1.6rem 0; font-size: 18px; font-weight: bold;">${price}</div></div>
      <div class="cart-row-content cart-row-input style=""><div style="display: flex; justify-content: center; bottom: 2.5rem; position: relative;"><input type="number" value="1" class="cart-input" style="width: 50px; border-radius: 5px; border: 0; padding: 8px;"><button class="delete-btn">Remove</button></div></div>
    `
    let cart = document.querySelector('.cart');
    cart.appendChild(itemInCart);
  }

  function updateCartTotal() {
    
  }
}
