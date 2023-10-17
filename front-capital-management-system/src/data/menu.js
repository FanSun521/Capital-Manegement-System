const menu = [
  {
    label: "首页",
    icon: "shouye",
    children: [
      {
        path: "/home",
        name: "home",
        label: "分析台",
        icon: "fenxitai",
        url: "Home.vue",
      },
    ],
  },
  {
    label: "用户管理",
    icon: "yonghu",
    children: [
      {
        path: "/user",
        name: "user",
        label: "员工信息",
        icon: "yuangong",
        url: "User.vue",
      },
    ],
  },
  {
    label: "财务管理",
    icon: "caiwu",
    children: [
      {
        path: "/capital",
        name: "capital",
        label: "资金管理",
        icon: "capital",
        url: "Capital.vue",
      },
      {
        path: "/bill",
        name: "bill",
        label: "账单管理",
        icon: "bill",
        url: "Bill.vue",
      },
    ],
  },
  {
    label: "个人中心",
    icon: "wode",
    children: [
      {
        path: "/apply",
        name: "apply",
        label: "申请资金",
        icon: "apply",
        url: "Apply.vue",
      },
      {
        path: "/userInfo",
        name: "userInfo",
        label: "个人信息",
        icon: "gerenxinxi",
        url: "UserInfo.vue",
      },
    ],
  },
];
export default menu;
