// pages/myCustomers/customers.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemOne:{id:1,name:"洗剪吹",value:"染发",money:19,moneyYuan:50},
    item: [{id:2, name: "染发", value: "染发", money:39, moneyYuan:50},
      {id:3, name: "染发2", value: "染发2", money:39, moneyYuan:50}, 
      {id:4, name: "染发2", value: "染发2", money:39, moneyYuan:50}],
    item2: [{id:5, name: "烫发1", value: "烫发1", money:29, moneyYuan: 50 },
      {id:6, name: "烫发2", value: "烫发2", money: 29, moneyYuan: 50},
      {id:7, name: "染发3", value: "染发3", money: 29, moneyYuan: 50 }],
    // explain:"七折",
    serviceDisplay:"",
    otherDisplay:"",
    ranfa:"display:none",
    tangfa: "display:none",
    clickServer:[],
    clickMoney:null,
    barberId:'',
    allMoney:'',
    money:''
  },
  returnBtn:function(){
    wx.switchTab({
      url: 'barberList',
    })
  },
  returnTobarberList:function(){
    wx.switchTab({
      url: 'barberList',
    })
  },
  calculate:function(){
     var server=this.data.clickServer;
     for(var i=0;i<server.length;i++){
       
       for(var j=0;j<this.data.item.length;j++){
       if(this.data.item[j].id==server[i]){
            this.data.clickMoney+=this.data.item[j].money;
       }
       }
       for (var j = 0; j < this.data.item2.length; j++) {
         if (this.data.item2[j].id == server[i]) {
           this.data.clickMoney += this.data.item2[j].money;
         }
       }
       if (this.data.itemOne.id == server[i]) {
         this.data.clickMoney += this.data.itemOne.money;
       }
     }
  
    console.log("计算:money:"+this.data.clickMoney);
  },
  getServiceList: function () {
    console.log('getServicetList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.GetOrderDetial,
      {
        // 'size': 10,
        // 'customerid': app.globalData.userid
        'start': 10,
        'limit': 10,
        // 'longitude':"",
        // 'latitude':"",
        'category': 1,
        'orderType': 1
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getShopList ');
        console.log(res);
        // success
        that.setData({ shopList: res.data.data.list });
        // console.log(that.data);
        // that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getShopList err' + err);
        // fail
        // that.stopRefreshing();
        
        wx.showToast({
          // title: '正在获取数据…',
          // icon: 'loading',
          // duration: 3000,
          // mask: true
        });
      });
  },
  
  serviceList:function(){
     var that=this;
     that.setData({
       serviceDisplay:"",
       otherStyle: "color:black;background-color:white;",
       serverStyle: "color:white;background-color:#0cc4b1;",
       otherDisplay:"display:none"
     })
  },
  otherList:function(){
    var that = this;
    that.setData({
      serviceDisplay: "display:none;",
      serverStyle:"color:black;background-color:white;",
      otherStyle: "color:white;background-color:#0cc4b1;",
      otherDisplay: "",
    
    })
  },
  ranfa:function(){
    var that=this;
    if(this.data.ranfa=="display:none"){
 
    that.setData({
      ranfa:""
    })
  
    } else{
      that.setData({
        ranfa: "display:none"
      })
    
  }
  },
 tangfa: function () {
    var that = this;
    if (this.data.tangfa == "display:none") {

      that.setData({
        tangfa: ""
      })
     
    } else {
      that.setData({
        tangfa: "display:none"
      })
     
    }
  },
  // getMoney:function(e){
  //  console.log("btn:"+e.target.value);
  // },
  checkboxChange: function (e) {
    var that = this;
  
    that.setData({
      clickServer: e.detail.value,

    })
    console.log("clickServer:" + e.detail.value);
  
   
  },

  toChoShop:function(){
    this.calculate();
 var that=this;
    wx.navigateTo({
      url: 'chooseShop?clickServer=' + that.data.clickServer +"&barberId="+that.data.barberId+"&allMoney="+that.data.clickMoney,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      barberId: options.barberId
    })
  //  this.getServiceList();
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

  }
})