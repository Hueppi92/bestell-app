function getCartHeaderTemplate() {
  return `
    <h2>Warenkorb 
      <button onclick="closeCart()" class="close-cart-button">✖</button>
    </h2>`;
}

function getCartItemTemplate(item) {
  return `
    <div class="cart-item">
      <div class="cart-item-left">
        <button class="cart-button"
          onclick="changeAmount('${item.category}', ${
    item.index
  }, -1)">-</button>
        <span id="price_span">${item.quantity}</span>
        <button class="cart-button"
          onclick="changeAmount('${item.category}', ${
    item.index
  }, 1)">+</button>
        <span class="cart-item-name">${item.dish.name}</span>
      </div>
      <div class="cart-item-right">
        <span>${item.lineTotal.toFixed(2)} €</span>
      </div>
    </div>`;
}

function getDeliveryRowTemplate() {
  return `
    <div class="cart-total">
      <span>Lieferkosten <p>(gratis ab 50€ Warenwert)</p></span>
      <span>5,00 €</span>
    </div>`;
}

function getTotalRowTemplate(total) {
  return `
    <div class="cart-total">
      <span>Gesamt</span>
      <span>${total.toFixed(2)} €</span>
    </div>`;
}

function getCartButtonsTemplate() {
  return `
    <button class="order-button" onclick="startOrder()">
      Jetzt bestellen
    </button>
    <button class="clear-cart-button" onclick="clearCart()">
      🗑 Warenkorb leeren
    </button>`;
}

function getEmptyCartTemplate() {
  return `<p id="empty_cart">Dein Warenkorb ist leer.</p>`;
}

function getDishCardTemplate(category, index, dish, qty) {
  return `
    <div class="main-dish dish">
      <div>
        <span>${dish.name}</span>
        <p>${dish.description}</p>
        
      </div>
      <div class="button-container"><div class="button-div">
        <button onclick="changeAmount('${category}', ${index}, -1)">-</button>
        <span id="price_span">${qty}</span>
        <button onclick="changeAmount('${category}', ${index}, 1)">+</button>
        </div>
        <b>${dish.price.toFixed(2)} €</b>
      </div>

    </div>`;
}
