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
    photoBase64: null,
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
      this.addService(this.data.type,this.data.service,id-1);
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
      that.addService(null,null,null);
      //getCurrentPages()[getCurrentPages().length - 1].onLoad();
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
       // console.log(this.data.year)
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
          photo: tempFilePaths[0]
        })

        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
            this.setData({
              photoBase64: 'data:image/png;base64,' + res.data
            })
          }
        });
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
        var t = res.data.bizContent.barberinfo;
        that.setData({
          barberinfoList: t,
          photo: t.headImageUrl,
          mobile: t.mobile,
          year: t.years,
          choice: that.data.array[t.level-1],
          level: t.level,
          info: t.introduction
        })
        if (t.barberServiceList[0]) {
          that.setData({
            itemOne: t.barberServiceList[0].barberServiceServiceList
          })
        }
        if (t.barberServiceList[1]){
          that.setData({
            item: t.barberServiceList[1].barberServiceServiceList
          })
        }
        if (t.barberServiceList[2]) {
          that.setData({
            item2: t.barberServiceList[2].barberServiceServiceList
          })
        }
        if (t.barberServiceList[3]) {
          that.setData({
            item3: t.barberServiceList[3].barberServiceServiceList
          })
        }
        if (t.barberServiceList[4]) {
          that.setData({
            item4: t.barberServiceList[4].barberServiceServiceList
          })
        }
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

  addService:function(type,service,id){
    var that = this;
    console.log('Getbarberinfo ' + api.BarberUpdate);
    //wx.showNavigationBarLoading();
    var bizContent;
    if(type != null){
      var t = that.data.barberinfoList.barberServiceList
      console.log(t[id].barberServiceServiceList)
      t[id].barberServiceServiceList.push(service)
      console.log(t[id].barberServiceServiceList)
       bizContent = {
          barberId: that.data.barberId,
          introduction: that.data.info,
          barberServiceList: t
        }
    }else{
        if (that.data.photoBase64 != null){
          bizContent = {
            barberId: that.data.barberId,
            mobile: that.data.mobile,
            level: that.data.level,
            years: that.data.year,
            introduction: that.data.info,
            barberImageFile: that.data.photoBase64
          }
        }else{
          bizContent = {
            barberId: that.data.barberId,
            mobile: that.data.mobile,
            level: that.data.level,
            years: that.data.year,
            introduction: that.data.info
          }
        }
    }
   console.log(bizContent)
    util.weshowRequest(
      api.BarberUpdate,
      bizContent,
      'POST').then(res => {
        // success
       console.log(res)
        getCurrentPages()[getCurrentPages().length - 1].onLoad();
      }).catch((err) => {
        console.log('BarberUpdate err' + err);
        // fail
        // that.stopRefreshing();
      });
  },

  deleteService:function(e){
    //console.log(e);
    var that = this;
    var id = e.currentTarget.id;     //标记某一类别下的具体的服务项目 
    var index = e.currentTarget.dataset.id   //标记服务项目类别
    var t = that.data.barberinfoList.barberServiceList
    console.log(t[index].barberServiceServiceList)
    t[index].barberServiceServiceList.pop(t[index].barberServiceServiceList[id])
    console.log(t[index].barberServiceServiceList)
    wx.showModal({
      title: '提示',
      content: '确定删除该服务项目？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var bizContent={
            barberId: that.data.barberId,
            introduction: that.data.info,
            barberServiceList: t
          }
          util.weshowRequest(
            api.BarberUpdate,
            bizContent,
            'POST').then(res => {
              // success
              console.log(res)
              getCurrentPages()[getCurrentPages().length - 1].onLoad();
            }).catch((err) => {
              console.log('BarberUpdate err' + err);
              // fail
              // that.stopRefreshing();
            });
        }
      }
    })
  },

  checkboxChange: function (e) {
    var that = this;
    that.setData({
      clickServer: e.detail.value,
    })
    console.log("chooseServer:" + e.detail.value);
  },

})