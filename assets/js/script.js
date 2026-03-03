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
let cart = [];

// Hàm mở/đóng giỏ hàng
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartIcon = document.querySelector('.cart-icon');

// Chỉ mở bảng khi ấn vào icon giỏ hàng
cartIcon.onclick = (e) => {
    e.preventDefault();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('show');
}

// Đóng khi ấn nút X
document.getElementById('closeCart').onclick = () => {
    closeCart();
}

// Đóng khi click ra vùng ngoài (Overlay)
cartOverlay.onclick = () => {
    closeCart();
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('show');
}

// Hàm thêm vào giỏ (Đã bỏ lệnh mở bảng tự động)
function addToCart(name, price, color, size, img) {
    const numericPrice = parseInt(price.replace(/\./g, '').replace('đ', ''));
    const existingItem = cart.find(item => item.name === name && item.color === color && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: numericPrice, color, size, img, quantity: 1 });
    }
    
    updateCartUI();
    // Chỗ này không còn lệnh add class 'open' nữa, chỉ nhảy số ở icon thôi bro nhé
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        removeItem(index);
    } else {
        updateCartUI();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCount = document.querySelectorAll('.cart-count');
    const totalPriceEl = document.getElementById('cartTotalPrice');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.forEach(el => el.innerText = totalItems);
    
    // Header Count trong Drawer nếu có
    const headerCount = document.getElementById('cartCountHeader');
    if(headerCount) headerCount.innerText = totalItems;

    let totalMoney = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="text-align:center; padding: 50px 20px; color: #999;">Giỏ hàng của bạn đang trống.</p>';
    } else {
        cartItemsList.innerHTML = cart.map((item, index) => {
            totalMoney += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.color} / ${item.size}</p>
                        <div class="cart-quantity-controls">
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})"><i class="far fa-trash-alt"></i></button>
                </div>
            `;
        }).join('');
    }
    
    totalPriceEl.innerText = totalMoney.toLocaleString('vi-VN') + 'đ';
}
