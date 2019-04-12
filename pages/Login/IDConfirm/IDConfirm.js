// pages/IDConfirm/IDConfirm.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    srcFace: "", //人像
    srcFaceBase64: "", //人像
    srcID: "", //身份证
    srcIDBase64: "", //身份证
    phone: "", //手机号
    codeInputDisable: false, //是否可以输入验证码
    sendCodeBtnText: "发送验证码",
    code: "",
    idNum:"",
    currentTime: 60
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  getFaceImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {
        that.setData({
          srcFace: res.tempFilePaths
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            that.setData({
              srcFaceBase64: 'data:image/png;base64,' + res.data
            })
          }
        });
        
      }
    })
  },

  getIdImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        that.setData({
          srcID: res.tempFilePaths
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            that.setData({
              srcIDBase64: res.data
            })
          }
        });

      }
    })
  },
  getPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getIdNumValue: function (e) {
    this.setData({
      idNum: e.detail.value
    })
  },
  gainAuthCodeAction: function() {
    let that = this;

    /*第一步：验证手机号码*/
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; // 判断手机号码的正则
    if (that.data.phone.length == 0) {
      util.showErrorToast('手机号码不能为空')
      return;
    } else if (that.data.phone.length < 11) {
      util.showErrorToast('手机号码长度有误！')
      return;
    } else if (!myreg.test(that.data.phone)) {
      util.showErrorToast('无效的手机号码！')
      return;
    }
    /*第二步：设置计时器*/
    // 先禁止获取验证码按钮的点击
    that.setData({
      codeInputDisable: true,
    })
    // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    var interval = setInterval(function() {
      currentTime--;
      that.setData({
        sendCodeBtnText: currentTime + '秒后重新获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          sendCodeBtnText: '获取验证码',
          currentTime: 60,
          codeInputDisable: false
        })
      }
    }, 1000);
    /*第三步：请求验证码接口，并记录服务器返回的验证码用于判断*/

    util.weshowRequest(
      api.Sendsms, {
        'mobile': that.data.phone
      },
      'POST').then(res => {
      //success
      wx.showToast({
        title: "发送成功",
      });
    }).catch((err) => {});
  },
  submit: function() {

    var that = this;
    var formData = {
      "customerId": 1,
      "mobile": that.data.phone,
      "code": that.data.code,
      "idCard": that.data.idNum,
      "faceImageFile": that.data.srcFaceBase64,
      "faceIdCardImageFile": that.data.srcIDBase64,
      "backIdCardImageFile": that.data.srcIDBase64
    };

    util.weshowRequest(
      api.BarberRegister, formData,
      'POST').then(res => {
        // success
        wx.showToast({
          title: res.data.msg,
        });
      }).catch((err) => {
        console.log('barberInfo err :' + err);
      });
  }
})