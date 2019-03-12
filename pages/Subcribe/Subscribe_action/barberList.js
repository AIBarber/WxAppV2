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
  barberName:'',
  barberId:''
  },
  toServerItem:function(e){
    var that = this;
  
    var index=e.target.id;
    console.log("barberId:::" + that.data.barberList[index-1].barberId);
    that.setData({
      barberId: that.data.barberList[index - 1].barberId
    })
    //从这里调用了 获得barberInfo的方法
    that.getBarberInfo();
   
  
  },
   //barberName从这个方法里获取不到。。。？？？？？？？？？？？？？
  toServer:function(){
    var that=this;
    console.log("点击预约后-barberName:--" + that.data.barberName + "barberId:--" + that.data.barberId);
    wx.navigateTo({
      url: 'ServerItem?barberId=' + that.data.barberId + '&barberName=' + that.data.barberName
    })
  },
  getBarberList: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
    }
    util.weshowRequest(
      api.BarberList,
      bizContent,
      'POST').then(res => {
          var a=JSON.stringify(res.data);
          // var a=JSON.parse(res.data);
       
        var barberinfo = JSON.stringify(res.data.bizContent.list);
        // console.log('barberList:: ' + barberinfo);
        that.setData({
          barberList: res.data.bizContent.list,
        });
        // console.log("barberlist::" + that.data.barberList);
        // console.log(this.data.barberList[0].name);
        // that.setData({
        //   barberName: this.data.barberList[0].name
        // })
        // console.log("request-barberName:"+this.data.barberName);
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
  getBarberInfo: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "barberId": that.data.barberId
    }
    console.log(bizContent);
    util.weshowRequest(
      api.Getbarberinfo,
      bizContent,
      'POST').then(res => {

        that.setData({
          barberName: res.data.bizContent.barberinfo.name
        })
      
        console.log("request-barberName:"+this.data.barberName);
        this.toServer();
        // util.stopRefreshing;
        // util.waitUpdate;
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

    this.getBarberList();
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