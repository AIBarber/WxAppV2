// pages/myReservation/jumpToBarber.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
var i=0;
var success=0;
var fail=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telNumber:'',           //手机号码
    verificationCode:'',    //验证码
    idCardFront:"",         //身份证正面
    idCardBehind: "",       //身份证背面
    idCard: "",             //身份证号码
    headPhotoBgC: "",       //头像
    hidAndSho1:null,
    hidAndSho2: "display:none",
    hidAndSho3: "display:none",
    returnVar:1,
    changeBarber:'',
    color:'background-color:',
    photoPaths: []
  },
 
  formSubmit:function(e){
    var that = this;
    // var commonParams = {
    //   "openId": app.globalData.userid,
    //   "timestamp": util.getCurrentSecond(),
    //   "appid": app.globalData.appid,
    //   "nonce": "123",
    //   "algorithm": "1",
    //   "token": "12313",
    //   "version": "2.0"
    // };
    var bizContent = {
      'customerId': app.globalData.customerId,
      'mobile':that.data.telNumber,
      'code':that.data.verificationCode,
      "idCard": that.data.idCard,
      "faceImageFile": that.data.photoPaths[0],
      "faceIdCardImageFile": that.data.photoPaths[1],
      "backIdCardImageFile": that.data.photoPaths[2]
      // "faceImageFile": that.data.headPhotoBgC,
      // "faceIdCardImageFile": that.data.idCardFront,
      // "backIdCardImageFile": that.data.idCardBehind
    }

    //var bizContentName = { "bizContent": bizContent };
    //var body = util.mergeJson(commonParams, bizContentName);

    console.log(bizContent);
    console.log('BarberRegister: ' + api.BarberRegister)
      util.weshowRequest(
        api.BarberRegister,
        bizContent,
        'POST').then(res => {
          // success
          console.log(res)
          var t = 2;
          if(res.data.bizContent.status == 1){
            t = 1;
            wx.setStorageSync('userType', 1)
            app.globalData.userType = 1;
          }
          wx.navigateTo({
            url: 'toBarberSuccess?userType=' + t,
          })
          
        }).catch((err) => {
          console.log('BarberRegister err' + err);
          // fail
          // that.stopRefreshing();
        });
  },
  
  takeByPhoto: function () {
    console.log("进入takeByPhoto")
    var that = this;
    var name = 'changeBarber'
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=' + name,
    
    })
  },

  takeByPhoto2: function () {
    var that = this;
    var name = 'idCardFront';
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=' + name,

    })
  },

  takeByPhoto3: function () {
    var that = this;
    var name = 'idCardBehind'
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=' + name,
    })
  },

  takeByAlbum:function(){
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
       // console.log(res)
        that.setData({
          headPhotoBgC: res.tempFilePaths[0]
        })

        var basetempImagePath;
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            basetempImagePath = 'data:image/png;base64,' + res.data;
            wx.setStorageSync('changeBarberbase64', basetempImagePath);
          }
        });

        wx.setStorageSync('changeBarber', res.tempFilePaths[0]);
        //console.log(that.data.headPhotoBgC)
      },
    })

   // console.log(myHairSrc);
  
  },

  nextTo2:function(){
  
     this.setData({
           hidAndSho2:"",
           hidAndSho1: "display:none",
           hidAndSho3: "display:none",
           returnVar:2,
            color2: "background-color:#0cc4b1;border-color:#0cc4b1"
         })
  
  },

  nextTo3: function () {
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.idCard))) {
      wx.showToast({
        title: '身份证号码有误',
        duration: 2000,
        icon: 'none'
      });
    }else{
      this.setData({
        hidAndSho2: "display:none",
        hidAndSho1: "display:none",
        hidAndSho3: "",
        returnVar: 3,
        color3: "background-color:#0cc4b1;border-color:#0cc4b1"
      })
    }
  },
 
  returnBtn:function(){
     if(this.data.returnVar==1){
      wx.navigateBack({
        delta: 1
      })}else if(this.data.returnVar==2){
       this.setData({
         hidAndSho2: "display:none",
         hidAndSho1: "",
         hidAndSho3: "display:none",
         returnVar: 1,
         color2: "",
         color3: "",
       })
      }else{
       this.setData({
         hidAndSho2: "",
         hidAndSho1: "display:none",
         hidAndSho3: "display:none",
         returnVar: 2,
         color3: ""
       })
      }
   

  },

  getVerificationCode:function(e){
    this.setData({
      verificationCode: e.detail.value
    })
  },

  getTelNumber:function(e){
    this.setData({
      telNumber: e.detail.value
    })
  },

  getIdCard:function(e){
    this.setData({
      idCard: e.detail.value
    })
  },

  getCode:function(){
    var that = this;
    console.log(that.data.telNumber)
    console.log('Sendsms: ' + api.Sendsms);
    if ((/^1[34578]\d{9}$/.test(that.data.telNumber))) {
      util.weshowRequest(
        api.Sendsms,
        {
          "mobile": that.data.telNumber
        },
        'POST').then(res => {
          // success
          console.log(res)
        }).catch((err) => {
          console.log('Sendsms err' + err);
        });
    }else{
      wx.showToast({
        title: '手机号码有误!',
        duration: 2000,
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.removeStorageSync("changeBarber");
    wx.removeStorageSync("idCardFront");
    wx.removeStorageSync("idCardBehind");
     that.setData({
         color: "background-color:#0cc4b1;border-color:#0cc4b1"
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
    var that = this;
    that.setData({
      headPhotoBgC: wx.getStorageSync("changeBarber"),
      idCardFront: wx.getStorageSync("idCardFront"),
      idCardBehind: wx.getStorageSync("idCardBehind"),
      photoPaths: [wx.getStorageSync("changeBarberbase64"), wx.getStorageSync("idCardFrontbase64"), wx.getStorageSync("idCardBehindbase64")]
    })
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