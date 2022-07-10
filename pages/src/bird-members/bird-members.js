var iFunction = {};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        //所有图片的高度  （必须）
        imgheights: [],
        //图片宽度 
        imgwidth: 750,
        //默认  （必须）
        current: 0,
        nogizakaFortySix: [],
        nogizakaList: [],
        scrollViewWidth: "",
        current: 101,
        leftId: 101,
        rightId: 101,
        rightArr: [],
        // 控制menu页面的轮播图高度 为520
        imgHeight: 520,
    },
    // imageLoad: function (e) { //获取图片真实宽度  
    //     var imgwidth = e.detail.width,
    //         imgheight = e.detail.height,
    //         //宽高比  
    //         ratio = imgwidth / imgheight;
    //     // console.log(imgwidth, imgheight)
    //     //计算的高度值  
    //     var viewHeight = 750 / ratio;
    //     var imgheight = viewHeight;
    //     var imgheights = this.data.imgheights;
    //     //把每一张图片的对应的高度记录到数组里  
    //     imgheights[e.target.dataset.id] = imgheight;
    //     this.setData({
    //         imgheights: imgheights
    //     })
    // },
    // bindchange: function (e) {
    //     this.setData({
    //         current: e.detail.current
    //     })
    // },
    // 预览图片
    previewImg: function (e) {
        var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
        wx.previewImage({
            current: imgUrl, //当前图片地址
            urls: [imgUrl], //所有要预览的图片的地址集合数组形式
            // urls: [imgUrl], //一张图写法
            success: function (res) {},
            fail: function (res) {},
            complete: function (res) {},
        })
    },

    //左侧点击事件 获取每一项上的自定义属性值，给到current 每次点击 对active类名进行添加加或删除
    changeFn(e) {
        // console.log(e.currentTarget.dataset.id);
        let index = e.currentTarget.dataset.id;
        this.setData({
            current: index, //修改data中的值
            leftId: index,
            rightId: index
        })
    },
    // 右侧滚动事件
    bindscrollFn(e) {
        let st = e.detail.scrollTop; //获取右侧内容滚动的高度
        // console.log(st)
        let tempArr = this.data.menuArr; //获取data中的rightArr数组
       
        // for (let i = 0; i < tempArr.length; i++) {
        //     // 每个box都有高度，st在第index个box和(index+1)之间的话,当前就是index
        //     // 减去10像素，是因为当点击左侧第二项的时候，第二项头部还有第一项底部的空间，此时会闪跳选中第一项，而第二项没被选中
        //     if (st >= tempArr[i] - 10 && st < tempArr[i + 1] - 10) {
        //         // 将数组的索引给到左侧滚动的id
        //         this.setData({
        //             current: i,
        //             leftId: i,
        //         })
        //         return; //当当前项符合条件的时候，结束本次循环，避免符合条件时还在一直循环，导致页面卡顿
        //     }
        // }
    },

    // 相当于 vue 生命周期 mounted
    getBoxH() {
        let _this = this; //存储this，避免this指向被修改报错
        // 使用定时器的原因：因为数组在遍历的时候是有延迟的，onReady挂载完成了，但是数组还在渲染， 
        // query.exec抢在页面数组渲染完成前，拿到盒子的高度导致数据不准确,
        // 使用定时器就是为了等到页面数组的数据渲染完成在获取盒子的高度，这时拿到的数据是比较准确的
        setTimeout(() => {
            const query = wx.createSelectorQuery()
            query.selectAll('.box').boundingClientRect() //获取所有box盒子的高度 .box是类名
            query.selectViewport().scrollOffset()
            let heightArr = [0]; //定义一个第0项值为0的数组，用于存储所有盒子的高度
            let baseNum = 0;
            query.exec(function (res) {
                // console.log(res[0]);
                // 遍历res[0],获取其中每一项的height值
                res[0].map(val => {
                    //因为比较的高度是当前项高度与当前项高和下一项值高度的和，所以要累加之后再存储到heightArr
                    baseNum += val.height;
                    heightArr.push(baseNum)
                })
                // console.log(heightArr);
                // 将heightArr数组数据存储到rightArr中 ，在其他地方使用
                _this.setData({
                    rightArr: heightArr
                })
            })
        }, 500)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.showLoading({
            title: '加载中...',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // const query = wx.createSelectorQuery().in(this);
        // query.select('#nogizakaFortySix').boundingClientRect(res => {
        //     this.setData({
        //         scrollViewWidth: Math.round(res.width)
        //     })
        // }).exec()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 使用云函数请求数据
        let that = this;
        that.getBoxH();
        iFunction.getList(that);
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

    // 点击右侧内容
    rightBtn(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/src/nogizaka/nogizaka-member-information/nogizaka-member-information?id=' + id,
        })
    }
    
})

iFunction = {
    getList: function (that) {
        wx.cloud.init()
        wx.cloud.callFunction({
            name: "getList",
            data: {
                collection: "bird_member"
            },
            success: res => {
                console.log(res);
                let resData = res.result.data[0].nogizakaFortySix;
                let menuArr = [];
                resData.forEach(v=> {
                   v.nogizakaList.map(k=> menuArr.push(k))
                })
                // console.log(menuArr);
                that.setData({
                    nogizakaFortySix:resData
                })
                wx.hideLoading()
            }
        })
    },
}