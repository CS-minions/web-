Vue.use(ELEMENT);

new Vue({
    el: '#guides',
    data() {
        return {
            destinations: [
                {
                    id: 1,
                    name: '北京',
                    guides: [
                        {
                            id: 1,
                            title: '故宫一日游攻略',
                            content: '故宫是中国明清两代的皇家宫殿，是中国最大的古代宫殿建筑群...',
                            author: '旅行家小明',
                            publishTime: '2024-01-20',
                            likes: 128,
                            isLiked: false,
                            comments: [
                                {
                                    id: 1,
                                    user: '游客A',
                                    content: '攻略很实用！',
                                    time: '2024-01-21 10:30'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    name: '上海',
                    guides: [
                        {
                            id: 2,
                            title: '外滩夜景拍摄指南',
                            content: '外滩是上海最著名的景点之一，尤其是夜景更是美不胜收...',
                            author: '摄影师小王',
                            publishTime: '2024-01-19',
                            likes: 256,
                            isLiked: false,
                            comments: []
                        }
                    ]
                }
            ],
            showCommentDialog: false,
            currentComments: [],
            newComment: '',
            currentGuide: null
        };
    },
    methods: {
        toggleLike(guide) {
            if (!this.checkLogin()) return;
            
            guide.isLiked = !guide.isLiked;
            guide.likes += guide.isLiked ? 1 : -1;
        },
        showComments(guide) {
            this.currentGuide = guide;
            this.currentComments = guide.comments;
            this.showCommentDialog = true;
        },
        submitComment() {
            if (!this.checkLogin()) return;
            if (!this.newComment.trim()) {
                this.$message.warning('请输入评论内容');
                return;
            }

            const comment = {
                id: Date.now(),
                user: JSON.parse(localStorage.getItem('currentUser')).username,
                content: this.newComment,
                time: new Date().toLocaleString()
            };

            this.currentGuide.comments.push(comment);
            this.newComment = '';
            this.$message.success('评论成功');
        },
        checkLogin() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                this.$message.warning('请先登录');
                return false;
            }
            return true;
        },
        goToHome() {
            window.location.href = '../index.html';
        }
    }
}); 