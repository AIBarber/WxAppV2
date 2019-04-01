var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({
  // data: {
    
  // }
})
function getBarberInfo(that) {
    util.weshowRequest(
      api.GetbarberHome, {
        "barberId": app.globalData.barberId
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

  };

function showTime(object) {
  console.log("进入 sho'w'Time")
  var that = object;
  if (that.data.chooseTime == 0) {
    that.setData({
      chooseTime: 1
    })
  } else if (that.data.chooseTime == 1) {
    that.setData({
      chooseTime: 0
    })
  }

};

module.exports = {
  getBarberInfo,
  showTime
}
