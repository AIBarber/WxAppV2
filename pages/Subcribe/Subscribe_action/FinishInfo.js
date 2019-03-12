// pages/myDateServer/DateServerInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsonContent:'',
    time:'',
    clickRadio: '',
    noLimitTime: '',
    adjustTime: '',
    noLimitStore: '',
    adjustStore: '',
    storeId: '',
    barberId: '',
    clickServer: '',
    address:'',
    allMoney:null,
    barberName:'',
    shopAddress:'',
    timeChineseStr:''
  },
  returnToChooseShop:function(){
      wx.navigateBack({
        
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var timePostion = options.postion;
    console.log("timePositon::"+timePostion)
    var timeChinese='';
    for (var i = 0; i < timePostion.length;i++){
          if(timePostion[i]!=0){
            switch (timePostion[i]) {
              case '1':
                timeChinese+="今天上午 ";
                break;
              case '2':
                timeChinese += "今天下午 ";
                break;
              case '3':
                timeChinese += "今天晚上 ";
                break;
              case '4':
                timeChinese += "明天上午 ";
                break;
              case '5':
                timeChinese += "明天下午 ";
                break;
              case '6':
                timeChinese += "明天晚上 ";
                break;
              case '7':
                timeChinese += "后天上午 ";
                break;
              case '8':
                timeChinese += "后天下午 ";
                break;
              case '9':
                timeChinese += "后天晚上 ";
                break;
            }
        
          }
    }
  
    console.log("timeChinese::" + timeChinese);
      that.setData({
        time: timeChinese,
        barberId: options.barberId,
        address: options.storeId,  
        noLimitTime:options.noLimitTime,
        noLimitStore:options.noLimitStore,
        adjustTime:options.adjustTime,
        adjustStore:options.adjustStore,
        clickServer:options.clickServer,
        allMoney:options.allMoney,
        barberName:options.barberName,
        shopAddress:options.storeAddress
      })
       console.log(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.time + "--" + this.data.address);
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