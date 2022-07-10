var iFunction = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    type: null,
    flag: false,
    videoInfo: {
      src: "",
      title: "",
      viewCount: 0,
      createTime: 1234567890,
      name: "",
      desc: "",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let type = options.type
    this.setData({
      id,
      type,
    })
    let that = this;
    iFunction.getList(that, id, type);
  },
  onShow() {
    let that = this;
    iFunction.dateOpen(that);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
iFunction = {
  // 定时器，时间一到自动显示
  dateOpen(that) {
    let date = new Date();
    let newDay = date.getTime();
    let dateOpen = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1).getTime()+ 10.5* 3600*1000;
    // console.log(newDay,dateOpen);
    var timer = setInterval(() => {
      if (date > dateOpen) {
        that.setData({
          flag: true
        })
        clearInterval(timer);
      }
    },1000)
  },

  // 获取视频内容
  getList: function (that, id, type) {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "getList",
      data: {
        collection: "major_work"
      },
      success: res => {
        let film = res.result.data[0].film;
        let tvplay = res.result.data[0].tvplay;
        let videoInfo = type == 0 ? film.find(v => (v.id == id && v.type == type)).videoInfo : tvplay.find(v => (v.id == id && v.type == type)).videoInfo;
        that.setData({
          videoInfo,
        })
      }
    })
  },
  /**
   * 获取视频详情
   */
  getDetail: function (that, id) {
    _g.ajax({
      url: '/api/egaiyiVideo/getDetail',
      data: {
        id
      },
      type: 'GET',
      fail() {
        wx.showToast({
          title: '播放失败',
        })
      },
    }, res => {
      let videoInfo = res.data,
        commodity = videoInfo.commodityList || []
      videoInfo.videoUrl = JSON.parse(videoInfo.videoUrl)
      videoInfo.createTime = new Date(videoInfo.createTime * 1000).Format('yyyy.MM.dd')
      videoInfo.name = "视频"
      if (videoInfo.viewCount >= 10000) {
        videoInfo.viewCount = (videoInfo.viewCount / 10000).toFixed(1) + '万'
      }

      let {
        videoH,
        win_W,
        win_H,
      } = iFunctions._countVideoHeight(videoInfo.videoUrl.width, videoInfo.videoUrl.height)
      that.setData({
        videoInfo,
        commodity,
        videoH,
        win_W,
        win_H,
        commodityType: videoInfo.commodityType
      })
    })
  },

  /**
   * 计算视频video标签高度
   */
  _countVideoHeight(width, height) {
    let sysInfo = wx.getSystemInfoSync(),
      win_W = sysInfo.windowWidth,
      win_H = sysInfo.windowHeight,
      videoH = win_W * height / width

    if (videoH >= win_H * 0.9) videoH = win_H * 0.9
    return {
      videoH,
      win_W,
      win_H,
    }
  },
}