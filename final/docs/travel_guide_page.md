# 旅游攻略页面（travel-guide.html）文档

## 1. 页面概述

旅游攻略页面是平台的核心内容展示页面，提供用户分享和浏览旅游经验的功能。页面采用现代化的卡片式布局，支持丰富的交互功能。

### 1.1 技术栈
- Vue.js 2.6.14
- Element UI 组件库
- Font Awesome 6.4.0
- 自定义样式和动画

### 1.2 外部依赖
```html
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### 1.3 自定义样式
```html
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/travel-guide.css">
```

## 2. 页面结构

### 2.1 页面加载动画
```html
<div id="pageLoading" v-if="isLoading && !guides.length" class="page-loading">
    <div class="loading-spinner">
        <i class="fas fa-globe-asia fa-spin"></i>
        <span>正在加载精彩内容...</span>
    </div>
</div>
```

### 2.2 导航栏
```html
<header class="header">
    <nav class="nav">
        <div class="logo">
            <i class="fas fa-globe-asia"></i>
            <span>旅游攻略</span>
        </div>
        <div class="nav-links">
            <el-button type="text" icon="el-icon-s-home" @click="goHome">返回首页</el-button>
            <el-button type="text" icon="el-icon-switch-button" @click="logout" v-if="isLoggedIn">退出登录</el-button>
        </div>
    </nav>
</header>
```

### 2.3 攻略分类区域
```html
<section class="guide-categories">
    <div class="section-header">
        <div class="section-title">
            <h2>旅游攻略</h2>
            <p>分享你的旅行故事</p>
        </div>
        <div class="header-actions">
            <el-button type="text" @click="showMyGuides">我的发布</el-button>
            <el-button type="primary" @click="openShareForm">发布攻略</el-button>
        </div>
    </div>
    
    <el-tabs v-model="activeCategory" @tab-click="handleCategoryChange">
        <!-- 分类标签页 -->
    </el-tabs>
</section>
```

### 2.4 攻略卡片
```html
<div class="guide-card">
    <div class="guide-image">
        <img :src="guide.image" :alt="guide.title">
        <div class="guide-category-tag">{{getCategoryName(guide.category)}}</div>
    </div>
    <div class="guide-content">
        <h3>{{guide.title}}</h3>
        <p class="guide-excerpt">{{guide.excerpt}}</p>
        <!-- 互动按钮 -->
        <div class="guide-interactions">
            <span class="interaction-btn like-btn">...</span>
            <span class="interaction-btn favorite-btn">...</span>
            <span class="interaction-btn comment-btn">...</span>
        </div>
    </div>
</div>
```

## 3. 样式实现

### 3.1 布局样式
```css
.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f8f9fa;
}

.guides-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
}
```

### 3.2 卡片样式
```css
.guide-card {
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    cursor: pointer;
}

.guide-image {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: #f5f5f5;
}

.guide-content {
    padding: 1.5rem;
    animation: contentFadeIn 0.6s ease-out forwards;
}
```

### 3.3 交互按钮样式
```css
.interaction-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.interaction-btn.like-btn {
    color: #e74c3c;
    background: #fff5f5;
    border-color: #ffe3e3;
}

.interaction-btn.favorite-btn {
    color: #f1c40f;
    background: #fffbeb;
    border-color: #fef3c7;
}
```

## 4. 功能实现

### 4.1 攻略分类
- 分类标签页切换
- 分类数据过滤
- 分类描述展示

### 4.2 内容交互
- 点赞功能
- 收藏功能
- 评论系统
- 内容展开/收起

### 4.3 发布功能
- 攻略发布表单
- 图片上传
- 内容编辑
- 分类选择

### 4.4 用户功能
- 登录状态管理
- 个人攻略管理
- 收藏管理
- 评论管理

## 5. 交互优化

### 5.1 动画效果
```css
/* 卡片悬浮效果 */
.guide-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

/* 图片加载动画 */
.guide-image img {
    opacity: 0;
    transition: all 0.5s ease;
    filter: brightness(0.8);
}

.guide-image img.image-loaded {
    opacity: 1;
    filter: brightness(1);
}

/* 点赞动画 */
@keyframes likeAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}
```

### 5.2 性能优化
- 图片懒加载
- 内容按需加载
- 动画性能优化
- 状态缓存管理

### 5.3 用户体验
- 加载状态提示
- 操作反馈
- 错误处理
- 表单验证

## 6. 注意事项

### 6.1 性能考虑
- 控制图片大小和质量
- 优化动画性能
- 减少不必要的重渲染
- 合理使用缓存

### 6.2 兼容性
- 响应式布局适配
- 图片加载失败处理
- 浏览器兼容性处理
- 触摸设备支持

### 6.3 用户体验
- 合理的加载状态
- 清晰的操作反馈
- 直观的交互设计
- 流畅的动画效果
``` 