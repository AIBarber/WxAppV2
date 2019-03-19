// pages/Barber/seat/seat.js
var app = getApp();
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // seatList: [{ 'id': 1, 'haircutImg': { 'url': '../../../icon/default_pic.png', 'createTime': '当前' } }, { 'id': 2, 'haircutImg': { 'url': '../../../icon/default_pic.png', 'createTime': '当前' } }],
    seatList: [],
    seatNum: null,
    storeId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      storeId:options.storeid
    })
  },
 
  getValue:function(e){
    console.log(e);
    this.setData({
      seatNum:e.detail.value
    })
  },


  getSeatlist:function(){
    console.log('getSeatList ' + api.GetfacebySeat);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "seatNo": that.data.seatNum,
      "storeId": that.data.storeId     
    }
    util.weshowRequest(
      api.GetfacebySeat,
      bizContent,
      'POST').then(res => {
        var a = JSON.stringify(res.data);
        console.log(a)
        that.setData({
          seatList: res.data.bizContent.face,
        });
        util.stopRefreshing;
      }).catch((err) => {
        console.log('GetfacebySeat err :' + err);
        // fail
        util.stopRefreshing;
      });
  },

  skip:function(){

  },

  /*返回前一页*/
  backToprevPage: function () {
    wx.navigateBack({
    })
  },
  
  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})