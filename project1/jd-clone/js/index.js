// 搜索功能
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-box input').value;
    if (searchTerm.trim()) {
        alert('搜索: ' + searchTerm);
    }
});

// 分类菜单交互
document.querySelectorAll('.category-menu li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = '#f10215';
        this.style.color = '#fff';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = '#fff';
        this.style.color = '#333';
    });
});
