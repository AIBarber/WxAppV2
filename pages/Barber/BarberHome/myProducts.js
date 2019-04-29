// pages/Barber/BarberHome/myProducts.js

var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    note: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadImages();
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

  loadImages:function () {
    var that = this;
    util.weshowRequest(
      api.BarberOrderList,
      {
        "barberId": app.globalData.barberId,
        "statusStr": "1,2,3"
      },
      'POST').then(res => {
        var orderInfo = res.data.bizContent.order;
        //console.log(res.data.bizContent)
        // success
        that.setData({
          note: orderInfo
        });
       
      }).catch((err) => {
        console.log('barberInfo err :' + err);
      });
  }
  ,
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
  navToPicshow: function (e){
    var index = e.currentTarget.dataset.index
    var orderInfo = this.data.note;
    console.log(orderInfo)
    var imageList = [];
    if (orderInfo[index].endImg){
        imageList.push(encodeURIComponent(orderInfo[index].endImg.url));
        imageList.push(encodeURIComponent(orderInfo[index].beginImg.url));
        var imgList = JSON.stringify(imageList);
        console.log(imgList);
        wx.navigateTo({
          url: 'pictureShow?imageList=' + imgList
        })
    }
  }
})