// pages/baeber/barber_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bardetail:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字',
    worktitle:'一颗小*',
    endtime:"2018.12.6",
    hairstyle:"短发",
    barber:{},
    barscore:70,
    objectArray: [
      {
        id: 0,
        name: '一级染发',
        text:'完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发完美的染发'
      },
      {
        id: 1,
        name: '二级染发',
        text: '完美的染发机器啊完美的染发机器啊完美的染发机器啊完美的染发机器啊完美的染发机器啊完美的染发机器啊完美的染发机器啊'
      },
      {
        id: 2,
        name: 'san级染发',
        text: 'san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发san级染发'
      },
      
    ],
    index: 0,
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://47.94.144.77:9090/weshow/barber/getbarberinfo', // 仅为示例，并非真实的接口地址
      data: {
        "openId": "12345",
        "timestamp": "123123123",
        "appid": "123",
        "nonce": "345345",
        "algorithm": "xxx",
        "token": "12313",
        "version": "2.0",
        "bizContent": {
          "barberId": "1"
        }
      },
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // var result = JSON.parse(res.data.bizContent);
        // var barber = result.bizContent.barberinfo;
        console.log(res.data.bizContent.barberinfo);
        that.setData({
          barber: res.data.bizContent.barberinfo
        })
        
        console.log(res.data)
      }
    })
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