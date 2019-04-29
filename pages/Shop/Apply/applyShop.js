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
    openTime: '周一到周日09：00—21：00',
    size: null,
    sizeDisplay: null,
    status: null,
    photoBase64 : null
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
       // console.log(that.data.photo);
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
          //  console.log('data:image/png;base64,' + res.data)
            that.setData({
              photoBase64: 'data:image/png;base64,' + res.data
            })
          }
        });
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

  getValue: function (e) {
   // console.log(e);
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
   // console.log(this.data)
  },

  applySubmit: function () {
    console.log('OpenStoreAdd ' + api.OpenStoreAdd);
    wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "customerId": app.globalData.customerId,
      "name": that.data.name,
      "mobile": "1111111111",
      "category": 1,
      "seatNum": 6,
      "businessTime": that.data.openTime,
      "address": that.data.address,
      "acreage": that.data.size,
      "storeImgFile": that.data.photoBase64
    }
    if (that.data.photoBase64 != null && that.data.name != null && that.data.size != null && that.data.address != null && that.data.openTime != null){
        util.weshowRequest(
          api.OpenStoreAdd,
          bizContent,
          'POST').then(res => {
            // success
            console.log(res.data)
          getCurrentPages()[getCurrentPages().length - 2].onLoad();
          wx.navigateBack({
          })
          }).catch((err) => {
            console.log('OpenStoreAdd err:');
            console.log(err);
            // fail
            // that.stopRefreshing();
          });
       }else if(that.data.photoBase64 == null){
          wx.showModal({
              title: '提示',
              content: '未添加图片，请重试！',
            })
       }else{
          wx.showModal({
            title: '提示',
            content: '店铺信息填写不完整，请重试！',
          })
       }
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