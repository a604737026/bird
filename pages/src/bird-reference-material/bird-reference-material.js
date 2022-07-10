var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allData:'0',
        idxLength:'10',
        mateList:[],
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

    },


    allBtn:function(){
        let that = this;
        let allData = that.data.allData;
        let idxLength = that.data.mateList.length;
        if (allData == '0'){
            that.setData({
                idxLength: idxLength,
                allData:'1',
            })
        }else{
            that.setData({
                idxLength: '10',
                allData: '0',
            })
        }
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

    }
})

iFunction = {
    getList: function (that){
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection:"bird_text"
            },
            success: res => {
                console.log(res);
                let mateList = res.result.data[0].data;
                that.setData({
                    mateList,
                })
            }
        })
    },
}