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
    flag:false , //标志个人资料是否可以修改
    select:false,   //标志修改按钮是否可用
    content: '修改',  //按钮字样
    array: ['设计师', '高级设计师', '设计总监'], //级别种类
    choice: '', //当前级别
    level: '',
    photo: '',
    newPhoto: '',
    year: '',
    mobile: '',
    info: '',
    barberServiceList: [], //增加的服务项目列表
    hiddenmodalput: true,
        //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    name: '',
    priceO: '',
    priceS: '',
    type: null,
    service: null,
 
//  与服务项目相关参数
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

    //点击hiddenmodalput弹出框  
    modalinput: function () {
      this.setData({
        hiddenmodalput: false
      })
      console.log(this.data.hiddenmodalput)
    },
    //取消按钮  
    cancel: function (e) {
      this.setData({
        hiddenmodalput: true
      })
      console.log(this.data.hiddenmodalput)
    },
    //确认按钮  
    confirm: function (e) {
      var id = e.currentTarget.id;
      console.log(id)
      this.setData({
        hiddenmodalput: true,
        service: {
          "service": this.data.name,
          "onlinePrice": this.data.priceO,
          "storePrice": this.data.priceS
          }
      })
      switch(id){
        case '1':
        this.setData({
          type: 'haircut'
        })
          break;
        case '2':
          this.setData({
            type: 'hairdye'
          })
          break;
        case '3':
          this.setData({
            type: 'perm'
          })
          break;
        case '4':
          this.setData({
            type: 'haircare'
          })
          break;
        case '5':
          this.setData({
            type: 'shampoo'
          })
          break;
      }
      // console.log(type)
       //console.log(service)
      this.addService(this.data.type,this.data.service);
    },
    
    getName:function(e){
      //console.log(e);
      this.setData({
        name:e.detail.value
      })
    },
    getOPrice:function(e){
      this.setData({
        priceO: e.detail.value
      })
    },
    getSPrice:function(e){
      this.setData({
        priceS: e.detail.value
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
   // console.log(options)
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
      that.updateInfo();
      that.onLoad();
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

   // 选择下拉框中的一项
  mySelect:function(e) {
   // console.log(this.data.level);
    var name = e.currentTarget.dataset.name
    this.setData({
      choice: name,
      select: false
    })
    for( var i=0; i<this.data.array.length;i++){
      if(name == this.data.array[i]){
        this.setData({
          level: i+1
        })
      }
    }
   // console.log(this.data.level);
  },

  // 获取当前输入框的值
  getValue: function (e) {
    //console.log(e);
    var id = e.currentTarget.id;
    switch(id){
      case '1':
        this.setData({
          year: e.detail.value
        })
        //console.log(this.data.year)
        break;
      case '2':
        this.setData({
          mobile: e.detail.value
        })
        break;
      case '3':
        this.setData({
          info: e.detail.value
        })
        break;
    }
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
          photo: tempFilePaths[0],
          newPhoto: tempFilePaths[0]
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

  getServiceList: function () {
    console.log('Getbarberinfo ' + api.Getbarberinfo);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.Getbarberinfo,
      {
        "barberId": that.data.barberId
      },
      'POST').then(res => {
        // success
        console.log(res.data)
        // for (var i = 0; i < res.data.bizContent.barberinfo.barberServiceList.length; i++) {
        //   var serviceGroup = res.data.bizContent.barberinfo.barberServiceList[i];
        //   this.data.serviceGroupList.push(serviceGroup);
        //   for (var j = 0; j < serviceGroup.barberServiceServiceList.length; j++) {
        //     var serviceItem = serviceGroup.barberServiceServiceList[j];
        //     this.data.serviceKeyMap[serviceItem.id] = serviceItem;
        //     this.data.serviceGroupKeyMap[serviceItem.id] = serviceGroup;
        //     if (!this.data.serviceItemIdSet.includes(serviceItem.id)) {
        //       this.data.serviceItemIdSet.push(serviceItem.id);
        //     }
        //   }
        // }
        var t = res.data.bizContent.barberinfo;
        that.setData({
          barberinfoList: t,
          itemOne: t.barberServiceList[0].barberServiceServiceList,
          item: t.barberServiceList[1].barberServiceServiceList,
          item2: t.barberServiceList[2].barberServiceServiceList,
          item3: t.barberServiceList[3].barberServiceServiceList,
          item4: t.barberServiceList[4].barberServiceServiceList,
          photo: t.headImageUrl,
          newPhoto: t.headImageUrl,
          mobile: t.mobile,
          year: t.years,
          choice: that.data.array[t.level-1],
          level: t.level,
          info: t.introduction
        })
      }).catch((err) => {
        console.log('getShopList err' + err);
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


  addService:function(type,service){
    var that = this;
    console.log('Getbarberinfo ' + api.BarberUpdate);
    //wx.showNavigationBarLoading();
    if(type != null){
      var bizContent = {
          "barberId": that.data.barberId,
          "introduction": that.data.info,
          "barberServiceList": [
            {
              "barberId": that.data.barberId,
              "service": type,
              "barberServiceServiceList": [service]
            },
          ]
        }
    }else{
      var bizContent = {
        "barberId": that.data.barberId,
        "mobile": that.data.mobile,
        "level": that.data.level,
        "years": that.data.year,
        "introduction": that.data.info
      }
    }
   // console.log(bizContent)
    util.weshowRequest(
      api.BarberUpdate,
      bizContent,
      'POST').then(res => {
        // success
     //   console.log(res)
      }).catch((err) => {
        console.log('BarberUpdate err' + err);
        // fail
        // that.stopRefreshing();
      });
  },

  updateInfo:function(){
    console.log('BarberUpdate ' + api.BarberUpdate);
    wx.showNavigationBarLoading();
    var that = this;
    console.log('filePath: ' + that.data.newphoto)
    if(that.data.photo != that.data.newPhoto){
        wx.uploadFile({
          url: api.BarberUpdate,
          filePath: that.data.newphoto,
          name: 'barberImageFile',
          formData: {
            "barberId": that.data.barberId,
            "introduction": that.data.info
          },
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            // wx.showModal({
            //   title: '提示',
            //   content: '上传失败，请重试！',
            // })
            console.log('BarberUpdate err' + res)
          }
      })
    }else{
      that.addService(null,null);
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