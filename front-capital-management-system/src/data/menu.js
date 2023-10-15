const menu = [
  {
    label: "首页",
    icon: "s-home",
    children: [
      {
        path: "/home",
        name: "home",
        label: "分析台",
        icon: "",
        url: "Home.vue",
      },
    ],
  },
  {
    label: "用户管理",
    icon: "video-play",
    children: [
      {
        path: "/user",
        name: "user",
        label: "员工信息",
        icon: "",
        url: "User.vue",
      },
    ],
  },
  {
    label: "财务管理",
    icon: "video-play",
    children: [
      {
        path: "/capital",
        name: "capital",
        label: "资金管理",
        icon: "",
        url: "Capital.vue",
      },
      {
        path: "/bill",
        name: "bill",
        label: "账单管理",
        icon: "",
        url: "Bill.vue",
      },
    ],
  },
  {
    label: "个人中心",
    icon: "location",
    children: [
      {
        path: "/apply",
        name: "apply",
        label: "申请资金",
        icon: "setting",
        url: "Apply.vue",
      },
      {
        path: "/userInfo",
        name: "userInfo",
        label: "个人信息",
        icon: "setting",
        url: "UserInfo.vue",
      },
    ],
  },
];
export default menu;
