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
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
      // Khi màn hình từ 768px trở lên (máy tính bảng/laptop nhỏ)
      768: {
        slidesPerView: 2,
        spaceBetween: 30
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
