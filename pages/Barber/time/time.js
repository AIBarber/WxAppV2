// pages/time/time.js
var num = 0;
Page({
  data: {
    viewBg: 'white',
    viewBg1: 'white',
    viewBg2: 'white',
    viewBg3: 'white',
    viewBg5: 'white',
    viewBg6: 'white',
    viewBg7: 'white',
    viewBg8: 'white',
    viewBg9: 'white'
  },
  changeBg() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg: 'white'
      })
    } else {
      this.setData({
        viewBg: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg1() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg1: 'white'
      })
    } else {
      this.setData({
        viewBg1: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg2() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg2: 'white'
      })
    } else {
      this.setData({
        viewBg2: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg3() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg3: 'white'
      })
    } else {
      this.setData({
        viewBg3: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg5() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg5: 'white'
      })
    } else {
      this.setData({
        viewBg5: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg6() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg6: 'white'
      })
    } else {
      this.setData({
        viewBg6: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg7() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg7: 'white'
      })
    } else {
      this.setData({
        viewBg7: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg8() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg8: 'white'
      })
    } else {
      this.setData({
        viewBg8: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  },
  changeBg9() {
    num++;
    var result = num / 2;
    if (num % 2 == 0) {
      this.setData({
        viewBg9: 'white'
      })
    } else {
      this.setData({
        viewBg9: 'blue'
      })
    }
    console.log(num)
    console.log(result)
  }
})