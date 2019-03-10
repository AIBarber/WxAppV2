

var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({
  data: {
    barberDetails: [],
    personsItems: fileData.getpersonsData(),
    curIndex: 0,
    winWidth: 0,
    winHeight: 0
  },

	onLoad: function () {
		var that = this;
    that.setData({
      person: that.data.personsItems
    });
    this.getBarberInfo();
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

	},

  tapFranchiseeLocation: function (event) {
    var _this = this,
      compid = event.currentTarget.dataset.compid,
      pageInstance = this.getCurrentPage();

    function success(res) {
      var name = res.name,
        lat = res.latitude,
        lng = res.longitude,
        newdata = {},
        param, requestData;

      newdata[compid + '.location_address'] = name;
      pageInstance.setData(newdata);

      for (var index in pageInstance.franchiseeComps) {
        if (pageInstance.franchiseeComps[index].param.id = compid) {
          param = pageInstance.franchiseeComps[index].param;
          param.latitude = lat;
          param.longitude = lng;
        }
      }
      requestData = {
        id: compid,
        form: 'app_shop',
        page: 1,
        sort_key: param.sort_key,
        sort_direction: param.sort_direction,
        latitude: param.latitude,
        longitude: param.longitude,
        idx_arr: param.idx_arr
      }
      _this.refreshFranchiseeList(compid, requestData, pageInstance);
    }

    function cancel() {
      console.log('cancel');
    }

    function fail() {
      console.log('fail');
    }
    this.chooseLocation({
      success: success,
      fail: fail,
      cancel: cancel
    });
  },
  
  getBarberInfo: function() {
    console.log('getBarberInfo ' + api.BarberList);
    //wx.showNavigationBarLoading();

    var that = this;
    util.weshowRequest(
      api.BarberList,
      {
        "longitude": "143.45",
        "latitude": "123.32",
        "orderType": "1",
        "type": "1",
        'size': 10,
        //'barberid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('BarberList ');
        console.log(res.data);
        // success
        that.setData({ barberDetails: res.data.bizContent.list});
        console.log('BarberList ');
        console.log(barberDetails);
        console.log('BarberList ');
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