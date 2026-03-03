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

cartIcon.onclick = (e) => {
    e.preventDefault();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('show');
}

document.getElementById('closeCart').onclick = () => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('show');
}

// Hàm thêm vào giỏ
function addToCart(name, price, color, size, img) {
    cart.push({ name, price, color, size, img });
    updateCartUI();
    // Tự động mở giỏ hàng khi thêm thành công
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('show');
}

function updateCartUI() {
    const cartCount = document.querySelectorAll('.cart-count');
    const cartItemsList = document.getElementById('cartItemsList');
    
    // Cập nhật số lượng trên icon
    cartCount.forEach(el => el.innerText = cart.length);
    document.getElementById('cartCountHeader').innerText = cart.length;

    // Đổ dữ liệu vào bảng
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-msg">Giỏ hàng trống.</p>';
    } else {
        cartItemsList.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Màu: ${item.color} | Size: ${item.size}</p>
                    <div class="cart-item-price">${item.price}</div>
                </div>
            </div>
        `).join('');
    }
}
