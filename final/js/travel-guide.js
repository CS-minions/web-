Vue.use(ELEMENT);

// 在 Vue 实例之前定义默认数据
const DEFAULT_GUIDES = [
    {
        id: 1,
        title: '三亚必吃海鲜攻略',
        image: 'https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg',
        category: 'food',
        excerpt: '详细解读三亚海鲜市场，教你如何吃到最新鲜实惠的海鲜，避免踩坑指南',
        author: '美食达人',
        views: 15680,
        date: '2023-10-15',
        content: `
            <h2>三亚海鲜攻略</h2>
            <p>三亚作为著名的滨海旅游城市，海鲜美食是不可错过的体验。本攻略将为您详细介绍如何选择和品尝三亚海鲜。</p>
            
            <h3>1. 推荐海鲜市场</h3>
            <ul>
                <li>第一市场：三亚最大、最有名的海鲜市场，品种齐全，价格实惠</li>
                <li>春园海鲜广场：环境较好，价格适中，适合家庭游客</li>
                <li>大东海美食街：临近海边，海鲜新鲜，但价格稍高</li>
            </ul>

            <h3>2. 必吃海鲜推荐</h3>
            <ul>
                <li>和乐蟹：三亚特产，肉质鲜美，建议清蒸</li>
                <li>琼海白虾：个头大，肉质紧实，口感好</li>
                <li>海胆：新鲜海胆刺身或蒸蛋都很美味</li>
                <li>龙虾：建议椒盐或避风塘做法</li>
            </ul>

            <h3>3. 挑选技巧</h3>
            <p><strong>看：</strong>海鲜应该有光泽，颜色鲜艳，不应有异常斑点</p>
            <p><strong>闻：</strong>新鲜海鲜应该有淡淡的海腥味，不应有腐臭味</p>
            <p><strong>摸：</strong>肉质应该结实有弹性，不应该松</p>

            <h3>4. 价格参考（旺季）</h3>
            <ul>
                <li>和乐蟹：180-280元/斤</li>
                <li>琼海白虾：80-120元/斤</li>
                <li>龙虾：280-380元/斤</li>
                <li>海胆：20-40元/个</li>
            </ul>

            <h3>5. 注意事项</h3>
            <ul>
                <li>一定要货比三家，切勿贪图便宜</li>
                <li>最好在当地人推荐的店铺用餐</li>
                <li>点菜前要问清价格，避免被宰</li>
                <li>建议选择本地特色烹饪方式</li>
            </ul>
        `
    },
    {
        id: 7,
        title: '重庆解放碑美食探店',
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
        category: 'food',
        excerpt: '重庆解放碑商圈美食地图，带你尝遍山城特色小吃',
        author: '巴渝美食家',
        views: 5890,
        date: '2023-10-30',
        content: `
            <h2>重庆解放碑美食攻略</h2>
            <p>解放碑作为重庆的商业中心，汇集了众多特色美食。跟着这份攻略，体验正宗重庆味道。</p>

            <h3>1. 特色小吃推荐</h3>
            <ul>
                <li>毛血旺：推荐"德庄"，麻辣鲜香</li>
                <li>重庆小面：建议尝试"马记面馆"</li>
                <li>抄手：老字号"谭鸭血"</li>
                <li>酸辣粉：地道的"袁老四"</li>
            </ul>

            <h3>2. 网红美食店</h3>
            <ul>
                <li>洪崖洞：观景餐厅，江景配美食</li>
                <li>八一好吃街：各类小吃汇集</li>
                <li>解放碑步行街：现代餐饮荟萃</li>
            </ul>

            <h3>3. 价格参考</h3>
            <ul>
                <li>小面：10-15元/碗</li>
                <li>抄手：15-25元/份</li>
                <li>火锅：人均80-150元</li>
            </ul>
        `
    },
    {
        id: 8,
        title: '杭州西湖一日游完全攻略',
        image: 'https://images.pexels.com/photos/2846003/pexels-photo-2846003.jpeg',
        category: 'culture',
        excerpt: '西湖十景打卡攻略，带你领略最美杭州风光',
        author: '江南游客',
        views: 7230,
        date: '2023-11-01',
        content: `
            <h2>杭州西湖游览攻略</h2>
            <p>西湖景区景点众多，如何合理安排行程是关键。本攻略为您规划最佳游览路线。</p>

            <h3>1. 经典游览路线</h3>
            <ul>
                <li>上午：断桥残雪 → 白堤 → 苏堤春晓</li>
                <li>中午：在湖边品尝杭帮菜</li>
                <li>下午：雷峰塔 → 花港观鱼 → 岳王庙</li>
                <li>傍晚：观看印象西湖表演</li>
            </ul>

            <h3>2. 特色体验</h3>
            <ul>
                <li>西湖游船：感受湖光山色</li>
                <li>龙井问茶：品味杭州茶文化</li>
                <li>南宋宋城：体验古代市井生活</li>
            </ul>

            <h3>3. 美食推荐</h3>
            <ul>
                <li>楼外楼：百年老字号</li>
                <li>外婆家：平价杭帮菜</li>
                <li>知味观：特色点心</li>
            </ul>
        `
    },
    {
        id: 9,
        title: '北京胡同深度游',
        image: 'https://images.pexels.com/photos/2846216/pexels-photo-2846216.jpeg',
        category: 'culture',
        excerpt: '探索老北京胡同文化，体验最地道的京城生活',
        author: '京城文化家',
        views: 6420,
        date: '2023-11-02',
        content: `
            <h2>北京胡同文化之旅</h2>
            <p>胡同是老北京最具特色的文化符号，让我们一起探索这些历史街巷的魅力。</p>

            <h3>1. 经典胡同推荐</h3>
            <ul>
                <li>南锣鼓巷：文艺范十足</li>
                <li>烟袋斜街：老北京风情</li>
                <li>什刹海：荷花胡同景区</li>
                <li>国子监街：文化气息浓厚</li>
            </ul>

            <h3>2. 特色体验</h3>
            <ul>
                <li>四合院参观：感受传统建筑之美</li>
                <li>胡同串串：体验地道小吃</li>
                <li>三轮车游胡同：另类观光方式</li>
            </ul>

            <h3>3. 美食地图</h3>
            <ul>
                <li>老北京炸酱面</li>
                <li>豆汁儿配焦圈</li>
                <li>驴打滚儿</li>
                <li>门钉肉饼</li>
            </ul>
        `
    },
    {
        id: 10,
        title: '云南丽江古城深度游',
        image: 'https://images.pexels.com/photos/2437293/pexels-photo-2437293.jpeg',
        category: 'culture',
        excerpt: '探索丽江古城文化，体验纳西族传统生活，感受古城的魅力',
        author: '文化探索者',
        views: 6120,
        date: '2023-11-03',
        content: `
            <h2>丽江古城游览攻略</h2>
            <p>丽江古城是世界文化遗产，以其独特的纳西族文化和古城风貌闻名于世。</p>

            <h3>1. 最佳游览路线</h3>
            <ul>
                <li>四方街：古城中心，可以买到各种特产</li>
                <li>木府：了解木氏家族历史</li>
                <li>狮子山：俯瞰古城全景的最佳地点</li>
                <li>黑龙潭：欣赏玉龙雪山倒影</li>
            </ul>

            <h3>2. 特色体验</h3>
            <ul>
                <li>纳西古乐表演：感受传统音乐魅力</li>
                <li>东巴文化体验：探索神秘文字</li>
                <li>纳西族服饰体验：穿越光之旅</li>
            </ul>

            <h3>3. 美食推荐</h3>
            <ul>
                <li>丽江粑粑：</li>
                <li>纳西火腿：特色美食</li>
                <li>鸡豆凉粉：解暑佳品</li>
            </ul>
        `
    },
    {
        id: 11,
        title: '广州美食一日游',
        image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
        category: 'food',
        excerpt: '一天时间带你打卡广州最地道的美食，从早茶到夜宵',
        author: '粤式美食家',
        views: 5890,
        date: '2023-11-04',
        content: `
            <h2>广州美食攻略</h2>
            <p>广州作为美食之都，从早茶点心到夜市小吃，处处彰显着独特的饮食文化。</p>

            <h3>1. 早茶推荐</h3>
            <ul>
                <li>陶陶居：百年老字号，点心出名</li>
                <li>莲香楼：传统早茶体验</li>
                <li>点都德：连锁品牌，性价比高</li>
            </ul>

            <h3>2. 特色小吃</h3>
            <ul>
                <li>肠粉：沙河粉制作，滑嫩可口</li>
                <li>艇仔粥：海鲜粥品经典</li>
                <li>吞面：每家都有独特做法</li>
            </ul>

            <h3>3. 夜宵地图</h3>
            <ul>
                <li>沙河夜市：各类烧烤小吃</li>
                <li>北京路：传统美食聚集</li>
                <li>上下九：老广州风味</li>
            </ul>
        `
    }
];

// 更新默认图片和图片源
const DEFAULT_IMAGES = {
    food: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    culture: 'https://images.pexels.com/photos/2846216/pexels-photo-2846216.jpeg',
    nature: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    shopping: 'https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg'
};

new Vue({
    el: '#travelGuide',
    data() {
        return {
            activeCategory: 'all',
            guideDialogVisible: false,
            currentGuide: null,
            
            // 分类数据
            categories: [
                { id: 'all', name: '全部', icon: 'fas fa-globe', description: '发现精彩旅行故事' },
                { id: 'food', name: '美食', icon: 'fas fa-utensils', description: '寻觅各地美食' },
                { id: 'culture', name: '文化', icon: 'fas fa-landmark', description: '探索文化遗产' },
                { id: 'nature', name: '自然', icon: 'fas fa-mountain', description: '亲近自然风光' },
                { id: 'shopping', name: '购物', icon: 'fas fa-shopping-bag', description: '享受购物乐趣' }
            ],
            
            // 攻数据
            guides: [],
            
            // 用户互动数据
            userInteractions: {
                likes: new Set(),
                favorites: new Set(),
                comments: {}
            },
            
            // 评论相关
            commentForm: {
                content: '',
                rating: 0
            },
            showCommentForm: false,
            currentGuideId: null,
            
            // 发布攻略表单
            shareFormVisible: false,
            shareForm: {
                title: '',
                category: '',
                content: '',
                excerpt: '',
                image: '',
                tags: []
            },
            // 标签相关
            inputTagVisible: false,
            inputTagValue: '',
            
            // 简化发布表单规则
            shareRules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { max: 50, message: '标题最多 50 个字符', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请输入攻略内容', trigger: 'blur' }
                ]
            },
            myGuidesVisible: false, // 我的发布对话框显示状态
            DEFAULT_IMAGE: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg', // 移到 data 中
            isLoading: true,
            isLoggedIn: false,
            scrollPosition: 0,
            isLikeAnimating: {},
            isFavoriteAnimating: {},
            favoritesCounts: {}, // 存储收藏数量
            expandedGuide: null, // 当前展开的攻略ID
        };
    },
    
    computed: {
        filteredGuides() {
            console.log('Filtering guides:', this.guides);
            console.log('Current category:', this.activeCategory);
            
            if (this.activeCategory === 'all') {
                return [...this.guides].sort((a, b) => b.views - a.views);
            }
            const filtered = this.guides
                .filter(guide => guide.category === this.activeCategory)
                .sort((a, b) => b.views - a.views);
                
            console.log('Filtered guides:', filtered);
            return filtered;
        },

        // 获取当前用户发布的攻略
        myGuides() {
            const currentUserId = this.getCurrentUserId();
            return this.guides.filter(guide => 
                guide.author === this.getCurrentUsername()
            ).sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    },
    
    methods: {
        // 打开发布表单
        openShareForm() {
            if (!this.checkLogin()) return;
            this.shareFormVisible = true;
        },

        // 分类切换
        handleCategoryChange(tab) {
            this.activeCategory = tab.name;
        },
        
        // 查看攻略详情
        viewGuide(guide) {
            if (!guide) return;
            this.currentGuide = guide;
            this.currentGuide.views++;
            this.guideDialogVisible = true;
            this.saveGuides();
        },

        // 关闭对话框
        handleDialogClose() {
            this.currentGuide = null;
            this.guideDialogVisible = false;
        },
        
        // 优化点赞方法
        toggleLike(guideId) {
            if (!this.checkLogin()) return;
            
            const guide = this.guides.find(g => g.id === guideId);
            if (!guide) return;
            
            // 设置动画状态
            this.$set(this.isLikeAnimating, guideId, true);
            
            if (this.userInteractions.likes.has(guideId)) {
                this.userInteractions.likes.delete(guideId);
                guide.likes = Math.max(0, (guide.likes || 1) - 1);
            } else {
                this.userInteractions.likes.add(guideId);
                guide.likes = (guide.likes || 0) + 1;
            }
            
            // 重置动画状态
            setTimeout(() => {
                this.$set(this.isLikeAnimating, guideId, false);
            }, 400);
            
            this.saveUserInteractions();
            this.saveGuides();
        },
        
        // 优化收藏方法
        toggleFavorite(guideId) {
            if (!this.checkLogin()) return;
            
            // 设置动画状态
            this.$set(this.isFavoriteAnimating, guideId, true);
            
            if (this.userInteractions.favorites.has(guideId)) {
                this.userInteractions.favorites.delete(guideId);
                this.$set(this.favoritesCounts, guideId, (this.favoritesCounts[guideId] || 1) - 1);
                this.$message({
                    message: '已取消收藏',
                    type: 'info',
                    duration: 1500
                });
            } else {
                this.userInteractions.favorites.add(guideId);
                this.$set(this.favoritesCounts, guideId, (this.favoritesCounts[guideId] || 0) + 1);
                this.$message({
                    message: '收藏成功',
                    type: 'success',
                    duration: 1500
                });
            }
            
            // 重置动画状态
            setTimeout(() => {
                this.$set(this.isFavoriteAnimating, guideId, false);
            }, 400);
            
            this.saveUserInteractions();
        },
        
        // 评论功能
        submitComment(guideId) {
            if (!this.checkLogin()) return;
            
            if (!this.commentForm.content.trim()) {
                this.$message.warning('请输入评论内容');
                return;
            }

            const comment = {
                id: Date.now(),
                userId: this.getCurrentUserId(),
                username: this.getCurrentUsername(),
                content: this.commentForm.content,
                rating: this.commentForm.rating,
                time: new Date().toISOString(),
                likes: 0
            };

            if (!this.userInteractions.comments[guideId]) {
                this.$set(this.userInteractions.comments, guideId, []);
            }
            this.userInteractions.comments[guideId].unshift(comment);
            
            this.commentForm.content = '';
            this.commentForm.rating = 0;
            this.showCommentForm = false;
            
            this.$message.success('评论发布成功');
            this.saveUserInteractions();
        },
        
        // 修改发布攻方法
        submitShare() {
            this.$refs.shareForm.validate(valid => {
                if (valid) {
                    // 自动生成摘要
                    const excerpt = this.shareForm.content
                        .replace(/<[^>]+>/g, '') // 移除HTML标签
                        .slice(0, 100) + '...';  // 取前100个字符

                    const guide = {
                        id: Date.now(),
                        title: this.shareForm.title,
                        category: this.shareForm.category,
                        content: this.shareForm.content,
                        excerpt: excerpt,
                        image: this.shareForm.image || 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg', // 默认图片
                        author: this.getCurrentUsername(),
                        views: 0,
                        likes: 0,
                        date: new Date().toISOString(),
                        tags: this.shareForm.tags
                    };
                    
                    this.guides.unshift(guide);
                    this.saveGuides();
                    
                    this.$message({
                        message: '发布成功！',
                        type: 'success',
                        duration: 2000
                    });
                    this.shareFormVisible = false;
                    this.resetShareForm();
                }
            });
        },

        // 简化重置表单方法
        resetShareForm() {
            this.shareForm = {
                title: '',
                category: '',
                content: '',
                excerpt: '',
                image: '',
                tags: []
            };
        },
        
        // 辅助方法
        checkLogin() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                this.$alert('请先登录后再操作', '提示', {
                    confirmButtonText: '去登录',
                    callback: () => {
                        window.location.href = 'login.html';
                    }
                });
                return false;
            }
            return true;
        },
        
        getCurrentUserId() {
            const userInfo = JSON.parse(localStorage.getItem('currentUser') || '{}');
            return userInfo.id;
        },
        
        getCurrentUsername() {
            const userInfo = JSON.parse(localStorage.getItem('currentUser') || '{}');
            return userInfo.username;
        },
        
        // 数持久化
        saveUserInteractions() {
            localStorage.setItem('userInteractions', JSON.stringify({
                likes: Array.from(this.userInteractions.likes),
                favorites: Array.from(this.userInteractions.favorites),
                comments: this.userInteractions.comments
            }));
        },
        
        saveGuides() {
            localStorage.setItem('guides', JSON.stringify(this.guides));
        },
        
        loadUserInteractions() {
            const saved = JSON.parse(localStorage.getItem('userInteractions') || '{}');
            this.userInteractions = {
                likes: new Set(saved.likes || []),
                favorites: new Set(saved.favorites || []),
                comments: saved.comments || {}
            };
        },
        
        loadGuides() {
            console.log('Loading guides from storage...');
            const savedGuides = localStorage.getItem('guides');
            if (savedGuides) {
                console.log('Found saved guides');
                this.guides = JSON.parse(savedGuides);
            } else {
                console.log('No saved guides, using default');
                this.guides = DEFAULT_GUIDES;
                this.saveGuides();
            }
            console.log('Current guides:', this.guides);
        },

        // 图片预览
        handlePreview(file) {
            const h = this.$createElement;
            this.$msgbox({
                title: '图片预览',
                message: h('img', {
                    attrs: {
                        src: file.url || URL.createObjectURL(file.raw),
                        style: 'max-width: 100%; max-height: 500px;'
                    }
                }),
                showCancelButton: false,
                confirmButtonText: '关闭'
            });
        },

        // 除图片
        handleRemove(file, fileList) {
            const index = this.shareForm.images.indexOf(file);
            if (index !== -1) {
                this.shareForm.images.splice(index, 1);
            }
        },

        // 修改图片上传验证
        beforeUpload(file) {
            const isImage = file.type.startsWith('image/');
            const isLt5M = file.size / 1024 / 1024 < 5; // 放宽到5MB

            if (!isImage) {
                this.$message.warning('请上传图片文件');
                return false;
            }
            if (!isLt5M) {
                this.$message.warning('图片大小不能超过 5MB');
                return false;
            }
            return true;
        },

        // 图片上传成功后的处理
        handleSuccess(response, file) {
            // 在实际项目中，这里应该处理服务器返回的图片URL
            // 这里我们使用本地预览URL作为示例
            this.shareForm.image = URL.createObjectURL(file.raw);
        },

        // 图片上传失败的处理
        handleError() {
            this.$message.error('图片上传失败，请重试');
        },

        // 标签相关方法
        handleTagClose(tag) {
            this.shareForm.tags.splice(this.shareForm.tags.indexOf(tag), 1);
        },
        
        showInputTag() {
            this.inputTagVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        
        handleInputConfirm() {
            let inputValue = this.inputTagValue;
            if (inputValue && !this.shareForm.tags.includes(inputValue)) {
                this.shareForm.tags.push(inputValue);
            }
            this.inputTagVisible = false;
            this.inputTagValue = '';
        },

        // 优化点赞数显示
        getLikeText(guide) {
            const count = guide.likes || 0;
            if (count >= 1000000) {
                return `${(count / 1000000).toFixed(1)}M`;
            }
            if (count >= 1000) {
                return `${(count / 1000).toFixed(1)}k`;
            }
            return count.toString();
        },

        // 显示我的发布
        showMyGuides() {
            if (!this.checkLogin()) return;
            this.myGuidesVisible = true;
        },

        // 删除攻略
        handleDeleteGuide(guide) {
            this.$confirm('确定要删除这篇攻略吗？此操作不可恢复', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 从攻略列表中移除
                const index = this.guides.findIndex(g => g.id === guide.id);
                if (index > -1) {
                    this.guides.splice(index, 1);
                    this.saveGuides();

                    // 同时删除相关的互动数据
                    this.userInteractions.likes.delete(guide.id);
                    delete this.userInteractions.comments[guide.id];
                    this.saveUserInteractions();

                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // 格式化日期
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        },

        // 获取分类名称的方法
        getCategoryName(categoryId) {
            const category = this.categories.find(cat => cat.id === categoryId);
            return category ? category.name : categoryId;
        },

        // 修改图片加载失败处理
        handleImageError(e, category) {
            console.log('Image load error for category:', category);
            e.target.onerror = null;
            e.target.src = this.getDefaultImage(category);
        },

        // 添加新方法
        checkLoginStatus() {
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        },

        goHome() {
            window.location.href = '../index.html';
        },

        logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            this.$message.success('已退出登录');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        },

        handleScroll() {
            this.scrollPosition = window.scrollY;
        },

        // 优化加载方法
        async loadGuides() {
            this.isLoading = true;
            try {
                const savedGuides = localStorage.getItem('guides');
                if (savedGuides) {
                    this.guides = JSON.parse(savedGuides);
                } else {
                    // 添加短暂延迟以显示加载动画
                    await new Promise(resolve => setTimeout(resolve, 800));
                    this.guides = DEFAULT_GUIDES;
                    this.saveGuides();
                }
            } catch (error) {
                this.$message.error('加载失败，请刷新重试');
                console.error('Error:', error);
            } finally {
                this.isLoading = false;
            }
        },

        // 添加图片加载成功处理
        handleImageLoad(e) {
            console.log('Image loaded successfully:', e.target.src);
            e.target.classList.add('image-loaded');
        },

        // 在 methods 中添加获取默认图片的方法
        getDefaultImage(category) {
            return DEFAULT_IMAGES[category] || DEFAULT_IMAGES.culture;
        },

        // 添加全局错误处理
        handleError(error, context) {
            console.error(`Error in ${context}:`, error);
            this.$message({
                type: 'error',
                message: '操作失败，请稍后重试',
                duration: 3000,
                showClose: true
            });
        },

        // 获取收藏数量
        getFavoriteCount(guideId) {
            return this.favoritesCounts[guideId] || 0;
        },

        // 获取评论数量
        getCommentCount(guideId) {
            return (this.userInteractions.comments[guideId] || []).length;
        },

        // 添加切换内容显示的方法
        toggleContent(guideId) {
            if (this.expandedGuide === guideId) {
                this.expandedGuide = null;
            } else {
                this.expandedGuide = guideId;
                // 添加展开动画后滚动到内容
                this.$nextTick(() => {
                    const content = document.querySelector(`#guide-${guideId} .guide-full-content`);
                    if (content) {
                        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                });
            }
        },

        // 修改现有的 viewGuide 方法
        viewGuide(guide) {
            // 如果已经展开，则收起
            if (this.expandedGuide === guide.id) {
                this.expandedGuide = null;
                return;
            }
            // 展开内容
            this.toggleContent(guide.id);
            // 增加浏览量
            guide.views++;
            this.saveGuides();
        },

        handleGuideSelect(guide) {
            // ...
        },

        handleViewDetail(item) {
            // ...
        }
    },
    
    mounted() {
        console.log('Starting to load guides...');
        
        this.loadGuides();
        
        if (this.guides.length === 0) {
            console.warn('No guides loaded, loading default guides...');
            this.guides = DEFAULT_GUIDES;
            this.saveGuides();
        }
        
        this.loadUserInteractions();
        
        // 添加错误处理
        window.addEventListener('error', (e) => {
            console.error('Error:', e);
            this.$message.error('操作失败，请刷新页面重试');
        });
    },

    created() {
        // 检查登录状态
        this.checkLoginStatus();
        // 添加滚动监听
        window.addEventListener('scroll', this.handleScroll);
    },

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}); 