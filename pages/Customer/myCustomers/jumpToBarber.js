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
    telNumber:'',
    verificationCode:'',
    idCardFront:"",
    idCardBehind: "",
    headPhotoBgC: "",
    hidAndSho1:null,
    hidAndSho2: "display:none",
    hidAndSho3: "display:none",
    returnVar:1,
    changeBarber:'',
    color:'background-color:'
  },
 
  formSubmit:function(e){
    var that=this;
   wx.navigateTo({
     url: 'toBarberSuccess',
   })
    that.setData({
      telNumber: e.detail.value.telNumber,
      verificationCode:e.detail.value.verificationCode
    });
    var photoPaths=[this.data.headPhotoBgC, this.data.idCardFront, this.data.idCardBehind];
    var that = this;
    var commonParams = {
      "openId": app.globalData.userid,
      // "timestamp": getCurrentSecond(),
      "timestamp": "2019-03-2",
      "appid": app.globalData.appid,
      "nonce": "123",
      "algorithm": "1",
      "token": "12313",
      "version": "2.0"
    };
    var bizContent = {
      'customerId': 1,
      'telNumber':that.data.telNumber,
      'verificationCode':that.data.verificationCode
    }
    var bizContentName = { "bizContent": bizContent };
    var body = util.mergeJson(commonParams, bizContentName);
    // var tempFilePaths = res.tempFilePaths
    for (var i = 0; i < photoPaths.length; i++) {
                          wx.uploadFile({
                            url: api.GetFaceInfo,
                            header: {
                              "Content-Type": "multipart/form-data"
                            },
                            filePath: photoPaths[i],
                            name: 'faceImgFile',
                            formData: { body: JSON.stringify(body) },
                                success: function (res) {
                                      var data = JSON.parse(res.data);
                                      console.log("图片：" + data.data);
                                      return typeof cb == "function" && cb(data, rootDocment)
                                },
                            fail: (res) => {
                               console.log("UploadFile,fail...");
                            },
                          });
                    }
  
    // wx.uploadFile({
    //   url: api.GetFaceInfo,
    //   header: {
    //     "Content-Type": "multipart/form-data"
    //   },
    //   filePath: photoPaths[i],
    //   name: 'faceImgFile',//这里根据自己的实际情况改
    //   formData: { body: JSON.stringify(body) },//这里是上传图片时一起上传的数据
    //   success: (resp) => {
    //     success++;
    //     console.log(resp)
    //     console.log(i);
    //   },
    //   fail: (res) => {
    //     fail++;//图片上传失败，图片上传失败的变量+1
    //   },
    //   complete: () => {
    //     i++;//这个图片执行完上传后，开始上传下一张
    //     console.log("complete:进行"+i+"次--成功："+success+"次,失败"+fail+"次");
    //     if (success==photoPaths.length) {     
    //       console.log('执行完毕');
    //       console.log('成功：' + success + " 失败：" + fail);
    //     } else {
    //       console.log('进行几次' + i + "次");
    //       this.formSubmit();
    //     }
    //   }
    // });
  
  },


  
  takeByPhoto: function () {
    console.log("进入takeByPhoto")
    var that = this;
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=changeBarber',
    
    })
  },
  takeByPhoto2: function () {
    var that = this;
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=idCardFront',

    })
  },
  takeByPhoto3: function () {
    var that = this;
    wx.navigateTo({
      url: '../camaraIdentity/camaraIdentity?photoName=idCardBehind',

    })
  },
  takeByAlbum:function(){
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        that.setData({
          headPhotoBgC: res.tempFilePaths
        })
      },
    })

    console.log(myHairSrc);
  
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
   this.setData({
      hidAndSho2: "display:none",
      hidAndSho1: "display:none",
      hidAndSho3: "",
     returnVar: 3,
     color3: "background-color:#0cc4b1;border-color:#0cc4b1"
    })
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