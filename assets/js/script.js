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
  // Khởi tạo chung cho tất cả swiper sản phẩm
  const productSwipers = new Swiper('.product-swiper', {
    slidesPerView: 3,      // Hiển thị tối đa 3 sản phẩm
    spaceBetween: 20,     // Khoảng cách giữa các sản phẩm
    grabCursor: true,     // Hiện bàn tay kéo thả
    freeMode: true,       // Kéo tự do mượt mà
    breakpoints: {
      // Responsive: Điện thoại hiện 1.5 sản phẩm để người dùng biết là có thể vuốt
      320: { slidesPerView: 1.2, spaceBetween: 10 },
      768: { slidesPerView: 2.5, spaceBetween: 15 },
      1024: { slidesPerView: 3, spaceBetween: 20 }
    }
  });
});
