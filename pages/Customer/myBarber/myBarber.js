// pages/myBarber/myBarber.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBarberList:[{id:1},{id:2}]
  },
  getSelectedBarber: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      
    }
    util.weshowRequest(
      api.GetorderInsert,
      bizContent,
      'POST').then(res => {
        var a = JSON.stringify(res.data);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },
})