// pages/Profile/profile.js

var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var model = require('../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'../../icon/headPhoto.png',
    flag:false , //标志个人资料是否可以修改
    content:'修改',  //按钮字样
    array: ['设计师','高级设计师','设计总监'], //级别种类
    choice:'设计师', //默认级别
    select:false,   //标志修改按钮是否可用
    // service:[{id:0,value:'洗吹'},{id:1,value:'洗剪吹'},{id:2,value:'染发'},{id:3,value:'烫发'},{id:4,value:'护理'}], //服务总类别
    // service_choice:[],  //提供的服务类别
    // choose:[]  ,//服务项目是否选中
    // price:['15','35','200','300','200'],   //价格
    year: null,
    mobile: null,
    info: null,

    item: '',
    item2: '',
    item3: '',
    item4: '',
    itemOne: '',
    serviceDisplay:'',
    otherDisplay: "",
    cutHair: "",
    ranfa: "display:none",
    tangfa: "display:none",
    diantangfa: "display:none",
    huli: "display:none",
    barberId: '1',
    allMoney: '',
    money: '',
    clickServer: [],
    clickMoney: null,
    barberinfoList: '',
    barberinfoListInfo: [],
    serviceKeyMap: {},
    serviceGroupList: [],
    serviceGroupKeyMap: {},
    serviceItemIdSet: []
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    console.log(options)
    // for (var i in this.data.service) {
    //   this.data.choose[i] = false;
    // }
    this.getServiceList();
  },

 changeFlag: function(){
   var that=this;
   if(that.data.flag==false){
     that.setData({
       flag: true,
       content: '提交'
     })
   }else{
    that.setData({
      flag: false,
      content:'修改'
    })
   }
 },

  /*  点击下拉框 */
  bindShowMsg() {
    if(this.data.flag==true){
    this.setData({
      select: !this.data.select
    })
    }
  },

  mySelect:function(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      choice: name,
      select: false
    })
  },

  // 获取当前输入框的值
  getValue: function (e) {
   // console.log(e);
    var index = e.target.id;
    var value = e.detail.value;
    if (index == 1) {
      this.setData({
        year: value
      })
    } else if (index == 2) {
      this.setData({
        mobile: value
      })
    } else {
      this.setData({
        info: value
      })
    }
    console.log(this.data)
  },

  changeHead:function(){
    if(this.data.flag == true){
    wx.chooseImage({
      count: 1, //最多可以选择的图片张数,默认9
      //sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        this.setData({
          photo: tempFilePaths[0]
        })
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: '上传失败，请重试！',
        })
      }
    })
   }
  },

  // checkboxChange: function (e) {
  //   console.log(e);
  //   this.data.service_choice=[];
  //   //当前选中的下标
  //   var checkIndex = e.detail.value;
  //   for(var i in checkIndex){
  //       this.data.service_choice.push(this.data.service[i]);
  //       this.data.choose[i]=true;
  //   }
  //   //打印当前所选中的数据
  //   console.log(this.data.service_choice);
  // },

  // changePriceValue:function(e){
  //   console.log("----------------------------------------");
  //   console.log(e);
  //   this.data.price[e.target.id]=e.detail.value;
  //   console.log(this.data.price);
  // }

  getServiceList: function () {
    console.log('Getbarberinfo ' + api.Getbarberinfo);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.Getbarberinfo,
      {
        "barberId": "1"
      },
      'POST').then(res => {
        // success
        console.log(res.data)
        for (var i = 0; i < res.data.bizContent.barberinfo.barberServiceList.length; i++) {
          var serviceGroup = res.data.bizContent.barberinfo.barberServiceList[i];
          this.data.serviceGroupList.push(serviceGroup);
          for (var j = 0; j < serviceGroup.barberServiceServiceList.length; j++) {
            var serviceItem = serviceGroup.barberServiceServiceList[j];
            this.data.serviceKeyMap[serviceItem.id] = serviceItem;
            this.data.serviceGroupKeyMap[serviceItem.id] = serviceGroup;
            if (!this.data.serviceItemIdSet.includes(serviceItem.id)) {
              this.data.serviceItemIdSet.push(serviceItem.id);
            }
          }
        }
        that.setData({
          barberinfoList: res.data.bizContent.barberinfo,
          itemOne: res.data.bizContent.barberinfo.barberServiceList[0].barberServiceServiceList,
          item: res.data.bizContent.barberinfo.barberServiceList[1].barberServiceServiceList,
          item2: res.data.bizContent.barberinfo.barberServiceList[2].barberServiceServiceList,
          item3: res.data.bizContent.barberinfo.barberServiceList[3].barberServiceServiceList,
          item4: res.data.bizContent.barberinfo.barberServiceList[4].barberServiceServiceList
        })
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

  serviceList: function () {
    var that = this;
    that.setData({
      serviceDisplay: "",
      otherStyle: "color:grey;background-color:white;",
      serverStyle: "color:white;background-color:#0cc4b1;",
      otherDisplay: "display:none"
    })
  },

  otherList: function () {
    var that = this;
    that.setData({
      // serviceDisplay: "display:none;",
      serverStyle: "color:grey;background-color:white;",
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

  ranfa: function () {
    var that = this;
    if (this.data.ranfa == "display:none") {
      that.setData({
        ranfa: ""
      })
    } else {
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

  checkboxChange: function (e) {
    var that = this;
    that.setData({
      clickServer: e.detail.value,
    })
    console.log("chooseServer:" + e.detail.value);
  },

})