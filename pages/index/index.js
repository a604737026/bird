var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        fourStages: [],
        contentItems: [],
        listItem: [],
        //所有图片的高度  （必须）
        imgheights: [],
        //图片宽度 
        imgwidth: 750,
        //默认  （必须）
        current: 0
    },
    imageLoad: function(e) { //获取图片真实宽度  
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        iFunction.getList(that);
    },
    bindchange: function(e) {
        // console.log(e.detail.current)
        this.setData({
            current: e.detail.current
        })
    },
    listBtn: function(e) {
        var id = e.currentTarget.dataset.id;
        // console.log(id);
        if (id == 0) {
            wx.navigateTo({
                url: '/pages/src/bird-data/bird-data',
            })
        } else if (id == 1) {
            wx.navigateTo({
                url: '/pages/src/bird-early-experience/bird-early-experience',
            })
        } else if (id == 2) {
            wx.navigateTo({
                url: '/pages/src/bird-performing-experience/bird-performing-experience',
            })
        } else if (id == 3) {
            wx.navigateTo({
                url: '/pages/src/bird-major-works/bird-major-works',
            })
        } else if (id == 4) {
            wx.navigateTo({
                url: '/pages/src/bird-variety-show/bird-variety-show',
            })
        }

    },
    onShow:function(){
        wx.showLoading({
            title: '加载中...',
        })

        setTimeout(function () {
            wx.hideLoading()
        }, 100)
    },

    onReady: function() {
        
    },
})
iFunction = {
    getList: function (that) {
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection: "bird_index"
            },
            success: res => {
                console.log(res);
                let imgUrls = res.result.data[0].imgUrls;
                let fourStages = res.result.data[0].fourStages;
                let contentItems = res.result.data[0].contentItems;
                let listItem = res.result.data[0].listItem;
                that.setData({
                    imgUrls,
                    fourStages,
                    contentItems,
                    listItem
                })
            }
        })
    },
}