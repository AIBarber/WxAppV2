// pages/new/new.js


var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util');
var api = require('../../../config/api.js');

// var app = getApp();
// var fileData = require('../../../utils/data.js');
// var util = require('../../../utils/util.js');
// var api = require('../../../config/api.js');
// var model = require('../../../utils/model.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nav 初始化
    // cas picker
    casArray: ['只看自营店', '只看社区店'],
    casArray1: ['智能排序', '离我最近', '人气最高', '面积最大'],
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    barberDetails: [],
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    orderItems: fileData.getorderData(),
    curNavId: 1,
    curIndex: 0,
    skillData: fileData.getSkilledData(),
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    barberList: [],
    barberName: '',
    barberId: '',
    statusChn: '',
    selectedStyle: "color:grey;background-color:white;",
    normalStyle: "color:white;background-color:#0cc4b1;",
    myLatitude:null,
    myLongitude:null

  },
  toServerItem: function (e) {
    var that = this;

    var index = e.currentTarget.id;
    console.log("toServerItem::barberId:::" + that.data.barberList[index - 1].barberId);
    that.setData({
      barberId: that.data.barberList[index - 1].barberId
    });
    //从这里调用了 获得barberInfo的方法
    this.getBarberInfo();
  },
  toServer: function () {
    var that = this;
    console.log("点击预约后-barberName:--" + that.data.barberName + "barberId:--" + that.data.barberId);
    wx.navigateTo({
      url: '../../Subcribe/Subscribe_action/ServerItem?barberId=' + that.data.barberId + '&barberName=' + that.data.barberName
    })
  },
  getBarberList: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "longitude": "143.45",
      "latitude": "123.32",
      "orderType": "1",
      "type": "1"
    }
    util.weshowRequest(
      api.BarberList,
      bizContent,
      'POST').then(res => {
        var a = JSON.stringify(res.data);
        // var a=JSON.parse(res.data);

        var barberinfo = JSON.stringify(res.data.bizContent.list);
        // console.log('barberList:: ' + barberinfo);
        that.setData({
          barberList: res.data.bizContent.list,

        });
        console.log("barberlist::" + JSON.stringify(that.data.barberList));
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
    console.log("进入getBarberInfo");
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
       
        console.log("request-barberName:" + this.data.barberName);
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

  bindCasPickerChange: function (e) {
    console.log('Category picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      casIndex: e.detail.value
    })
  },
  bookTap: function () {
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

        console.log("request-barberName:" + this.data.barberName);
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
  onLoad: function () {
  
    var that = this
    this.getBarberList();
    that.setData({
      list: that.data.navSectionItems,
      orderlist: that.data.orderItems,
    
    }); 
    var myLatitude = app.globalData.userid ;
    var myLongitude=app.globalData.myLongitude;
   
    console.log(app.globalData.userid + "--" + this.myLongitude);
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  // getBarberList: function () {
  //   // console.log('getStoreList ' + api.StoreList);
  //   //wx.showNavigationBarLoading();
  //   var that = this;
  //   var bizContent = {
  //     "longitude": "143.45",
  //     "latitude": "123.32",
  //     "orderType": "1",
  //     "type": "1"
  //   }
  //   util.weshowRequest(
  //     api.StoreBarberList,
  //     bizContent
  //   ,
  //     'POST').then(res => {
  //       var resJson = JSON.stringify(res);
  //       console.log('resJson:: ' + resJson);
  //       that.setData({
  //         barberList: resJson.bizContent.list
  //       });
  //       console.log("barberList:::::" + that.bizContent.list);
  //       // console.log(that.data);
  //       util.stopRefreshing;
  //       util.waitUpdate;
  //     }).catch((err) => {
  //       console.log(' err :' + err);
  //       // fail
  //       util.stopRefreshing;
  //       // wx.showToast({
  //       //   title: '正在获取数据…',
  //       //   icon: 'loading',
  //       //   duration: 3000,
  //       //   mask: true
  //       // });
  //     });
  // },
  navigate: function (e) {
    wx.navigateTo({
      url: '../order/order?artype=' + e.currentTarget.dataset.arid
    })
  },

  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/technicain_detail?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    if (this.data.skillData.length === 0) return
    var that = this
    // 由于是模拟数据，加载更多时候，数据重复加载
    that.data.skillData = that.data.skillData.concat(that.data.skillData)
    that.setData({
      list: that.data.skillData,
    })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {
   console.log(e);

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.id
      })
    }
    if (this.data.currentTab == 0) {
      this.setData({
        selectedStyle: "color:grey;background-color:white;",
        normalStyle: "color:white;background-color:#0cc4b1;"
      })
    }
    else {
      this.setData({
        normalStyle: "color:grey;background-color:white;",
        selectedStyle: "color:white;background-color:#0cc4b1;"
      })
    }
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

  },
 
}) 