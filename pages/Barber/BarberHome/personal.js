

var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({
  data: {
    barberDetails: {},
  },

	onLoad: function () {
		var that = this;
    this.getBarberInfo();

	},
  getBarberInfo: function() {
    console.log('getBarberInfo ' + api.BarberList);
    //wx.showNavigationBarLoading();

    util.weshowRequest(
      api.BarberList,
      {
        'size': 10,
        //'barberid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('BarberList ');
        console.log(res.data);
        // success
        that.setData({ barberDetails: res.data });
        // console.log(that.data);
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        //that.setData({ barberDetails: (wx.getStorageSync('barberDetails') || []) });
      });
  }
}) 