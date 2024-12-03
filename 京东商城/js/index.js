$('.myjd div').hide(); 				//我的京东
$('.coll>ol').hide();				//企业采购
$('.cutt div').hide();				//客户服务
$('.online div').hide();			//网站导航
$('.user>div').hide();  			//用户
$('.db div').hide();				//地址

/*
这段代码实现了点击左右按钮时，在 .mid>ol 元素上进行图片切换的功能。
通过控制 slideIndex 变量来记录当前显示的图片索引，
然后根据点击左右按钮来增加或减少 slideIndex 变量的值，并通过动画效果切换图片。

*/
//用户下的轮播
var slideIndex = 0; // 初始化图片索引为 0
// 点击左侧按钮切换图片
$('.choose .left').click(function () {
	slideIndex--; // 减少索引
	if (slideIndex == -1) slideIndex = 0; // 限制索引不小于 0
	$('.mid>ol').stop().animate({ 'left': -152 * slideIndex + 'px' }, 500); // 切换图片动画
});

// 点击右侧按钮切换图片
$('.choose .right').click(function () {
	slideIndex++; // 增加索引
	if (slideIndex == 4) slideIndex = 3; // 限制索引不大于 3
	$('.mid>ol').stop().animate({ 'left': -152 * slideIndex + 'px' }, 500); // 切换图片动画
});

//manu
// 这段代码处理了位于 header>ul>li 下的列表项的悬停事件。
$('header>ul>li').hover(function () {
	// 在鼠标悬停时，检查第一个子元素的 HTML 内容是否不为空
	if ($(this).children().eq(0).html() != '') {
		// 添加 'bgwhite' 类，并显示第一个子元素
		$(this).addClass('bgwhite');
		$(this).children().eq(0).show();
	}
}, function () {
	// 在鼠标移出时，检查第一个子元素的 HTML 内容是否不为空
	if ($(this).children().eq(0).html() != '') {
		// 移除 'bgwhite' 类，并隐藏第一个子元素
		$(this).removeClass('bgwhite');
		$(this).children().eq(0).hide();
	}
});

// 这段代码处理了位于 .db .up dd 内的元素的点击事件。
$('.db .up dd').click(function () {
	// 将 .db>.place 的 HTML 内容设置为被点击元素的 HTML 内容
	$('.db>.place').html($(this).html());
});



/*
	实现了一个简单的图片轮播功能，并且在鼠标悬停时可以切换轮播图片和对应的小圆点效果，增强了用户体验。
*/

// 隐藏所有轮播图片
$('.go1>img').hide();
// 显示第一张轮播图片
$('.go1>img').eq(0).show();

// 初始化轮播计数器和定时器变量
var carouselIndex = -1;
var carouselTimer;

// 定义轮播函数
function startCarousel() {
	// 设定定时器，每隔2秒执行一次
	carouselTimer = setInterval(function () {
		// 计数器递增
		carouselIndex++;
		// 当计数器达到8时重置为0，实现循环轮播
		if (carouselIndex == 4) carouselIndex = 0;
		// 淡出上一张图片，淡入当前轮播图片
		$('.go1>img').eq(carouselIndex - 1).fadeOut();
		$('.go1>img').eq(carouselIndex).fadeIn();
		// 调整小圆点的透明度，显示当前对应的小圆点
		$('.small>li').eq(carouselIndex).siblings().css('opacity', '0.4');
		$('.small>li').eq(carouselIndex).css('opacity', '1');
		// 调整大图下方的轮播信息透明度，显示当前对应的信息
		$('.big>li').eq(carouselIndex).siblings().css('opacity', '0');
		$('.big>li').eq(carouselIndex).css('opacity', '0.3');
	}, 2000);
}

// 初始调用轮播函数
startCarousel();

// 鼠标悬停在轮播区域时执行的事件
$('.go1').hover(function () {
	// 清除定时器，停止轮播
	clearInterval(carouselTimer);
	// 鼠标悬停在小圆点上时的事件
	$('.go1 li').hover(function () {
		// 获取当前小圆点的索引
		var index = $(this).index();
		// 调整小圆点的透明度，显示当前对应的小圆点
		$('.small>li').eq(index).siblings().css('opacity', '0.4');
		$('.small>li').eq(index).css('opacity', '1');
		// 调整小圆点的显示效果
		$(this).siblings().css('opacity', '0');
		$(this).css('opacity', '0.3');
		// 切换显示对应的轮播图片
		$('.go1>img').eq(index).siblings('img').fadeOut();
		$('.go1>img').eq(index).fadeIn();
	}, function () { })
}, function () {
	// 鼠标移出轮播区域时恢复轮播定时器
	startCarousel();
})

// 左箭头点击事件
$('.go1-left').click(function () {
	// 计数器递减
	carouselIndex--;
	// 如果计数器减到-2，则重置为7，实现循环轮播
	if (carouselIndex == -2) carouselIndex = 7;
	// 切换显示对应的轮播图片
	$('.go1>img').eq(carouselIndex).siblings('img').fadeOut();
	$('.go1>img').eq(carouselIndex).fadeIn();
	// 调整小圆点的透明度，显示当前对应的小圆点
	$('.small>li').eq(carouselIndex).siblings().css('opacity', '0.4');
	$('.small>li').eq(carouselIndex).css('opacity', '1');
	// 调整大图下方的轮播信息透明度，显示当前对应的信息
	$('.big>li').eq(carouselIndex).siblings().css('opacity', '0');
	$('.big>li').eq(carouselIndex).css('opacity', '0.3');
});

/*
	添加了左右箭头点击事件，实现了点击切换轮播图片的功能，
	并对鼠标悬停在箭头上的效果进行了定义。同时，初始化了第二个轮播区域的显示和隐藏逻辑。
*/
// 右箭头点击事件
$('.go1-right').click(function () {
	// 计数器递增
	carouselIndex++;
	// 如果计数器达到8，则重置为0，实现循环轮播
	if (carouselIndex == 8) carouselIndex = 0;
	// 切换显示对应的轮播图片
	$('.go1>img').eq(carouselIndex).siblings('img').fadeOut();
	$('.go1>img').eq(carouselIndex).fadeIn();
	// 调整小圆点的透明度，显示当前对应的小圆点
	$('.small>li').eq(carouselIndex).siblings().css('opacity', '0.4');
	$('.small>li').eq(carouselIndex).css('opacity', '1');
	// 调整大图下方的轮播信息透明度，显示当前对应的信息
	$('.big>li').eq(carouselIndex).siblings().css('opacity', '0');
	$('.big>li').eq(carouselIndex).css('opacity', '0.3');
});

// 鼠标悬停在左右箭头上的效果
$('.go1 span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)');
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)');
});

// 鼠标悬停在另一个轮播区域的箭头上的效果
$('.go2 span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)');
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)');
});

// 初始化隐藏第二个轮播区域的所有内容
$('.go2 div').hide();
// 显示第二个轮播区域的第二个div内容
$('.go2 div').eq(1).show();
// 隐藏第二个轮播区域的所有span标签
$('.go2 span').hide();


// 初始化第二个轮播区域的计数器和定时器变量
var secondCarouselIndex = 0;
var secondCarouselTimer;

// 定义第二个轮播函数
function startSecondCarousel() {
	// 设定定时器，每隔10秒执行一次
	secondCarouselTimer = setInterval(function () {
		// 计数器递增
		secondCarouselIndex++;
		// 当计数器达到3时重置为0，实现循环轮播
		if (secondCarouselIndex == 3) secondCarouselIndex = 0;
		// 淡出上一张图片，淡入当前轮播图片
		$('.go2>div').eq(secondCarouselIndex).siblings('div').fadeOut();
		$('.go2>div').eq(secondCarouselIndex).fadeIn();
	}, 10000);
}

// 初始调用第二个轮播函数
startSecondCarousel();

// 鼠标进入第二个轮播区域时执行的事件
$('.go2').mouseenter(function () {
	// 清除第二个轮播定时器，停止轮播
	clearInterval(secondCarouselTimer);
	// 显示第二个轮播区域的箭头
	$('.go2 span').show();
});

// 鼠标离开第二个轮播区域时执行的事件
$('.go2').mouseleave(function () {
	// 隐藏第二个轮播区域的箭头
	$('.go2 span').hide();
	// 恢复第二个轮播定时器，继续轮播
	startSecondCarousel();
});

// 左箭头点击事件
$('.go2-left').click(function () {
	// 计数器递减
	secondCarouselIndex--;
	// 如果计数器减到-1，则重置为2，实现循环轮播
	if (secondCarouselIndex == -1) secondCarouselIndex = 2;
	// 切换显示对应的轮播图片
	$('.go2>div').eq(secondCarouselIndex).siblings('div').fadeOut();
	$('.go2>div').eq(secondCarouselIndex).fadeIn();
});

// 右箭头点击事件
$('.go2-right').click(function () {
	// 计数器递增
	secondCarouselIndex++;
	// 如果计数器达到3，则重置为0，实现循环轮播
	if (secondCarouselIndex == 3) secondCarouselIndex = 0;
	// 切换显示对应的轮播图片
	$('.go2>div').eq(secondCarouselIndex).siblings('div').fadeOut();
	$('.go2>div').eq(secondCarouselIndex).fadeIn();
});



/*
	此代码遍历图像文件名（imageFileNames）数组，并将每个span元素的背景图像设置在.one类中的li元素内。
	每个背景图像URL都是基于数组中的文件名构建的，并应用额外的CSS样式来调整背景大小。
*/
// 隐藏所有class为two的元素
//$('.two').hide();

// 图片数组
var imageFileNames = ['1.png', '3.png', '5.png', '7.png', '9.png', '11.png', '13.png', '15.png', '17.png', '19.png', '21.png', '23.png'];

// 循环遍历数组
for (var i = 0; i < imageFileNames.length; i++) {
	// 设置每个li元素下子元素span的背景图片
	$('.one li').eq(i).children('span')
		.css('background', 'url(images/index/' + imageFileNames[i] + ')')
		.css('background-size', '24px 24px'); // 设置背景图片大小为24px x 24px
}


//banner title
/*
	在鼠标悬停在 .banner>ul>li 元素上时显示对应的 .title 元素，并在鼠标移出时隐藏该 .title 元素。
*/
// 隐藏所有class为title的元素
$('.title').hide();

// 定义变量menuIndex
var menuIndex;

// 鼠标悬停在.banner>ul>li元素上时执行的事件
$('.banner>ul>li').hover(function () {
	// 获取当前li元素的索引
	menuIndex = $(this).index();
	// 隐藏除了当前索引对应的.title元��之外的所有.title元素，显示当前索引对应的.title元素
	$('.title').eq(menuIndex).siblings('.title').hide();
	$('.title').eq(menuIndex).show();
}, function () {
	// 鼠标移出时隐藏当前索引对应的.title元素
	$('.title').eq(menuIndex).hide();
});


//middle
/*
这段代码实现了一个轮播图的基本功能：
	- 点击左右按钮可以切换图片，左侧按钮点击时图片向左移动，右侧按钮点击时图片向右移动。
	- 使用了变量 middleSlideIndex 来记录当前显示的图片索引。
	- 当 middleSlideIndex 达到临界值时（0和3），会进行特殊处理，即将 ul 元素的 left 属性设置为对应的位置。
	- hover 方法用于鼠标悬停在 span 元素上时改变背景色。
*/

// 定义变量middleSlideIndex并初始化为0
var middleSlideIndex = 0;

// 点击事件处理函数：左侧按钮
$('.mid-left').click(function () {
	middleSlideIndex--; // middleSlideIndex减1
	if (middleSlideIndex == -1) { // 如果middleSlideIndex减到-1
		middleSlideIndex = 3; // 将middleSlideIndex设为3
		$('.middle>ul').css({ 'left': '-812' * middleSlideIndex + 'px' }) // 设置ul的left属性
		middleSlideIndex = 2; // 将middleSlideIndex设为2
	};
	$('.middle ul').stop().animate({ 'left': '-812' * middleSlideIndex + 'px' }, 1000); // 动画效果移动ul的left属性
});

// 点击事件处理函数：右侧按钮
$('.mid-right').click(function () {
	middleSlideIndex++; // middleSlideIndex加1
	if (middleSlideIndex == 4) { // 如果middleSlideIndex加到4
		middleSlideIndex = 0; // 将middleSlideIndex设为0
		$('.middle>ul').css({ 'left': '-812' * middleSlideIndex + 'px' }) // 设置ul的left属性
		middleSlideIndex = 1; // 将middleSlideIndex设为1
	};
	$('.middle>ul').stop().animate({ 'left': '-812' * middleSlideIndex + 'px' }, 1000); // 动画效果移动ul的left属性
});

// 鼠标悬停事件处理函数：span元素
$('.middle>span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)'); // 鼠标悬停时设置背景色
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)'); // 鼠标移出时设置背景色
});





//固定栏
$('.fix1').hide(); // 隐藏 .fix1 元素。
$(window).scroll(function (event) { // 绑定滚动事件处理函数。
	if ($(window).scrollTop() >= 500) { // 如果滚动距离大于等于 500 像素。
		$('.fix1').slideDown(); // 下拉显示 .fix1 元素。
	} else {
		$('.fix1').slideUp(); // 向上收起隐藏 .fix1 元素。
	}
});


$('.fix3 li').eq(1).hover(function () { // 当鼠标悬停在 .fix3 下的第二个 li 元素时执行以下函数。
	$(this).css('background', 'url("images/index/aa.png")'); // 设置背景为指定图片。
	$(this).css('background-size', '56px 56px'); // 设置背景大小为 56px x 56px。
}, function () { // 当鼠标移出时执行以下函数。
	$(this).css('background', 'url("images/index/aaa.gif")'); // 设置背景为另一张指定动态图片。
	$(this).css('background-size', '56px 56px'); // 设置背景大小为 56px x 56px。
});

$('.fix3 li').eq(4).hide(); // 隐藏 .fix3 下的第八个 li 元素。
$(window).scroll(function (event) { // 绑定滚动事件处理函数。
	if ($(window).scrollTop() >= 500) { // 如果滚动距离大于等于 1200 像素。
		$('.fix3 li').eq(7).slideDown(); // 下拉显示 .fix3 下的第八个 li 元素。
	} else {
		$('.fix3 li').eq(4).slideUp(); // 向上收起隐藏 .fix3 下的第八个 li 元素。
	}
});

$('.fix3 li').eq(7).click(function () { // 给 .fix3 下的第八个 li 元素绑定点击事件。
	$('html,body').animate({ 'scrollTop': 0 }); // 平滑滚动到页面顶部。
});

$('.fix3 li').eq(4).click(function () { // 给 .fix3 下的第五个 li 元素绑定点击事件。
	window.location.href = 'html/life.html';
});



