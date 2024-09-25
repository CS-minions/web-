// script.js
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(event) {
            event.preventDefault();
            const largeImageSrc = this.href;
            lightboxImg.src = largeImageSrc;
            lightbox.style.display = 'flex'; // 使用 flex 布局显示
        });
    });

    lightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
});