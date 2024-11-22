
// Horizontal slider with arrow buttons
const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let scrollAmount = 0;
const scrollStep = 190;
const maxScroll = -(slider.scrollWidth - document.querySelector('.slider-wrapper').offsetWidth);

leftArrow.addEventListener('click', () => {
scrollAmount += scrollStep;
if (scrollAmount > 0) scrollAmount = 0;
slider.style.transform = `translateX(${scrollAmount}px)`;
});

rightArrow.addEventListener('click', () => {
scrollAmount -= scrollStep;
if (scrollAmount < maxScroll) scrollAmount = maxScroll;
slider.style.transform = `translateX(${scrollAmount}px)`;
});


// Category card and product section toggle
const categoryCards = document.querySelectorAll('.category-card');
const productSections = document.querySelectorAll('.product-section');

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    // Hide all sections
    productSections.forEach(section => {
      section.classList.remove('active'); // Remove the active class
      section.classList.add('hidden');   // Add hidden for accessibility
    });

    // Show the selected section with animation
    const sectionId = card.getAttribute('data-section');
    const targetSection = document.getElementById(sectionId);

    targetSection.classList.remove('hidden'); // Make it accessible
    setTimeout(() => {
      targetSection.classList.add('active'); // Trigger animation
    }, 10); // Small delay to ensure animation works
  });
});

let cart = [];
let cartCount = 0;

function addToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartCount();
  displayCartItems();
}

function updateCartCount() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

function toggleCart() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.style.display = cartModal.style.display === 'none' || cartModal.style.display === '' ? 'flex' : 'none';
  displayCartItems();
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
      <button class="delete-btn" onclick="removeFromCart(${index})">Delete</button>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity === 0) {
    cart.splice(index, 1);
  }
  updateCartCount();
  displayCartItems();
}

function checkout() {
  alert(`Thank you for your purchase! Your total is $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`);
  cart = [];
  updateCartCount();
  displayCartItems();
}

// Attach event listeners for add-to-cart buttons
document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    const item = {
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      imageSrc: button.dataset.imageSrc,
    };
    addToCart(item);
  });
});




