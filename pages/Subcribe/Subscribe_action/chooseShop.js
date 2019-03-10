// pages/myCustomers/chooseShop.js
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
    flag:0,
    currentTab:'0',
    checked:false,
    postion:[],
    clickRadio:'',
    noLimitTime:'',
    adjustTime:0,
    noLimitStore:'',
    adjustStore:0,
    storeId:'',
    barberId:'',
    clickserver:'',
    allMoney:'',
    chooseStore:'',
    postion2:'',
    barberName:'',
    re:false,
    shopAddress:'',
    // shopList: [{ name: "店一", address: "北京", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.345, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }, { name: "店二", address: "上海", ImgSrc: "asdfsdfasf", distance: [12.34, 32.45] }]
    shopList:""
  },
  getPostion: function () {
    // console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "barberId": "1"
    }
    util.weshowRequest(
      api.BarberSubscribeManage,
      {
        barberId: "1"
      },
      'POST').then(res => {
        console.log('barberList:: ' + res);
        that.setData({
          postion: res.data.bizContent.postions
        });

        console.log("this.data" + this.data.postion);
        // console.log(that.data);
        util.stopRefreshing;
        util.waitUpdate;
      }).catch((err) => {
        console.log('customerFaceInfo err :' + err);
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
  choiceTime:function(e){
    var page = this;
    var pos = page.data.postion;
    var id = e.target.id;
    page.setData({
      currentTab: id,
      postion2: id
    })
    if (page.data.currentTab == id) {
      for(var i=0;i<pos.length;i++){
        if(id==pos[i]){
     
        }
      }
      console.log("重复");
      // if (page.data.re == false) {
      //   page.setData({
      //     flag1: 11,
      //     re: true
      //   })
      // } else {
      //   page.setData({
      //     flag1: 1,
      //     re: false
      //   })
      // }
      // return false;
    } 
    else {
      for(var i=0;i<pos.length;i++){
          if(parseInt(id)==pos[i]){
            switch (id) {
              case '1':
                page.setData({
                  flag1: 1,
                });
                break;
              case '2':
                page.setData({
                  flag2: 2,
                })
                break;
              case '3':
                page.setData({
                  flag3: 3,
               
                })
                break;
              case '4':
                page.setData({
                  flag4: 4,
                })
                break;
              case '5':
                page.setData({
                  flag5: 5,
                })
                break;
              case '6':
                page.setData({
                  flag6: 6,
                })
                break;
              case '7':
                page.setData({
                  flag7: 7,
                })
                break;
              case '8':
                page.setData({
                  flag8: 8,
                })
                break;
              case '9':
                page.setData({
                  flag9: 9,
                })
                break;
            }
        
          }
      }
   
    }
  
    console.log("postion2="+page.data.postion2);
    // page.setData({ flag: id });
  },
  returnToServer:function(){
    wx.navigateTo({
      url: 'ServerItem',
    })
  },
  radioChange:function(e){
    var that=this;
    that.setData({
      noLimitTime: e.detail.value
    })
    console.log("chooseShop:" + that.data.noLimitTime + ",t:" + that.data.checked);
  },
  radioChange2: function (e) {
   var that=this;
   if(that.data.checked==false){
    that.setData({
      adjustTime: e.detail.value,
         checked:true
      })
    console.log("chooseShop:" + that.data.adjustTime+",t:"+that.data.checked);
   }else{
     that.setData({
       checked: false,
        adjustTime:0
     })
     console.log("chooseShop:" + that.data.adjustTime + ",f:" + that.data.checked);
   }
  },
  radioChange3: function (e) {
    var that = this;
    that.setData({
      noLimitStore: e.detail.value
    })
    console.log("chooseShop:" + that.data.noLimitStore);
  },
  radioChange4: function (e) {
    var that = this;
    if (that.data.checked == false) {
      that.setData({
        adjustStore: e.detail.value,
        checked: true
      })
      console.log("chooseShop:" + that.data.adjustStore + ",t:" + that.data.checked);
    } else {
      that.setData({
        checked: false,
        adjustStore: 0
      })
      console.log("chooseShop:" + that.data.adjustStore + ",f:" + that.data.checked);
    }
  },

  toServerInfo:function(){
  
    wx.navigateTo({
      url: 'FinishInfo?barberId=' + this.data.barberId + "&clickServer=" + this.data.clickServer + "&noLimitTime=" + this.data.noLimitTime + "&adjustTime=" + this.data.adjustTime + "&noLimitStore=" + this.data.noLimitStore + "&adjustStore=" + this.data.adjustStore + "&postion=" + this.data.postion2 + "&storeId=" + this.data.storeId + "&allMoney=" + this.data.allMoney + "&barberName=" + this.data.barberName + "&storeAddress=" + this.data.shopAddress
    })
  },

  chooseStore:function(e){
    var that = this;
      that.setData({
        storeId: e.detail.value,
        checked: true,
      
      })
      var storeIdbyInt=parseInt(that.data.storeId)
      var shopAddress = this.data.shopList[storeIdbyInt].address;
      console.log("shopaddress" + shopAddress);
      that.setData({
        shopAddress: shopAddress
      })
   console.log("chooseStore:"+that.data.storeId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostion();
    this.setData({
      barberId: options.barberId,
      clickServer:options.clickServer,
      allMoney:options.allMoney,
      barberName:options.barberName
    })
    // this.barberSubscribeManage();
    this.getStoreList();
    var that=this;
    var pos = that.data.postion;
    for(var i=0;i<that.data.postion.length;i++){
      console.log("加载位置："+pos[i]);
      switch (pos[i]) {
        case 1:
        that.setData({
          flag1 :11
        })
          break;
        case 2:
          that.setData({
            flag2: 22
          })
          break;
        case 3:
          that.setData({
            flag3:33
          })
          break;
        case 4:
          that.setData({
            flag4:  44
          })
          break;
        case 5:
          that.setData({
            flag5:  55
          })
          break;
        case 6:
          that.setData({
            flag6:  66
          })
          break;
        case 7:
          that.setData({
            flag7:  77
          })
          break;
        case 8:
          that.setData({
            flag8:  88
          })
          break;
        case 9:
          that.setData({
            flag9:  99
          })
          break;
      }
    }

  },
  getStoreList: function () {
    console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      'start': "1",
      'limit': "3",
      // 'category': "1",
      // 'orderType': "1"
    }
    // util.weshowRequest(api.StoreList, bizContent ,'POST');
    // console.log("调用weshow");
    util.weshowRequest(
      api.StoreList,
      bizContent,
      'POST').then(res => {
        //if (res.data) {}
        console.log("shopList+res");
        console.log(res);
        // success
        that.setData({
          shopList: res.data.bizContent.list
          });
        console.log("this shop:"+this.data.shopList);
       
       
        // that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('shopList  err' + err);
        // fail
        // that.stopRefreshing();
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });
  },

  // barberSubscribeManage: function () {
  //   var that = this;
  //   var bizContent = {
  //     "barberId": that.data.barberId
  //   }
  //   util.weshowRequest(
  //     api.BarberSubscribeManage,
  //     bizContent,
  //     'POST').then(res => {
  //       console.log("shopList+res");
  //       console.log(res);
  //       that.setData({ postion: res.data.bizContent.list });
  //       console.log(that.data);
  //     }).catch((err) => {
  //       console.log('shopList  err' + err);
  //     });
  // },
  
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