// pages/Start/start.js
var app = getApp();
var fileData = require('../../utils/data.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.userInfo)
    wx.getSetting({
      success: res => {
        // 先判断用户是否授权获取用户信息
        if (res.authSetting['scope.userInfo']) {
         this.setData({
           userInfo: res.authSetting
         })
          //console.log(this.data.userInfo);
          this.goToShop();
        }
      }
    })
  },

  // goToLogin: function(e){
  //   wx.navigateTo({
  //     url: '../PersonalHome/LoginMain',
  //   })
  // },

  goToShop: function(e){
    wx.switchTab({
      url: '../Shop/ShopList/new',
    })
  },

  onGotUserInfo: function(){
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
        // 先判断用户是否授权获取用户信息，如未授权，则会弹出授权框
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
             // console.log("获取用户信息：")
             // console.log(res)
              this.setData({
                userInfo: res.userInfo
              });
              app.globalData.userType = 2;
              app.globalData.userInfo = res.userInfo;

              wx.login({
                success: function (res0) {
                  console.log('wx.login');
               //   console.log(res0);
                  if (res0.code) {
                    var bizContent = {
                      "encryptedData": res.encryptedData,
                      "iv": res.iv,
                       "code": res0.code
                    }
                   // console.log(bizContent)
                     //顾客注册获取id
                    wx.request({
                      url: api.CustomerRegister,
                      data:{
                        bizContent
                      },
                      method: 'POST',
                      success: function (res2) {
                         // console.log("注册结果：");
                         // console.log(res2)
                        if (res2.data.bizContent.customerId){
                          app.globalData.customerId = res2.data.bizContent.customerId;
                          wx.setStorageSync('customerId', app.globalData.customerId)
                        }
                       
                      }
                    })
                  }
                }
              });

              wx.switchTab({
                url: '../Shop/ShopList/new',
              })
            }
          })
        }
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