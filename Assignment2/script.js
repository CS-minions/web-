// script.js
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail'); // 获取所有缩略图元素
    const lightbox = document.getElementById('lightbox'); // 获取灯箱元素
    const lightboxImg = document.getElementById('lightbox-img'); // 获取灯箱中的图片元素

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            const largeImageSrc = this.href; // 获取大图的链接
            lightboxImg.src = largeImageSrc; // 设置灯箱中图片的来源
            lightbox.style.display = 'flex'; // 使用 flex 布局显示灯箱
        });
    });

    lightbox.addEventListener('click', function() {
        lightbox.style.display = 'none'; // 点击灯箱时隐藏灯箱
    });
});