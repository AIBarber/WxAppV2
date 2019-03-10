// pages/Barber/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'U', value: '2019年2月2日  12:00' },
      { name: 'C', value: '2019年2月3日  12:00'},
    ],
    items1: [
      { name: 'v', value: '天空沙龙' },
      { name: 's', value: '美美发型' },
    ]
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  navigate: function (e) {
    wx.navigateTo({
      url: '../start/start?artype=' + e.currentTarget.dataset.arid
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