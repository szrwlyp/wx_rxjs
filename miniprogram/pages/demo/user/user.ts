// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

import userStore from "../../../stores/user-store";

Page({
  data: userStore.data,

  onLoad() {
    userStore.bind("userPage", this);
  },
  onShow() {},

  getUserProfile() {
    userStore.getUserProfile();
  },
});
