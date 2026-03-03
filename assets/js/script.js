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
