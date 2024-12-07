预定和支付功能分析文档

1. 功能概述

预定和支付功能是本系统的核心业务功能之一，支持用户预订酒店、交通和门票等服务，并提供便捷的在线支付解决方案。

1.1 技术栈
- 前端框架：Vue.js 2.6.14
- UI组件库：Element UI
- 图标库：Font Awesome 5
- 本地存储：localStorage
- 支付方式：微信支付、支付宝（模拟）

1.2 主要功能
- 多类型预订（酒店、交通、门票）
- 实时价格计算
- 订单管理
- 在线支付（模拟）
- 支付状态跟踪

2. 预定功能

2.1 预定类型
1. 酒店预订
   - 酒店名称
   - 入住/退房日期
   - 房间类型（单人间、双人间、套房）
   - 价格区间：￥299-￥599

2. 交通预订
   - 出发/到达城市
   - 出发日期
   - 交通方式（火车、飞机、大巴）
   - 价格区间：￥100-￥800

3. 门票预订
   - 景点名称
   - 游玩日期
   - 票型（成人票、儿童票、学生票）
   - 购票数量
   - 价格区间：￥50-￥100

2.2 预定流程
1. 选择预定类型
2. 填写预定信息
3. 表单验证
4. 实时价格计算
5. ��择支付方式
6. 创建订单
7. 跳转支付

2.3 数据结构

订单对象结构：
{
    id: String,           // 订单ID
    type: String,         // 预订类型（hotel/transport/ticket）
    status: String,       // 订单状态
    date: String,         // 创建时间
    amount: Number,       // 订单金额
    userId: String,       // 用户ID
    username: String,     // 用户名
    paymentMethod: String // 支付方式
    // 根据不同预订类型包含不同的具体字段
}

3. 支付功能

3.1 支付方式
- 微信支付（模拟）
- 支付宝（模拟）

3.2 支付流程
1. 创建支付订单
   - 生成订单信息
   - 设置支付超时时间（15分钟）
   - 生成支付二维码

2. 支付处理
   - 支付方式切换
   - 支付状态跟踪
   - 订单状态更新

3. 完成支付
   - 更新订单状态
   - 记录支付信息
   - 跳转订单详情

3.3 关键功能实现

3.3.1 支付倒计时
startTimer() {
    this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
        } else {
            clearInterval(this.timer);
            // 处理支付超时
        }
    }, 1000);
}

3.3.2 支付状态更新
checkPaymentStatus() {
    // 更新订单状态
    orders[orderIndex] = {
        ...orders[orderIndex],
        status: '已支付',
        paymentInfo: {
            method: this.paymentMethod,
            time: new Date().toISOString(),
            amount: this.order.amount,
            transactionId: 'TXN' + Date.now()
        }
    };
}

4. 数据持久化

4.1 本地存储
使用 localStorage 存储以下数据：
- 用户订单列表（userOrders）
- 待支付订单（pendingOrder）
- 支付状态信息

4.2 数据结构

待支付订单结构：
{
    orderId: String,
    amount: Number,
    title: String,
    payment: {
        method: String,
        qrcode: String,
        expireTime: String
    }
}

支付信息结构：
{
    method: String,
    time: String,
    amount: Number,
    transactionId: String
}

5. 用户界面

5.1 预定页面
- 标签式分类导航
- 动态表单验证
- 实时价格显示
- 响应式设计

5.2 支付页面
- 订单信息展示
- 支付倒计时显示
- 支付方式切换
- 支付状态进度条
- 二维码支付界面

6. 安全性考虑

6.1 订单安全

1. 订单信息完整性验证

// 创建订单时的信息完整性验证
if (!pendingOrder.orderId) {
    throw new Error('订单ID不存在');
}
if (!pendingOrder.amount) {
    throw new Error('订单金额不存在');
}
if (!pendingOrder.title) {
    throw new Error('订单标��不存在');
}
if (!pendingOrder.type) {
    throw new Error('订单类型不存在');
}

// 表单验证
validateForm() {
    switch (this.bookingType) {
        case 'hotel':
            if (!this.bookingForm.name || !this.bookingForm.roomType) {
                this.$message.warning('请填写完整的酒店预订信息');
                return false;
            }
            if (this.bookingForm.checkOut <= this.bookingForm.checkIn) {
                this.$message.warning('退房日期必须晚于入住日期');
                return false;
            }
            break;
        case 'transport':
            if (!this.bookingForm.departCity || !this.bookingForm.arriveCity || 
                !this.bookingForm.departDate || !this.bookingForm.transportType) {
                this.$message.warning('请填写完整的交通预订信息');
                return false;
            }
            break;
        case 'ticket':
            if (!this.bookingForm.scenicName || !this.bookingForm.visitDate || 
                !this.bookingForm.ticketType) {
                this.$message.warning('请填写完整的门票预订信息');
                return false;
            }
            break;
    }
    return true;
}

2. 支付超时自动取消

// 设置支付超时时间（15分钟）
const pendingOrder = {
    // ...其他订单信息
    payment: {
        method: this.bookingForm.paymentMethod,
        expireTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }
};

// 支付页面的倒计时和超时处理
startTimer() {
    if (this.timer) {
        clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
        } else {
            clearInterval(this.timer);
            this.$message.error('支付超时，订单已取消');
            setTimeout(() => {
                window.location.href = 'booking.html';
            }, 1500);
        }
    }, 1000);
}

6.2 支付安全

1. 支付状态验证

// 检查支付状态
checkPaymentStatus() {
    this.loading = true;
    this.currentStep = 2;
    
    setTimeout(() => {
        try {
            // 验证订单是否存在
            let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            const orderIndex = orders.findIndex(o => o.id === this.order.orderId);
            
            if (orderIndex === -1) {
                throw new Error('订单不存在');
            }

            // 更新订单状态和支付信息
            orders[orderIndex] = {
                ...orders[orderIndex],
                status: '已支付',
                paymentInfo: {
                    method: this.paymentMethod,
                    time: new Date().toISOString(),
                    amount: this.order.amount,
                    transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 1000)
                }
            };

            // 保存更新后的订单
            localStorage.setItem('userOrders', JSON.stringify(orders));
            localStorage.removeItem('pendingOrder');

            this.currentStep = 3;
            this.$message.success('支付成功！正在跳转到订单详情...');
        } catch (error) {
            this.$message.error('支付确认失败：' + error.message);
            console.error('支付确认错误:', error);
            this.currentStep = 1;
        } finally {
            this.loading = false;
        }
    }, 1000);
}

2. 防重复支付

// 订单列表中的支付状态控制
<el-button 
    v-if="scope.row.status !== '已支付'"
    type="text" 
    size="small" 
    class="danger-text"
    @click="cancelOrder(scope.row)">
    取消订单
</el-button>

// 支付确认前的状态检查
handlePayment() {
    if (this.order.status === '已支付') {
        this.$message.warning('该订单已支付，请勿重复支付');
        return;
    }
    // 继续支付流程...
}

7. 异常处理

7.1 预定异常
已实现功能：
- 表单验证失败提示
- 创建订单失败处理
- 数据存储异常处理

7.2 支付异常
已实现功能：
- 支付超时处理
- 支付失败提示
- 网络异常提示

