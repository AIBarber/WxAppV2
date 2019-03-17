// pages/Profile/profile.js
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
    service:[{id:0,value:'洗吹'},{id:1,value:'洗剪吹'},{id:2,value:'染发'},{id:3,value:'烫发'},{id:4,value:'护理'}], //服务总类别
    service_choice:[],  //提供的服务类别
    choose:[]  ,//服务项目是否选中
    price:['15','35','200','300','200'],   //价格
    year: null,
    mobile: null,
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    for (var i in this.data.service) {
      this.data.choose[i] = false;
    }
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

  checkboxChange: function (e) {
    console.log(e);
    this.data.service_choice=[];
    //当前选中的下标
    var checkIndex = e.detail.value;
    for(var i in checkIndex){
        this.data.service_choice.push(this.data.service[i]);
        this.data.choose[i]=true;
    }
    //打印当前所选中的数据
    console.log(this.data.service_choice);
  },

  changePriceValue:function(e){
    console.log("----------------------------------------");
    console.log(e);
    this.data.price[e.target.id]=e.detail.value;
    console.log(this.data.price);
  }

})