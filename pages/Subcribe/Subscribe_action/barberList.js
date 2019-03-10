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
  barberList:[],
    // barberList: [{barberId:"123123", name: "张三", level: "高级理发师", years: 2, mobile: 123123123123, status: 2}]
  barberName:''
     
  },
  toServerItem:function(){
    var that=this;
     wx.navigateTo({
       url: 'ServerItem?barberId='+this.data.barberId+'&barberName='+that.data.barberName
     })
  },
  getBarberInfo: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "barberId": "1"
    }
    util.weshowRequest(
      api.Getbarberinfo,
      bizContent,
      'POST').then(res => {
          var a=JSON.stringify(res.data);
          // var a=JSON.parse(res.data);
        console.log('barberList:: '+a);
        var barberinfo = JSON.stringify(res.data.bizContent.barberinfo);
        console.log("this.data" + that.data.barberList.name);
        that.setData({
          barberList: res.data.bizContent.barberinfo,
         
        });
        that.setData({
          barberName: that.data.barberList.name
        })
     
        
        // console.log(that.data);
        util.stopRefreshing;
        util.waitUpdate;
      }).catch((err) => {
        console.log('barberlist err :' + err);
        // fail
        util.stopRefreshing;
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getBarberInfo();
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