document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Sapphire Diamond Ring", category: "rings", price: 320, img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600" },
    { id: 2, name: "Royal Blue Sapphire Pendant", category: "necklaces", price: 450, img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600" },
    { id: 3, name: "Minimalist Gold Bracelet", category: "bracelets", price: 210, img: "https://i.pinimg.com/736x/63/bf/76/63bf76baf3d4a94eb73a7b659dc52212.jpg" },
    { id: 4, name: "Silver Drop Earrings", category: "earrings", price: 180, img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600" },
    { id: 5, name: "Classic Gold Wedding Band", category: "rings", price: 290, img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600" },
    { id: 6, name: "Luxury Diamond Pearl Necklace", category: "necklaces", price: 580, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600" }
  ];

  let cart = [];

  const productGrid = document.getElementById('productGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartBtn = document.getElementById('cartBtn');
  const closeCart = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = document.getElementById('cartItems');
  const totalAmount = document.getElementById('totalAmount');
  const cartCount = document.querySelector('.cart-count');

  function renderProducts(items) {
    if (!productGrid) return;
    productGrid.innerHTML = items.map(p => `
      <div class="product-card">
        <img src="${p.img}" class="product-img" alt="${p.name}">
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="price">$${p.price}</div>
          <button class="add-to-cart" data-id="${p.id}">Add to Bag</button>
        </div>
      </div>
    `).join('');

    // Себетке қосу кнопкаларына оқиға тіркеу
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeBtn = document.querySelector('.filter-btn.active');
      if (activeBtn) activeBtn.classList.remove('active');
      btn.classList.add('active');
      
      const cat = btn.dataset.category;
      if (cat === 'all') {
        renderProducts(products);
      } else {
        renderProducts(products.filter(p => p.category === cat));
      }
    });
  });

  function addToCart(id) {
    const item = products.find(p => p.id === id);
    if (item) {
      cart.push(item);
      updateCart();
    }
  }

  function updateCart() {
    if (cartCount) cartCount.innerText = cart.length;
    if (!cartItemsContainer || !totalAmount) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is empty.</p>';
      totalAmount.innerText = '$0.00';
      return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((acc, curr) => acc + curr.price, 0);
    totalAmount.innerText = `$${total.toFixed(2)}`;
  }

  if (cartBtn && cartSidebar) {
    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
  }
  
  if (closeCart && cartSidebar) {
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
  }

  renderProducts(products);
});