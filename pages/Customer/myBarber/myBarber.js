// pages/myBarber/myBarber.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBarberList:null
  },
  getSelectedBarber: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "customerId": "1"
    }
    util.weshowRequest(
      api.GetMybarberList,
      bizContent,
      'POST').then(res => {
        var a = JSON.stringify(res.data);
        console.log(res.data);
        var barberinfo = res.data.bizContent.list;
        for(var i=0;i<barberinfo.length;i++){
          var listIndex="myBarberList["+i+"]";
        that.setData({
          [listIndex]: res.data.bizContent.list[i],
        });
        }
         console.log("barberList:::"+JSON.stringify(that.data.barberList));
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
    this.getSelectedBarber();
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },
})