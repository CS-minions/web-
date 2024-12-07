# 用户中心页面（user-center.html）文档

## 1. 页面概述

用户中心页面是用户管理个人信息、订单、收藏和浏览历史的核心功能区域。页面采用左侧菜单、右侧内容的经典布局，提供丰富的用户管理功能。

### 1.1 技术栈
- Vue.js 2.6.14
- Element UI 组件库
- Font Awesome 5.15.4
- 自定义样式

### 1.2 外部依赖
```html
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
```

### 1.3 自定义样式
```html
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/user-center.css">
```

## 2. 页面结构

### 2.1 导航栏
```html
<el-menu mode="horizontal" class="nav">
    <el-menu-item index="1" @click="goToHome">
        <i class="el-icon-s-home"></i> 返回首页
    </el-menu-item>
</el-menu>
```

### 2.2 左侧菜单
```html
<el-menu class="user-menu" :default-active="activeMenu">
    <el-menu-item index="profile">
        <i class="el-icon-user"></i>
        <span>个人资料</span>
    </el-menu-item>
    <el-menu-item index="orders">
        <i class="el-icon-tickets"></i>
        <span>我的订单</span>
    </el-menu-item>
    <el-menu-item index="favorites">
        <i class="el-icon-star-on"></i>
        <span>我的收藏</span>
    </el-menu-item>
    <el-menu-item index="history">
        <i class="el-icon-time"></i>
        <span>浏览历史</span>
    </el-menu-item>
</el-menu>
```

### 2.3 个人资料区域
```html
<div class="profile-section">
    <el-card>
        <div slot="header">
            <span>个人资料</span>
            <el-button type="text" @click="startEditProfile">编辑资料</el-button>
        </div>
        <el-form :model="userInfo" label-width="80px">
            <!-- 头像 -->
            <el-form-item label="头像">
                <el-avatar :size="80" :src="userInfo.avatar">
                    {{ userInfo.username.charAt(0).toUpperCase() }}
                </el-avatar>
            </el-form-item>
            <!-- 用户信息表单 -->
            <el-form-item label="用户名">
                <el-input v-model="userInfo.username"></el-input>
            </el-form-item>
            <!-- 其他表单项 -->
        </el-form>
    </el-card>
</div>
```

### 2.4 订单列表区域
```html
<div class="orders-section">
    <el-card>
        <div slot="header" class="orders-header">
            <span>我的订单</span>
            <div class="header-actions">
                <el-button type="danger" size="small">批量删除</el-button>
            </div>
        </div>
        <el-table :data="orders">
            <!-- 订单表格列 -->
        </el-table>
    </el-card>
</div>
```

### 2.5 收藏列表区域
```html
<div class="favorites-section">
    <el-card>
        <!-- 收藏列表头部 -->
        <div slot="header" class="favorites-header">...</div>
        <!-- 收藏内容表格 -->
        <el-table :data="favorites">...</el-table>
    </el-card>
</div>
```

## 3. 样式实现

### 3.1 布局样式
```css
.user-center-container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
    display: flex;
    gap: 20px;
    min-height: calc(100vh - 120px);
}

.user-menu {
    width: 200px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.content-area {
    flex: 1;
    min-width: 0;
}
```

### 3.2 菜单样式
```css
.user-menu .el-menu-item {
    height: 50px;
    line-height: 50px;
}

.user-menu .el-menu-item i {
    margin-right: 10px;
    font-size: 18px;
}
```

### 3.3 卡片样式
```css
.el-card {
    margin-bottom: 20px;
}

.el-card__header {
    padding: 15px 20px;
    border-bottom: 1px solid #ebeef5;
    background-color: #f5f7fa;
}
```

### 3.4 响应式设计
```css
@media (max-width: 768px) {
    .user-center-container {
        flex-direction: column;
    }

    .user-menu {
        width: 100%;
    }

    .favorite-item {
        flex-direction: column;
    }
}
```

## 4. 功能实现

### 4.1 个人资料管理
- 资料编辑
- 头像上传
- 表单验证
- 修改保存

### 4.2 订单管理
- 订单列表展示
- 订单状态管理
- 订单详情查看
- 订单批量操作

### 4.3 收藏管理
- 收藏内容展示
- 收藏分类管理
- 取消收藏
- 批量操作

### 4.4 浏览历史
- 历史记录展示
- 时间线展示
- 清空历史
- 重新查看

## 5. 交互优化

### 5.1 用户体验
- 表单即时验证
- 操作即时反馈
- 加载状态提示
- 空状态处理

### 5.2 性能优化
- 数据懒加载
- 分页加载
- 本地缓存
- 状态管理

### 5.3 界面优化
- 统一的视觉风格
- 合理的空间布局
- 清晰的信息层级
- 友好的交互反馈

## 6. 注意事项

### 6.1 数据安全
- 敏感信息加密
- 表单验证
- 权限控制
- 会话管理

### 6.2 性能考虑
- 减少���求次数
- 优化数据结构
- 合理使用缓存
- 按需加载

### 6.3 用户体验
- 友好的提示信息
- 合理的加载状态
- 完善的错误处理
- 便捷的操作流程 