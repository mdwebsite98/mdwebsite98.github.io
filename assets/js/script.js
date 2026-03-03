// Xử lý hiệu ứng đổi màu Header khi cuộn trang
window.addEventListener('scroll', function() {
  const header = document.querySelector('.fashion-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Xử lý sự kiện click vào Menu 3 gạch
const menuBtn = document.getElementById('menuToggle');
menuBtn.addEventListener('click', () => {
  console.log('Mở Menu hệ thống...');
  // Bạn có thể thêm code mở Side Menu ở đây sau nhé
});
document.addEventListener('DOMContentLoaded', function() {
  // Cấu hình cho slide bên trái
  const swiperLeft = new Swiper('.swiper-left', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-left .swiper-pagination',
      clickable: true,
    },
    grabCursor: true, // Hiện bàn tay khi di chuột vào để biết là kéo được
  });

  // Cấu hình cho slide bên phải
  const swiperRight = new Swiper('.swiper-right', {
    loop: true,
    autoplay: {
      delay: 4500, // Cho 2 bên lệch nhau chút nhìn cho nghệ
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-right .swiper-pagination',
      clickable: true,
    },
    grabCursor: true,
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const productSwipers = new Swiper('.product-swiper', {
    slidesPerView: 1,      // Mặc định cho điện thoại là 1 cái to rõ
    spaceBetween: 0,
    grabCursor: true,
    breakpoints: {
      // Khi màn hình từ 768px trở lên (máy tính bảng/laptop nhỏ)
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // Khi màn hình từ 1024px trở lên (máy tính)
      1024: {
        slidesPerView: 3,  // Giữ đúng 3 sản phẩm như bro yêu cầu
        spaceBetween: 40   // Khoảng cách giữa các ảnh rộng rãi hơn
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const cateBtn = document.getElementById('cateBtn');
    const cateContent = document.getElementById('cateContent');

    // Click vào chữ Danh Mục để toggle
    cateBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Ngăn sự kiện nổi bọt
        cateBtn.classList.toggle('active');
        cateContent.classList.toggle('show');
    });

    // Click ra ngoài thì ẩn danh mục
    document.addEventListener('click', function(e) {
        if (!cateContent.contains(e.target) && !cateBtn.contains(e.target)) {
            cateBtn.classList.remove('active');
            cateContent.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];

    // Lấy các thành phần giao diện
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCart');

    // 1. Mở giỏ hàng khi ấn icon
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (cartDrawer && cartOverlay) {
                cartDrawer.classList.add('open');
                cartOverlay.classList.add('show');
            }
        });
    }

    // 2. Đóng giỏ hàng khi click ra ngoài hoặc ấn nút X
    function closeCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('show');
        }
    }

    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

    // 3. Hàm thêm vào giỏ hàng (Gắn vào window để gọi từ HTML)
    window.addToCart = function(name, price, color, size, img) {
        // Xử lý giá tiền từ chuỗi sang số
        const numericPrice = parseInt(price.replace(/\./g, '').replace('đ', ''));
        
        const existingItem = cart.find(item => item.name === name && item.color === color && item.size === size);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price: numericPrice, color, size, img, quantity: 1 });
        }
        
        updateCartUI();
        // Chỉ nhảy số ở icon, không mở bảng theo ý bro
    };

    // 4. Tăng giảm số lượng và Xóa
    window.changeQuantity = function(index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            window.removeItem(index);
        } else {
            updateCartUI();
        }
    };

    window.removeItem = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    // 5. Cập nhật giao diện
    function updateCartUI() {
        const cartItemsList = document.getElementById('cartItemsList');
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalPriceEl = document.getElementById('cartTotalPrice');
        const headerCount = document.getElementById('cartCountHeader');

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Cập nhật tất cả các icon có class .cart-count
        cartCountElements.forEach(el => el.innerText = totalItems);
        if (headerCount) headerCount.innerText = totalItems;

        let totalMoney = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align:center; padding: 50px 20px; color: #999;">Giỏ hàng trống.</p>';
        } else {
            cartItemsList.innerHTML = cart.map((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalMoney += itemTotal;
                return `
                    <div class="cart-item">
                        <img src="${item.img}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${item.color} / ${item.size}</p>
                            <div class="cart-quantity-controls">
                                <button onclick="changeQuantity(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                            </div>
                            <div class="cart-item-price">${itemTotal.toLocaleString('vi-VN')}đ</div>
                        </div>
                        <button class="remove-item" onclick="removeItem(${index})">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </div>
                `;
            }).join('');
        }
        
        if (totalPriceEl) totalPriceEl.innerText = totalMoney.toLocaleString('vi-VN') + 'đ';
    }
});
