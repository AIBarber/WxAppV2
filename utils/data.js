/**
 * banner数据
 */
function getBannerData() {
  var arr = ['../../images/banner_01.png', '../../images/banner_02.png', '../../images/banner_03.png', '../../images/banner_04.png']
  return arr
}
/*
 * 首页 navnav 数据
 */
function getIndexNavData() {
  var arr = [
    {
      id: 1,
      icon: "../../images/nav_icon_01.png",
      title: "推荐"
    },
    {
      id: 2,
      icon: "../../images/nav_icon_02.png",
      title: "美甲"
    },
    {
      id: 3,
      icon: "../../images/nav_icon_03.png",
      title: "美容"
    },
    {
      id: 4,
      icon: "../../images/nav_icon_04.png",
      title: "美发"
    },
    {
      id: 5,
      icon: "../../images/nav_icon_05.png",
      title: "美睫"
    }
  ]
  return arr
}
/*
 * 首页 对应 标签 数据项
 */
function getIndexNavSectionData() {
  var arr = [
    [
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },
      {

        subject: "王可欣  设计总监|11年",
        coverpath: "../../../icon/skilledt_img_04.png",
        price: '¥198',
        message: '地址：北京市朝阳区光华路10号',

        state: '状态：理发中'
      },

    ]
  ]
  return arr
}
/**
 * 技师 数据
 * */
function getSkilledData() {
  var arr = [
    {
      company: "宜人造型",
<<<<<<< HEAD
      avatar: "../../../icon/recommend_img_03.png",
=======
      avatar: "../../icon/recommend_img_03.png",
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
      nickname: '店铺人数: 12人',
      price: '起步价：¥50',
      message: '北京市朝阳区光华路10号院5门1008室',
      distance: '100m'
    },
    {
      company: "圆月亮美甲沙龙",
<<<<<<< HEAD
      avatar: "../../../icon/recommend_img_03.png",
=======
      avatar: "../../icon/recommend_img_03.png",
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
      nickname: '店铺人数: 12人',
      price: '起步价：¥50',
      message: '北京市朝阳区光华路10号院5门1008室',
      distance: '200m'
    },
    {
      company: "璀璨美睫会所",
<<<<<<< HEAD
      avatar: "../../../icon/recommend_img_03.png",
=======
      avatar: "../../icon/recommend_img_03.png",
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
      nickname: '店铺人数: 12人',
      price: '起步价：¥50',
      message: '北京市朝阳区光华路10号院5门1008室',
      distance: '100m'
    },
    {
      company: "柔丝妮美容养生馆",
<<<<<<< HEAD
      avatar: "../../../icon/recommend_img_03.png",
=======
      avatar: "../../icon/recommend_img_03.png",
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
      nickname: '店铺人数: 12人',
      price: '起步价：¥50',
      message: '北京市朝阳区光华路10号院5门1008室',
      distance: '400m'
    }
  ]
  return arr
}

/**
 * 选择器 数据
 */
function getPickerData() {
  var arr = [
    {
      name: '张三',
      phone: '13812314563',
      province: '北京',
      city: '北京',
      addr: '朝阳区望京悠乐汇A座8011'
    },
    {
      name: '李四',
      phone: '13812314563',
      province: '北京市',
      city: '北京市',
      addr: '朝阳区望京悠乐汇A座4020'
    }
  ]
  return arr
}
/**
 * 查询 地址
 * */
var user_data = userData()
function searchAddrFromAddrs(addrid) {
  var result
  for (let i = 0; i < user_data.addrs.length; i++) {
    var addr = user_data.addrs[i]
    console.log(addr)
    if (addr.addrid == addrid) {
      result = addr
    }
  }
  return result || {}
}
/**
 * 用户数据
 * */
function userData() {
  var arr = {
    uid: '1',
    nickname: '山炮',
    name: '张三',
    phone: '13833337998',
    avatar: '../../images/avatar.png',
    addrs: [
      {
        addrid: '1',
        name: '张三',
        phone: '13812314563',
        province: '北京',
        city: '直辖市',
        addr: '朝阳区望京悠乐汇A座8011'
      },
      {
        addrid: '2',
        name: '李四',
        phone: '13812314563',
        province: '北京',
        city: '直辖市',
        addr: '朝阳区望京悠乐汇A座4020'
      }
    ]
  }
  return arr
}
/**
 * 省
 * */
function provinceData() {
  var arr = [
    // {pid:1,pzip:'110000',pname:'北京市'},
    // {pid:2,pzip:'120000',pname:'天津市'}
    '请选择省份', '福建省'
  ]
  return arr
}
/**
 * 市
 * */
function cityData() {
  var arr = [
    // {cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
    // {cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
    '请选择城市', '福州市', '厦门市', '宁德市'
  ]
  return arr
}
/*
 * 对外暴露接口
 */
module.exports = {
  getBannerData: getBannerData,
  getIndexNavData: getIndexNavData,
  getIndexNavSectionData: getIndexNavSectionData,
  getPickerData: getPickerData,
  getSkilledData: getSkilledData,
  userData: userData,
  provinceData: provinceData,
  cityData: cityData,
  searchAddrFromAddrs: searchAddrFromAddrs

}