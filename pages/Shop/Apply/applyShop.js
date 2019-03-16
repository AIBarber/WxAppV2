// pages/Shop/Apply/applyShop.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '../../../icon/headPhoto.png',
    name: null,
    address: null,
    openTime: null,
    size: null,
    status: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  //拍照事件处理
  takePhoto: function () {
    // const ctx = wx.createCameraContext()
    // ctx.takePhoto({
    //   quality: 'high',
    //   success: (res) => {
    //     this.setData({
    //       photo: res.tempImagePath
    //     })
    //   }
    // })
     wx.chooseImage({
      count: 1, //最多可以选择的图片张数,默认9
      //sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var that=this;
        that.setData({
          photo: tempFilePaths[0]
        })
        console.log(that.data.photo);
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: '上传失败，请重试！',
        })
      }
    })
   },

  /*返回前一页*/
  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  getValue: function (e) {
    console.log(e);
    var index = e.target.id;
    var value = e.detail.value;
    if (index == 1) {
      this.setData({
        name: value
      })
    } else if (index == 2) {
      this.setData({
        size: value
      })
    } else if (index == 3) {
      this.setData({
        address: value
      })
    } else {
      this.setData({
        openTime: value
      })
    }
    console.log(this.data)
  },

  applySubmit: function () {
    console.log('getDataList ' + api.OpenStoreAdd);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.OpenStoreAdd,
      {
        "customerId": app.globalData.userid,
        "name": that.data.name,
        "mobile": "13833338888",
        "category": 1,
        "seatNum": 6,
        "businessTime": that.data.openTime,
        "address": that.data.address,
        "acreage": that.data.size
      },
      'POST').then(res => {
        console.log(res.data);
        // success
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
      });
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