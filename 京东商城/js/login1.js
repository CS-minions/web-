window.onload=function(){
    // 隐藏元素
    var mid2 = document.querySelector('.mid2');
    var midd = document.querySelector('.midd');
    var tipp = document.querySelector('.tipp');

    // 隐藏元素
    mid2.style.display = 'none';
    // document.querySelector('.mid').style.display = 'none'; // 如果需要隐藏 '.mid' 元素
    midd.style.display = 'none';
    tipp.style.display = 'none';
}

// 获取元素
var midTop = document.querySelector('.mid-top');
var mid2 = document.querySelector('.mid2');
// 获取元素
var mid1 = document.querySelector('.mid1');

// 添加鼠标悬停事件监听器
midTop.addEventListener('mouseover', function() {
    // 动画元素 mid1
    mid1.style.transition = 'left 400ms';
    mid1.style.left = '19px';
    
    // 显示元素 mid2
    mid2.style.display = 'block';
});

// 添加鼠标离开事件监听器
midTop.addEventListener('mouseout', function() {
    // 动画元素 mid1
    mid1.style.transition = 'left 400ms';
    mid1.style.left = '84px';
    
    // 隐藏元素 mid2
    mid2.style.display = 'none';
});
