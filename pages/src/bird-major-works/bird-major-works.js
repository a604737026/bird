// pages/src/bird-major-works/bird-major-works.js
var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 电影
        film: [],
        // 电视剧
        tvplay: [],
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
    // 跳转到视频
    videoBtn(e) {
        let id = e.currentTarget.dataset.id;
        let type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/pages/src/bird-video-details/bird-video-details?id=" + id + "&type=" + type,
        })
    },
})
iFunction = {
    getList: function (that) {
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection: "major_work"
            },
            success: res => {
                console.log(res);
                let film = res.result.data[0].film;
                let tvplay = res.result.data[0].tvplay;
                that.setData({
                    film,
                    tvplay
                })
            }
        })
    },
}