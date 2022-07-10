Page({

    /**
     * 页面的初始数据
     */
    data: {
        toutiao: [{
                title: "《精灵宝可梦GO》下载量破10亿次 全新斋藤飞鸟CM公布",
            },
            {
                title: "斋藤飞鸟低估了自己在中国的受欢迎程度,被现场粉丝感动!",
            },
            {
                title: "斋藤飞鸟对婚姻的看法,太让人意外了,粉丝表示燃起了希望!",
            },
            {
                title: "斋藤飞鸟镜头前落泪,凄美模样看呆网友,粉丝:小鸟是水做的!",
            },
            {
                title: "斋藤飞鸟哲理发言引热议 高颜值美少女惹人爱",
            },
        ],
        circulateAnimation: '',
        urlList: [{
                id: 0,
                url: '/pages/src/bird-data/bird-data',
                name: '小鸟资料'
            },
            {
                id: 1,
                url: '/pages/src/bird-early-experience/bird-early-experience',
                name: '早年经历'
            },
            {
                id: 2,
                url: '/pages/src/bird-performing-experience/bird-performing-experience',
                name: '演艺经历'
            },
            {
                id: 3,
                url: '/pages/src/bird-major-works/bird-major-works',
                name: '主要作品'
            },
            {
                id: 4,
                url: '/pages/src/bird-variety-show/bird-variety-show',
                name: '综艺节目'
            }, {
                id: 5,
                url: '/pages/src/bird-reference-material/bird-reference-material',
                name: '参考资料'
            },
        ],
        nogizakaList: [{
                id: 0,
                url: '/pages/src/nogizaka/nogizaka-data/nogizaka-data',
                name: '乃木资料'
            },
            {
                id: 1,
                url: '/pages/src/nogizaka/nogizaka-performing-experience/nogizaka-performing-experience',
                name: '演艺经历'
            },
            {
                id: 2,
                url: '/pages/src/nogizaka/nogizaka-major-works/nogizaka-major-works',
                name: '主要作品'
            },
            {
                id: 3,
                url: '/pages/src/nogizaka/nogizaka-social-activities/nogizaka-social-activities',
                name: '社会活动'
            },
            {
                id: 4,
                url: '/pages/src/nogizaka/nogizaka-award-records/nogizaka-award-records',
                name: '获奖记录'
            },
            {
                id: 5,
                url: '/pages/src/nogizaka/nogizaka-character-evaluation/nogizaka-character-evaluation',
                name: '人物评价'
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var circulateAnimation = wx.createAnimation({
            timingFunction: 'linear',
            delay: 0
        })
        //设置头条循环滚动动画
        var next = true;
        var joinList = that.data.toutiao;
        var join = {
            id: 0,
            title: joinList[0].title
        }
        // console.log(join)
        that.setData({
            join
        })
        setInterval(function () {
            var rollWidth = 0;
            circulateAnimation.translateY(-30).step({
                duration: 800,
                timingFunction: 'ease-out'
            }).translateY(-60).step({
                duration: 800,
                delay: 1500,
                timingFunction: 'ease-in'
            }).translateY(0).step({
                duration: 0
            })
            if (join.id < joinList.length - 1) {
                join.id++;
                join.title = joinList[join.id].title;
            } else {
                join.id = 0;
                join.title = joinList[0].title;
            }
            that.setData({
                circulateAnimation: circulateAnimation.export(),
                join: join
            })
        }.bind(this), 3500)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.showLoading({
            title: '加载中...',
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 100)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 点击链接
    urlBtn(e) {
        let url = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: url,
        })
    },

    // 设置
    setUpBtn: function (e) {
        wx.navigateTo({
            url: '/pages/src/bird-setUp/bird-setUp',
        })
    },

})