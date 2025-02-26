
const icons = document.querySelectorAll(".dropdown i"); // Select all the icons inside the dropdowns

// Hover effect: change color to lightcoral when mouse enters
icons.forEach(icon => {
    icon.addEventListener("mouseenter", function() {
        icon.style.color = "lightcoral";
    });

    // Hover effect: change color back to grey when mouse leaves
    icon.addEventListener("mouseleave", function() {
        icon.style.color = "grey";
    });
});




// Product Data
const productData = {
    1: { img: 'img/four.webp', text: 'Lights & Floor ' },
    2: { img: 'img/two.webp', text: ' Coffee Table' },
    3: { img: 'img/image2.jpg', text: 'Sofa Set' },
    4: { img: 'img/three.webp', text: ' Dining Table' }
};

// Function to Show Popup
document.querySelectorAll(".circle").forEach(circle => {
    circle.addEventListener("click", function () {
        const productId = this.getAttribute("data-product");
        const popup = document.getElementById("popupCard");
        const productImage = document.getElementById("productImage");
        const productText = document.getElementById("productText");

        // Set product details
        productImage.src = productData[productId].img;
        productText.innerText = productData[productId].text;

        // Position Popup near Clicked Circle
        const rect = this.getBoundingClientRect();
        popup.style.top = `${rect.top + window.scrollY + 30}px`;
        popup.style.left = `${rect.left + window.scrollX + 30}px`;

        // Show Popup
        popup.style.display = "block";
    });
});

// Function to Close Popup
function closePopup() {
    document.getElementById("popupCard").style.display = "none";
}

// Close Popup when clicking outside
document.addEventListener("click", function (event) {
    const popup = document.getElementById("popupCard");
    if (!popup.contains(event.target) && !event.target.classList.contains("circle")) {
        popup.style.display = "none";
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("back-to-top");

    // Show or hide the button based on scroll position
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Show button after scrolling down 300px
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Scroll to top when the button is clicked
    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



//new arrivales slider section//

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let slideIndex = 0;
const totalSlides = slides.length;
const slideInterval = 2000; // Change slide every 3 seconds

// Function to show the current slide
function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    // Show the current slide
    slides[index].classList.add('active');
}

// Function to move to the next slide
function nextSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

// Function to move to the previous slide
function prevSlide() {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Auto-Slide Functionality
let autoSlide = setInterval(nextSlide, slideInterval);

// Pause Auto-Slide on Hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
});

// Next Slide Button
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval(); // Reset the interval when manually navigating
});

// Previous Slide Button
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval(); // Reset the interval when manually navigating
});

// Reset Interval Function
function resetInterval() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
}

// Show the first slide initially
showSlide(slideIndex);



document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartBadge = document.getElementById("cart-badge");
    const cartTotalAmount = document.getElementById("cart-total-amount");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Load cart data from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartCount = cartItems.length;
    cartBadge.textContent = cartCount;

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productCard = button.closest(".product-card");
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = productCard.querySelector("p").textContent;
            const productImage = productCard.querySelector("img").src;

            // Add item to cart
            cartItems.push({ name: productName, price: productPrice, image: productImage });
            cartCount++;
            cartBadge.textContent = cartCount;

            // Save cart data to localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Update cart sidebar
            updateCartSidebar();
        });
    });

    // Open the cart sidebar when cart icon is clicked
    cartIcon.addEventListener("click", function () {
        cartSidebar.classList.add("open");
    });

    // Close the cart sidebar when close button is clicked
    closeCart.addEventListener("click", function () {
        cartSidebar.classList.remove("open");
    });

    // Close the cart if clicked outside the sidebar and cart icon
    document.addEventListener("click", function (event) {
        if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
            cartSidebar.classList.remove("open");
        }
    });

    // Function to update the cart sidebar
    function updateCartSidebar() {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        let totalAmount = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");

            // Calculate total amount
            const price = parseFloat(item.price.replace("$", ""));
            totalAmount += price;

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update total amount
        cartTotalAmount.textContent = `$${totalAmount.toFixed(2)}`;

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll(".delete-item");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                cartItems.splice(index, 1); // Remove item from cart
                cartCount--;
                cartBadge.textContent = cartCount;

                // Save updated cart data to localStorage
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                updateCartSidebar(); // Refresh the cart sidebar
            });
        });
    }

    // Checkout Button Functionality
    checkoutBtn.addEventListener("click", function () {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thanks for shopping! Your cart will now be emptied.");
            
            // Clear the cart data from localStorage
            localStorage.removeItem("cartItems");
            
            // Clear the cart sidebar
            cartItems = [];
            cartCount = 0;
            cartBadge.textContent = cartCount;
            cartTotalAmount.textContent = "$0.00";

            // Refresh the cart sidebar
            updateCartSidebar();
        }
    });

    // Initialize the cart sidebar with saved data
    updateCartSidebar();
});




// chair and circular text animation //

const text = document.querySelector(".text");
text.innerHTML = text.innerText
	.split("")
	.map((char, i) => 
        `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
	)
	.join("");


    document.addEventListener("DOMContentLoaded", function () {
        const image = document.querySelector(".image-side img");
        const circleText = document.querySelector(".circlea");
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    image.classList.add("active"); // Start image animation
    
                    // Show circular text after image animation (9s delay)
                    setTimeout(() => {
                        circleText.classList.add("active");
                    }, 3000); // Delay after 3 cycles (3s × 3)
    
                    observer.unobserve(entry.target); // Stop observing
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible
    
        observer.observe(image);
    });
    
    

