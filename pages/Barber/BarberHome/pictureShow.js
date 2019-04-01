// pages/Barber/BarberHome/pictureShow.js
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    interval: 5000,
    duration: 1000,
    circular: true,
    leftMargin: '80rpx',
    rightMargin: '80rpx',
    currentIndex: 0
  },
  handleChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  prevImg: function prevImg() {
    var that = this;
    var current = that.data.currentIndex;
    var currentIndexNew = current > 0 ? current - 1 : that.data.imgUrls.length - 1;
    that.setData({
      currentIndex: currentIndexNew
    })
  },

  nextImg: function nextImg() {
    var that = this;
    var current = that.data.current;
    var currentIndexNew = current < that.data.imgUrls.length - 1 ? current + 1 : 0;
    that.setData({
      currentIndex: currentIndexNew
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var imgList = JSON.parse(options.imageList);
    var imageListParser = [];
    for(var i=0;i<imgList.length;i++){
      imageListParser.push(decodeURIComponent(imgList[i]));
    }
    
      var that = this;
      that.setData({
        imgUrls: imageListParser
    });

  },
  loadImages: function () {
    
  }
  ,
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

  },
  jumpToSharePage:function (e) {
    var imageUrl = e.currentTarget.dataset.src
    wx.navigateTo({
      url: '/pages/More/photo_share/share?imageItem=' + encodeURIComponent(imageUrl)
    })
  },
  saveToLocal: function () {
    var that = this;
    var currentIndex = that.data.currentIndex;
    wx.downloadFile({
      url: that.data.imgUrls[currentIndex],
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            //保存成功
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  }
})