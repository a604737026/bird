var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        nogizakaUrls: [],
        aggregate: [],
        //所有图片的高度  （必须）
        imgheights: [],
        //图片宽度 
        imgwidth: 750,
        //默认  （必须）
        current: 0,
        nogizakaFortySix: [],
        nogizakaList: [],
        nogizakaId: null,
        stageId: null,
        scrollLeft: 0,
        scrollViewWidth: "",
    },
    imageLoad: function (e) { //获取图片真实宽度  
        var imgwidth = e.detail.width,
            imgheight = e.detail.height,
            //宽高比  
            ratio = imgwidth / imgheight;
        // console.log(imgwidth, imgheight)
        //计算的高度值  
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight;
        var imgheights = this.data.imgheights;
        //把每一张图片的对应的高度记录到数组里  
        imgheights[e.target.dataset.id] = imgheight;
        this.setData({
            imgheights: imgheights
        })
    },
    bindchange: function (e) {
        // console.log(e.detail.current)
        this.setData({
            current: e.detail.current
        })
    },
    // 预览图片
    previewImg: function (e) {
        var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
        var imgArr = this.data.nogizakaUrls;
        wx.previewImage({
            current: imgUrl, //当前图片地址
            urls: imgArr, //所有要预览的图片的地址集合数组形式
            // urls: [imgUrl], //一张图写法
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    },
    previewImg2: function (e) {
        var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
        var imgArr = this.data.aggregate.map(v => v.img);
        wx.previewImage({
            current: imgUrl, //当前图片地址
            urls: imgArr, //所有要预览的图片的地址集合数组形式
            // urls: [imgUrl], //一张图写法
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        iFunction.getList(that);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const query = wx.createSelectorQuery().in(this);
        query.select('#nogizakaFortySix').boundingClientRect(res => {
            this.setData({
                scrollViewWidth: Math.round(res.width)
            })
        }).exec()
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

    // 切换Tab
    nogizakaBtn(e) {
        let nogizakaId = e.currentTarget.dataset.id;
        let nogizakaList = this.data.nogizakaFortySix.find(v =>
            v.id == nogizakaId
        ).nogizakaList;
        let aggregate = nogizakaList[0].aggregate;
        let stageId = nogizakaList[0].stageId;
        this.setData({
            nogizakaId,
            nogizakaList,
            aggregate,
            stageId,
            scrollLeft: 0
        })
    },
    stageBtn(e) {
        let stageId = e.currentTarget.dataset.id;
        let aggregate = this.data.nogizakaList.find(v =>
            v.stageId == stageId
        ).aggregate;
        let offsetLeft = e.currentTarget.offsetLeft
        this.setData({
            stageId,
            aggregate,
            scrollLeft: offsetLeft - this.data.scrollViewWidth / 2
        })
    },
})

iFunction = {
    getList: function (that) {
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection: "bird_products"
            },
            success: res => {
                console.log(res);
                let imgUrls = res.result.data[0].imgUrls;
                let nogizakaUrls = res.result.data[0].nogizakaUrls;
                let aggregate = res.result.data[0].nogizakaFortySix[0].nogizakaList[0].aggregate;
                let nogizakaFortySix = res.result.data[0].nogizakaFortySix;
                let nogizakaId = nogizakaFortySix[0].id;
                let nogizakaList = nogizakaFortySix[0].nogizakaList;
                let stageId = nogizakaFortySix[0].nogizakaList[0].stageId;
                that.setData({
                    imgUrls,
                    nogizakaUrls,
                    aggregate,
                    nogizakaFortySix,
                    nogizakaId,
                    nogizakaList,
                    stageId
                })
            }
        })
    },
}