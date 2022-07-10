var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperImgs: [],
        name: "",
        contentItems: [],
        listItem: [],
        //所有图片的高度  （必须）
        imgheights: [],
        //图片宽度 
        imgwidth: 750,
        //默认  （必须）
        current: 0
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

     // 预览图片
     previewImg: function (e) {
        var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
        wx.previewImage({
            current: imgUrl, //当前图片地址
            urls: this.data.swiperImgs, //所有要预览的图片的地址集合数组形式
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
        wx.showLoading({
            title: '加载中...',
        })
        iFunction.getList(that, options.id);
    },
    bindchange: function (e) {
        this.setData({
            current: e.detail.current
        })
    },
    listBtn: function (e) {
        var id = e.currentTarget.dataset.id;
        // console.log(id);
        // if (id == 0) {
        //     wx.navigateTo({
        //         url: '/pages/src/bird-data/bird-data',
        //     })
        // } else if (id == 1) {
        //     wx.navigateTo({
        //         url: '/pages/src/bird-early-experience/bird-early-experience',
        //     })
        // } else if (id == 2) {
        //     wx.navigateTo({
        //         url: '/pages/src/bird-performing-experience/bird-performing-experience',
        //     })
        // } else if (id == 3) {
        //     wx.navigateTo({
        //         url: '/pages/src/bird-major-works/bird-major-works',
        //     })
        // } else if (id == 4) {
        //     wx.navigateTo({
        //         url: '/pages/src/bird-variety-show/bird-variety-show',
        //     })
        // }

    },
    onShow: function () {
       
    },

    onReady: function () {

    },
})
iFunction = {
    getList: function (that, id) {
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection: "bird_member"
            },
            success: res => {
                console.log(res);
                let resData = res.result.data[0].nogizakaFortySix;
                let arr = [],
                    swiperImgs = [],
                    contentItems = [],
                    listItem = [],
                    name = "";
                resData.forEach(v => {
                    v.nogizakaList.forEach(k => {
                        if (k.stageId == id) {
                            arr = k
                        }
                    });
                });
                swiperImgs = arr.swiperImgs;
                contentItems = arr.contentItems;
                listItem = arr.listItem;
                name = arr.name;
                that.setData({
                    swiperImgs,
                    name,
                    listItem,
                    contentItems,
                })
                wx.hideLoading()
            }
        })
    },
}