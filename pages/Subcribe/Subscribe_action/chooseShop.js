// pages/myCustomers/chooseShop.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
var wxpay = require('../../../utils/wxpay.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    currentTab:0,
    checked:false,
    postion:'',
    clickRadio:'',
    noLimitTime:'',
    adjustTime:0,
    noLimitStore:'',
    adjustStore:0,
    storeId:'',
    barberId:'',
    clickserver:'',
    allMoney:'',
    chooseStore:'',
    // shopList: [{ name: "店一", address: "北京", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.345, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }]
    shopList:""
  },
  choiceTime:function(e){
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id,
        postion:id
      })
    
    }
    console.log(this.data.postion);
    page.setData({ flag: id });
  },
  returnToServer:function(){
    wx.navigateTo({
      url: 'ServerItem',
    })
  },
  radioChange:function(e){
    var that=this;
    that.setData({
      noLimitTime: e.detail.value
    })
    console.log("chooseShop:" + that.data.noLimitTime + ",t:" + that.data.checked);
  },
  radioChange2: function (e) {
   var that=this;
   if(that.data.checked==false){
    that.setData({
      adjustTime: e.detail.value,
         checked:true
      })
    console.log("chooseShop:" + that.data.adjustTime+",t:"+that.data.checked);
   }else{
     that.setData({
       checked: false,
        adjustTime:0
     })
     console.log("chooseShop:" + that.data.adjustTime + ",f:" + that.data.checked);
   }
  },
  radioChange3: function (e) {
    var that = this;
    that.setData({
      noLimitStore: e.detail.value
    })
    console.log("chooseShop:" + that.data.noLimitStore);
  },
  radioChange4: function (e) {
    var that = this;
    if (that.data.checked == false) {
      that.setData({
        adjustStore: e.detail.value,
        checked: true
      })
      console.log("chooseShop:" + that.data.adjustStore + ",t:" + that.data.checked);
    } else {
      that.setData({
        checked: false,
        adjustStore: 0
      })
      console.log("chooseShop:" + that.data.adjustStore + ",f:" + that.data.checked);
    }
  },

  toServerInfo:function(){
  
    wx.navigateTo({
      url: 'FinishInfo?barberId=' + this.data.barberId + "&clickServer=" + this.data.clickServer + "&noLimitTime=" + this.data.noLimitTime + "&adjustTime=" + this.data.adjustTime + "&noLimitStore=" + this.data.noLimitStore + "&adjustStore=" + this.data.adjustStore + "&postion=" + this.data.postion + "&storeId=" + this.data.storeId+"&allMoney="+this.data.allMoney
    })
  },

  chooseStore:function(e){
    var that = this;
      that.setData({
        storeId: e.detail.value,
        checked: true,
      
      })
   console.log("chooseStore:"+that.data.storeId)
  },
  wxPay:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      barberId: options.barberId,
      clickServer:options.clickServer,
      allMoney:options.allMoney
    })
    this.getStoreList();

  },
  getStoreList: function () {
    console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      'start': "1",
      'limit': "3",
      // 'category': "1",
      // 'orderType': "1"
    }
    // util.weshowRequest(api.StoreList, bizContent ,'POST');
    // console.log("调用weshow");
    util.weshowRequest(
      api.StoreList,
      bizContent,
      'POST').then(res => {
        //if (res.data) {}
        console.log("shopList+res");
        console.log(res);
        // success
        that.setData({shopList: res.data.bizContent.list});
        console.log(that.data);
        // that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('shopList  err' + err);
        // fail
        // that.stopRefreshing();
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });
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