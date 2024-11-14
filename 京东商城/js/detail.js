/*
这段代码实现了以下功能：

当鼠标移入 .nav 下的 li 元素时，显示该 li 元素下的 .dropdown-layer 子元素。
当鼠标移出 .nav 下的 li 元素时，隐藏该 li 元素下的 .dropdown-layer 子元素。
当点击类名为 .close-btn 的元素时，隐藏该元素自身，并隐藏其兄弟元素中的 img 元素。
*/
$(function() {
    $(".nav>li").mouseover(function() { // 当鼠标移入 .nav 下的 li 元素时执行以下函数。
        $(this).children(".dropdown-layer").show(); // 显示当前 li 元素下的 .dropdown-layer 子元素。
    });
    $(".nav>li").mouseout(function() { // 当鼠标移出 .nav 下的 li 元素时执行以下函数。
        $(this).children(".dropdown-layer").hide(); // 隐藏当前 li 元素下的 .dropdown-layer 子元素。
    });
    $(".close-btn").click(function() { // 当点击类名为 .close-btn 的元素时执行以下函数。
        $(this).hide().siblings("img").hide(); // 隐藏当前元素，并隐藏其兄弟元素中的 img 元素。
    });
});

$(function() {
    $(".preview_img").mouseover(function(e) {
        $(this).children(".mask").show();
        $(this).children(".big").show();
    });
    $(".preview_img").mouseout(function() {
        $(this).children(".mask").hide();
        $(this).children(".big").hide();
    });
    $(".preview_img").mousemove(function(e) {
        var x = e.pageX -  this.offsetLeft;
        var y = e.pageY -  this.offsetTop;
        var maskX = x - parseInt($(this).children(".mask").css("width")) / 2;
        var maskY = y - parseInt($(this).children(".mask").css("height")) / 2;
        var maskMax = parseInt($(this).css("width")) - parseInt($(this).children(".mask").css("width"));
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        $(this).children(".mask").css("left" , maskX + 'px');
        $(this).children(".mask").css("top" , maskY +'px');
        var bigMax = parseInt($(".bigimg").css("width")) - parseInt($(".big").css("width"));
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        $(".bigimg").css("left" , -bigX + 'px');
        $(".bigimg").css("top" , -bigY + 'px');
    });
    $(".list_item li").mouseover(function() {
        $(this).addClass("current").siblings().removeClass("current");
        $(".preview_img img").attr('src',$(this).children("img")[0].src);
        $(".big img").attr('src',$(this).children("img")[0].src);
    });
    $(".choose_color a").click(function() {
        $(this).addClass("current").siblings().removeClass("current");
    });
    $(".choose_version a").click(function() {
        $(this).addClass("current").siblings().removeClass("current");
    });
    $(".choose_type a").click(function() {
        $(this).addClass("current").siblings().removeClass("current");
    });

    $(".reduce").mouseover(function() {
        if ($(".choose_amount input[type='text']").val() <= 1) {
            $(".reduce").css("cursor","not-allowed");
        }
        else {
            $(".reduce").css("cursor","pointer");
        }
    });
    $(".reduce").click(function() {
        if ($(".choose_amount input[type='text']").val() <= 1) {
            $(".reduce").css("cursor","not-allowed");
        }
        else {
            $(".reduce").css("cursor","pointer");
            num =  $(".choose_amount input[type='text']").val();
            $(".choose_amount input[type='text']").val(num-1);
        }
    });
    $(".add").click(function() {
        num =  $(".choose_amount input[type='text']").val();
        $(".choose_amount input[type='text']").val(Number(num)+1);
    });

    $(".tab_list li").mouseover(function() {
        $(this).addClass("current").siblings().removeClass("current");
    });

    $(".detail_tab_list li").click(function() {
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".item").eq(index).show().siblings().hide();
    });
});