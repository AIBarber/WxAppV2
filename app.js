//app.js
var api = require('./config/api.js');

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('App onLaunch')
    this.updateShareInfo(options);

    // this.wxLogin();
    this.getUserInfoIfAuthed();
    this.globalData.customerId = wx.getStorageSync('customerId')
    this.globalData.barberId = wx.getStorageSync('barberId')
    console.log(this.globalData.customerId)
   },

  //设置tabbar
  /*editTabBar: function () {
    var tabbar = this.globalData.tabbar,
      currentPages = getCurrentPages(),
      that = currentPages[currentPages.length - 1],
      pagePath = that.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    that.setData({
      tabbar: tabbar
    });
  },*/


  updateShareInfo: function (options) {
    console.log('updateShareInfo');
    console.log(options);
    if (options != null && options.query != null && options.query.openid != null) {
      console.log(options.query.openid);
      this.globalData.inviter_id = options.query.openid;
      console.log(this.globalData.userid);
      if (this.globalData.userid != null && this.globalData.userid != '') {
        this.webAddInviterInfo();
      }
    }
  },

  webAddInviterInfo: function () {
    var that = this;
    if (this.globalData.inviter_id != null && this.globalData.inviter_id != '') {
      wx.request({
        url: api.UserShare,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'X-WxApp-ID': that.globalData.appid,
          'X-WxOpenid': that.globalData.userid,
          //'X-Weshow-Token': wx.getStorageSync('token')
          'X-Weshow-Token': that.globalData.userid
        },
        data: {
          'userid': that.globalData.userid,
          'inviter_id': that.globalData.inviter_id,
          'inviter_code': that.globalData.shareInviterCode,
          'add_time': Math.floor((new Date()).getTime() / 1000)
        },
        success: function (res) {
          console.log('app updateShareInfo success');
          console.log(res);
        },
        fail: function (err) {
        }
      });
    }
  },

  wxLogin: function () {
    var that = this;
    wx.login({
      success: function (res0) {
        console.log('wx.login');
        console.log(res0);
        if (res0.code) {
          //登录远程服务器
          // wx.request({
          //   url: api.GetWxSession,
          //   data: {
          //     "bizContent": { 'code': res0.code },
          //     'code': res0.code,
          //     'appid': that.globalData.appid
          //   },
          //   method: 'POST',
          //   header: {
          //     'Content-Type': 'application/json',
          //     'X-WxApp-ID': that.globalData.appid,
          //     'X-WxOpenid': res0.code,
          //     //'X-Weshow-Token': wx.getStorageSync('token')
          //     'X-Weshow-Token': res0.code
          //   },
          //   success: function (res1) {
          //     console.log('wx.request ' + api.GetWxSession);
          //     console.log(res1);
          //     that.globalData.userid = res1.data.bizContent.openid;
          //     that.globalData.sessionKey = res1.data.bizContent.sessionKey;
          //    // console.log(that.globalData.userid);
          //     wx.setStorageSync('userid', res1.data.bizContent.openid);
          //     wx.setStorageSync('session_key', res1.data.bizContent.sessionKey);
               that.getUserInfoIfAuthed();
          //     that.webAddInviterInfo();
          //     //that.addUserInfo();//will be null
          //     /*wx.getUserInfo({
          //       withCredentials: true,
          //       success: function (res2) {
          //         that.globalData.userInfo = res2.userInfo;
          //         //var nickCode = encodeURIComponent(res2.userInfo.nickName);
          //         //that.globalData.userInfo.nickName = nickCode;
          //         that.globalData.hasUserInfo = true;
          //         wx.setStorageSync('userInfo', res2.userInfo);

          //         //that.addUserInfo();

          //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //         // 所以此处加入 callback 以防止这种情况
          //         if (that.userInfoReadyCallback) {
          //           that.userInfoReadyCallback(res2.userInfo)
          //         }
          //       },
          //       fail: function (err) {
          //         console.log('log in err');
          //         console.log(err);
          //         if (that.userInfoReadyCallback) {
          //           that.userInfoReadyCallback(null)
          //         }
          //       }
          //     });*/
          //   }
          // });
         }
       }
    });
  },

  getUserInfoIfAuthed: function () {
    var that = this;
    // 获取用户信息  
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框  
          wx.getUserInfo({
            success: res1 => {
             // console.log("用户信息:");
              //console.log(res1)
             that.globalData.userInfo = res1.userInfo;
             that.globalData.userType = 2;
              wx.setStorageSync('userInfo', res1.userInfo)
              wx.setStorageSync('userType', 2)
            }
          })
        }
      }
    });    
  },

  addUserInfo: function () {
    console.log('app addUserInfo');
    console.log(this.globalData.userid);
    console.log(this.globalData.shareOpenid);
    var that = this;
    //var name = this.globalData.userInfo.nickName;
    // 过滤emoji
    //name = name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "*");
    //console.log('app addUserInfo name:' + name);
    wx.request({
      url: api.UserAdd,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'X-WxApp-ID': that.globalData.appid,
        'X-WxOpenid': that.globalData.userid,
        //'X-Weshow-Token': wx.getStorageSync('token')
        'X-Weshow-Token': that.globalData.userid
      },
      data: {
        'userid': that.globalData.userid,
        //'country': that.globalData.userInfo.country,
        //'province': that.globalData.userInfo.province,
        //'city': that.globalData.userInfo.city,
        //'gender': that.globalData.userInfo.gender,
        //'language': that.globalData.userInfo.language,
        //'avatarUrl': that.globalData.userInfo.avatarUrl,
        //'name': name,
        'inviter_id': that.globalData.shareOpenid,
        'inviter_code': that.globalData.shareInviterCode,
        'add_time': Math.floor((new Date()).getTime() / 1000)
      },
      success: function (res) {
        console.log('app addUserInfo success');
        console.log(res);
        //console.log(res.data.data.isNew);
        //if (res.data.data.isNew) {
        //that.globalData.accountInfo = res.data.data.data;
        //}
        //if (res.data.data.data.faceid != '') {
        //  that.globalData.faceid = res.data.data.data.faceid;
        //}
        //if (res.data.data.data.type != '') {
        //  that.globalData.userType = res.data.data.data.type;
        //}
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },

  // getUserInfoEvent: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  getLocation: function(){
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
      }
    });
  },
  // 全局变量
  globalData: {
    userInfo: null,
    userType: null,
    hasUserInfo: false,
    accountInfo: '',
    inviter_id: null,
    shareOpenid: '0',
    shareInviterCode: '0',
    selectedBarberId: '',
    userid: 'ozANd5R2-s45Fio7CCiZa7Lvj4v8',
    customerId: null,
    faceid: null,
    userLevel: 0,
    sessionKey: '',
    appid: 'wxe17d544601c53b2a',
    latitude: 39.93,
    longitude: 116.45,
    ShareTitle: 'ShareTitle',
    barberId: null 
  }
})