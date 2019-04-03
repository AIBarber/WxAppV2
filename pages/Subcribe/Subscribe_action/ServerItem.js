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
    // itemOne:{id:1,name:"洗剪吹",value:"染发",money:19,moneyYuan:50},
    itemOne:'',
    // item: [{id:2, name: "染发", value: "染发", money:39, moneyYuan:50},
    //   {id:3, name: "染发2", value: "染发2", money:39, moneyYuan:50}, 
    //   {id:4, name: "染发2", value: "染发2", money:39, moneyYuan:50}],
    item:'',
    item2:'',
    item3:'',
    item4:'',
    barberName:'',
    serviceDisplay:"",
    otherDisplay:"",
    cutHair:"",
    ranfa:"display:none",
    tangfa: "display:none",
    diantangfa: "display:none",
    huli: "display:none",
    clickServer:[],
    clickMoney:null,
    barberId:'',
    allMoney:'',
    money:'',
    barberinfoList:'',
    barberinfoListInfo:[],
    serviceKeyMap:{},
    serviceGroupList:[],
    serviceGroupKeyMap:{},
    serviceItemIdSet:[]
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

calculate:function () {
    var server = this.data.clickServer;
    var totalMoney = 0;
     for(var i=0;i<server.length;i++){ 
       for (var j = 0; j < this.data.item.length;j++){
         if (this.data.item[j].id==server[i]){
           totalMoney += this.data.item[j].onlinePrice;
       }
       }
       for (var j = 0; j < this.data.item2.length; j++) {
         if (this.data.item2[j].id == server[i]) {
           totalMoney += this.data.item2[j].onlinePrice;
         }
       }
       for (var j = 0; j < this.data.item3.length; j++) {
         if (this.data.item3[j].id == server[i]) {
           totalMoney += this.data.item3[j].onlinePrice;
         }
       }
       for (var j = 0; j < this.data.item4.length; j++) {
         if (this.data.item4[j].id == server[i]) {
           totalMoney += this.data.item4[j].onlinePrice;
         }
       }
       for (var j = 0; j < this.data.itemOne.length; j++) {
         if (this.data.itemOne[j].id == server[i]) {
           totalMoney += this.data.itemOne[j].onlinePrice;
         }
       }
     }
  
    console.log("计算:money:" + totalMoney);
    return totalMoney;
  },

  getServiceList: function () {
    console.log('Getbarberinfo' + api.Getbarberinfo);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.Getbarberinfo,
      {
        "barberId": "1"
      },
      'POST').then(res => {
        // success
        for (var i = 0; i < res.data.bizContent.barberinfo.barberServiceList.length;i++) {
          var serviceGroup = res.data.bizContent.barberinfo.barberServiceList[i];
          this.data.serviceGroupList.push(serviceGroup);
          for (var j = 0; j < serviceGroup.barberServiceServiceList.length;j++){
            var serviceItem = serviceGroup.barberServiceServiceList[j];
            this.data.serviceKeyMap[serviceItem.id] = serviceItem;
            this.data.serviceGroupKeyMap[serviceItem.id] = serviceGroup;
            if (!this.data.serviceItemIdSet.includes(serviceItem.id)){
              this.data.serviceItemIdSet.push(serviceItem.id);
            }
          }
        }
        that.setData({ barberinfoList: res.data.bizContent.barberinfo});
        that.setData({ itemOne: res.data.bizContent.barberinfo.barberServiceList[0].barberServiceServiceList});
        that.setData({ item: res.data.bizContent.barberinfo.barberServiceList[1].barberServiceServiceList});
        that.setData({ item2: res.data.bizContent.barberinfo.barberServiceList[2].barberServiceServiceList });
        that.setData({ item3: res.data.bizContent.barberinfo.barberServiceList[3].barberServiceServiceList });
        that.setData({ item4: res.data.bizContent.barberinfo.barberServiceList[4].barberServiceServiceList });
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
       otherStyle: "color:grey;background-color:white;",
       serverStyle: "color:white;background-color:#0cc4b1;",
       otherDisplay:"display:none"
     })
  },
  otherList:function(){
    var that = this;
    that.setData({
      // serviceDisplay: "display:none;",
      serverStyle:"color:grey;background-color:white;",
      otherStyle: "color:white;background-color:#0cc4b1;",
      otherDisplay: "",
    })
  },
 cuthair: function () {
    var that = this;
   if (this.data.cutHair == "display:none") {
      that.setData({
        cutHair: ""
      })
    } else {
      that.setData({
        cutHair: "display:none"
      })
    }
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
  diantangfa: function () {
    var that = this;
    if (this.data.diantangfa == "display:none") {
      that.setData({
        diantangfa: ""
      })
    } else {
      that.setData({
        diantangfa: "display:none"
      })
    }
  },
 huli: function () {
    var that = this;
    if (this.data.huli == "display:none") {
      that.setData({
        huli: ""
      })
    } else {
      that.setData({
        huli: "display:none"
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
   
    console.log("chooseServer:" + e.detail.value);
  },
  //2个集合的差集 在arr不存在
  minus: function (arrSource, arr) {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = 1;
    }
    for (var j = 0; j < arrSource.length; j++) {
      if (!obj[arrSource[j]]) {
        obj[arrSource[j]] = 1;
        result.push(arrSource[j]);
      }
    }
    return result;
  },
  toChoShop:function(){
    var totalMoney = this.calculate();
    var that = this;
    var clickServer = that.data.clickServer;
    var selectServiceItemList = [];
    var serviceGroupList = that.data.serviceGroupList;
    var serviceGroupKeyMap = that.data.serviceGroupKeyMap;

    var needToDeleteItemIdList = this.minus(that.data.serviceItemIdSet,clickServer)
    var needToDeleteParentId = [];
    var groupServiceItemList = [];
    for (var i = 0; i < serviceGroupList.length; i++){
      var serviceGroup = serviceGroupList[i];
      var serviceItemList = serviceGroup.barberServiceServiceList; 
      var deletePosList = [];
      for (var pos = 0; pos < serviceItemList.length; pos++) {
        var item = serviceItemList[pos];
        if (needToDeleteItemIdList.includes(item.id)){
          deletePosList.push(pos);
        }
      }
      if (deletePosList.length == serviceGroup.barberServiceServiceList.length){
          //全部删除
        needToDeleteParentId.push(serviceGroup.id);
      }else{
        for (var deletePos = 0; deletePos < deletePosList.length; deletePos++) {
          serviceGroup.barberServiceServiceList.splice(deletePosList[deletePos], 1);
        }
      }
      
    }
    //整理 删除后的父节点
    var serviceGroupListNew = []
    for (var t = 0; t < serviceGroupList.length;t++){
      if (!needToDeleteParentId.includes(serviceGroupList[t].id)){
        serviceGroupListNew.push(serviceGroupList[t]);
      }
    }  
    if (serviceGroupListNew.length == 0){
      util.showErrorToast('至少选择一项');
      return;
    }
    wx.navigateTo({
      url: 'chooseShop?serviceGroupList=' + JSON.stringify(serviceGroupListNew) + "&barberId=" + that.data.barberId + "&allMoney=" + totalMoney+"&barberName="+that.data.barberName,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      barberId: options.barberId,
      barberName:options.barberName
    })
    this.getServiceList();
    console.log("barberName:" + this.data.barberName);
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