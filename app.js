
const mockDatabase = [
    { id: 1, name: "Nescafe Gold Coffee 100g", platform: "Zepto", price: 6.99, etaMinutes: 10, deliveryFee: 1.50 },
    { id: 2, name: "Nescafe Gold Coffee 100g", platform: "Amazon", price: 4.99, etaMinutes: 1440, deliveryFee: 0.00 },
    { id: 3, name: "Nescafe Gold Coffee 100g", platform: "Blinkit", price: 7.50, etaMinutes: 8, deliveryFee: 2.00 },
    { id: 4, name: "Whole Milk 1L", platform: "Zepto", price: 1.99, etaMinutes: 10, deliveryFee: 1.50 },
    { id: 5, name: "Whole Milk 1L", platform: "Blinkit", price: 1.89, etaMinutes: 8, deliveryFee: 2.00 },
    { id: 6, name: "iPhone Fast Charger", platform: "Amazon", price: 19.99, etaMinutes: 2880, deliveryFee: 0.00 },
    { id: 7, name: "iPhone Fast Charger", platform: "Zepto", price: 24.99, etaMinutes: 15, deliveryFee: 1.50 }
];

let currentResults = [];
let cart = [];

function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) return;
    
    currentResults = mockDatabase.filter(item => item.name.toLowerCase().includes(query));
    renderResults();
}

function sortResults(type) {
    if (type === 'price') {
        currentResults.sort((a, b) => a.price - b.price);
    } else if (type === 'eta') {
        currentResults.sort((a, b) => a.etaMinutes - b.etaMinutes);
    }
    renderResults();
}

function renderResults() {
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = '';
    
    if (currentResults.length === 0) {
        grid.innerHTML = '<p class="placeholder-text">No items found. Try "Coffee", "Milk", or "Charger".</p>';
        return;
    }

    currentResults.forEach(item => {
        const etaText = item.etaMinutes > 60 ? `${item.etaMinutes / 1440} Day(s)` : `${item.etaMinutes} mins`;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="platform">${item.platform}</div>
            <div class="product-name">${item.name}</div>
            <div class="price">$${item.price.toFixed(2)}</div>
            <div class="eta">🚚 ETA: ${etaText}</div>
            <button class="add-btn" onclick="addToCart(${item.id})">Add to Unified Cart</button>
        `;
        grid.appendChild(card);
    });
}

function addToCart(id) {
    const item = mockDatabase.find(i => i.id === id);
    cart.push(item);
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="placeholder-text">Your cart is empty.</p>';
        updateTotals();
        return;
    }

    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-platform">via ${item.platform}</div>
            </div>
            <div>$${item.price.toFixed(2)}</div>
        `;
        cartContainer.appendChild(div);
    });
    updateTotals();
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Calculate unique delivery fees per platform
    const platformsInCart = [...new Set(cart.map(item => item.platform))];
    let deliveryTotal = 0;
    platformsInCart.forEach(platform => {
        const fee = cart.find(item => item.platform === platform).deliveryFee;
        deliveryTotal += fee;
    });

    const total = subtotal + deliveryTotal;

    document.getElementById('cartSubtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartDelivery').innerText = `$${deliveryTotal.toFixed(2)}`;
    document.getElementById('cartTotal').innerText = `$${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Dummy Checkout Successful! Orders have been dispatched across multiple platforms.");
    cart = [];
    renderCart();
}
