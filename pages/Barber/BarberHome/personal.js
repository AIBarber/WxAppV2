

var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

// Page({
//   data: {
//     barberDetails: [],
//     personsItems: fileData.getpersonsData(),
//     curIndex: 0,
//     winWidth: 0,
//     winHeight: 0,
//     barberInfo:''
        // chooseTime:0;
//   },

// function onLoad() {
//     var that = this;
//     that.setData({
//       person: that.data.personsItems
//     });
//     // this.getBarberInfo();
//     wx.getSystemInfo({

//       success: function (res) {
//         that.setData({
//           winWidth: res.windowWidth,
//           winHeight: res.windowHeight
//         });
//       }

//     });

//   };
function showTime(object){
  console.log("进入 sho'w'Time")
  var that=object;
  if(that.data.chooseTime==0){
      that.setData({
        chooseTime:1
      })
  }else if (that.data.chooseTime == 1){
       that.setData({
         chooseTime:0
       })
    }

}
function toCustomer(object){
 
  var that=object;
  that.setData({
    userType:2
  })

  getCurrentPages()[getCurrentPages().length - 1].onLoad()
}
function tapFranchiseeLocation(event) {
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
  };

function getBarberInfo(object) {
  var that = object;
  util.weshowRequest(
    api.Getbarberinfo,
    {
      "barberId": "1"
    },
    'POST').then(res => {
      //if (res.data) {}
      console.log('barberInfo:: ');

      // success
      that.setData({
        barberInfo: res.data.bizContent.barberinfo
      });
      console.log("this.data.barberInfo:" + JSON.stringify(that.data.barberInfo));
      // console.log(that.data);

      util.stopRefreshing;
      util.waitUpdate;
    }).catch((err) => {
      console.log('barberInfo err :' + err);
      // fail
      util.stopRefreshing;
      // wx.showToast({
      //   title: '正在获取数据…',
      //   icon: 'loading',
      //   duration: 3000,
      //   mask: true
      // });
    });
};
// }) 
module.exports = {
  getBarberInfo,
  showTime,
  toCustomer
}