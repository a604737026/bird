import * as echarts from '../../ec-canvas/echarts';

//这里进行了echats组件的初始化配置
function initCharts({
  type,
  value,
  color
}, ecComponent) {
  ecComponent.init((canvas, width, height, dpr) => {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr
    });
    chart.setOption(setOption(value, color)[type]);
    return chart;
  });
}
//这个函数主要是返回温度仪表盘的配置信息,可在官网的示例中coppy下来用
function setOption(value, color) {
  return {
    temp: { //温度仪表盘
      series: [{ //仪表管
          type: 'gauge',
          startAngle: 200,
          endAngle: -20,
          center: ['50%', '50%'],
          radius: '65%',
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: color[0]
          },
          progress: {
            show: true,
            width: 9
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 9
            }
          },
          axisTick: { // 副刻度线
            distance: -13,
            splitNumber: 5,
            center: ['50%', '0%'],
            length: 2,
            lineStyle: {
              width: 0.7,
              color: '#999'
            }
          },
          splitLine: { // 主刻度线
            distance: -17,
            length: 3,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: { // 仪表盘字体
            distance: -7,
            color: '#999',
            fontSize: 8
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: { //字体设置
            valueAnimation: true,
            width: '2%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-12%'],
            fontSize: 15,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'auto'
          },
          data: [{
            value: value
          }]
        },
        {
          type: 'gauge',
          center: ['50%', '50%'],
          startAngle: 200,
          endAngle: -20,
          radius: '65%',
          min: 0,
          max: 60,
          itemStyle: {
            color: color[1]
          },
          progress: {
            show: true,
            width: 3 //仪表管道深色宽度
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{
            value: value
          }]
        }
      ]
    }
  };
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    temp: 37.5 //这里设置温度为37.5度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //通过函数调用，解构的形式进行传参
    initCharts({
      type: 'temp',
      value: this.data.temp,
      color: ['#FFAB91', 'rgb(253,114,71)']
    }, this.selectComponent('#echarts_temp'));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.videoContext = wx.createVideoContext('videoplayer');
    // this.setData({
    //   updateState: true
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

})