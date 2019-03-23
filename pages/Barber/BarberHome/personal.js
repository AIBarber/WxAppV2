var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({
  data: {
    barberInfo: ""
  },
  onLoad: function() {
    var that = this;
    util.weshowRequest(
      api.GetbarberHome, {
        "barberId": app.globalData.userid
      },
      'POST').then(res => {
        console.log('barberInfo:: ');
        // success
        that.setData({
          barberInfo: res.data.bizContent.barberinfo
        });
      }).catch((err) => {
        console.log('barberInfo err :' + err);
      });

  }
})