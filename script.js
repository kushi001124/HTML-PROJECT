// Data for the products available; in the form of a dictionary array
const products = [
    { id: 1, name: 'Apple', category: 'Fruits', image: 'images/apples.jpeg', description: 'Quantity: 1kg, Banarasi Fresh, Organinc, Farm Grown', price: 150 },
    { id: 2, name: 'Potato', category: 'Vegetables', image: 'images/potato.jpeg', description: 'Quantity: 1kg, Italian Poatato, Organic, Farm Grown', price: 100 },
    { id: 3, name: 'Strawberry', category: 'Fruits', image: 'images/strawberry.jpeg', description: 'Quantity: 500g, Kashmiri Red Strawberry, Organic', price: 125 },
    { id: 4, name: 'Tomato', category: 'Vegetables', image: 'images/tomato.jpeg', description: 'Quantity: 1kg, Fresh Desi Organic Tomato', price: 100 },
    { id: 5, name: 'Butter', category: 'Dairy', image: 'images/butter.jpeg', description: 'Quantity: 500g, Pasturized Unsalted Fresh Organic Butter', price: 75 },
    { id: 6, name: 'Cow Milk', category: 'Dairy', image: 'images/milk2.jpeg', description: 'Quantity: 500mL, Organic Fresh Full Cream Cow Milk (Bottle)', price: 50 },
    { id: 7, name: 'Litchi', category: 'Fruits', image: 'images/litchi.jpeg', description: 'Quantity: 500g , Organic Fresh Farm Grown', price: 125 },
    { id: 8, name: 'Paneer', category: 'Dairy', image: 'images/paneer.jpeg', description: 'Quantity: 200g, Cow Milk Fresh Block Paneer', price: 75 },
    
];

// Adding products to webpage
const productContainer = document.getElementById('productContainer');
products.forEach(product => {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p>Price: Rs. ${product.price.toFixed(2)}</p>
        <img src="${product.image}" alt="${product.name}" onclick="openModal(${product.id})">
    `;
    productContainer.appendChild(item);
});

// Modal functions
function openModal(productId) {
    const modal = document.getElementById('itemModal');
    const product = products.find(p => p.id === productId);
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalDescription').innerText = product.description;
    document.getElementById('modalPrice').innerText = `Price: Rs ${product.price.toFixed(2)}`;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'none';
}

function goBack() {
    closeModal();
    renderProducts(products); // Re-render the products on going back
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filterProducts(searchTerm, document.getElementById('CategorySelect').value);
});

// Category filter
document.getElementById('CategorySelect').addEventListener('change', function() {
    const category = this.value;
    filterProducts(document.getElementById('searchInput').value.toLowerCase(), category);
});

function filterProducts(searchTerm, category) {
    const filteredProducts = products.filter(product => {
        const isInSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        const isInCategory = category === 'all' || product.category === category;
        return isInSearch && isInCategory;
    });

    renderProducts(filteredProducts);
}

function renderProducts(productsArray) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    productsArray.forEach(product => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>Price: Rs. ${product.price.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.name}" onclick="openModal(${product.id})">
        `;
        productContainer.appendChild(item);
    });
}

 // Filter Modal functions

function openFilterModal() {
    const filterModal = document.getElementById('filterModal');
    filterModal.style.display = 'flex';
}

function closeFilterModal() {
    const filterModal = document.getElementById('filterModal');
    filterModal.style.display = 'none';
}

function applyFilters() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const filteredProducts = products.filter(product => {
        const isInRange = (minPrice === '' || product.price >= minPrice) && (maxPrice === '' || product.price <= maxPrice);
        return isInRange;
    });

    renderProducts(filteredProducts);
    closeFilterModal();
}