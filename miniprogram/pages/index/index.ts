// index.ts
// 获取应用实例
const app = getApp<IAppOption>();

import {
  of,
  filter,
  map,
  Observable,
  interval,
  from,
  tap,
  throttleTime,
  asyncScheduler,
  buffer,
  Subject,
  timer,
  scan,
  bufferTime,
  bufferWhen,
  take,
  fromEvent,
  mergeMap,
  retry,
  throwError,
  finalize,
  forkJoin,
  switchMap,
  iif,
} from "rxjs";

import {
  locationWxLogin,
  getUserData3,
  getUserData2,
  getUserData1,
} from "../../module/index";
import { getWxCode, login } from "../../utils/wx_api_fun";

Page({
  data: {
    motto: "Hello World",
  },
  userLoginData: {},

  onLoad() {},
  onShow() {
    console.log(wx.createSelectorQuery().select(".npl-intro"));

    this.userLogin();

    // this.userLoginData.subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //   },
    // });
  },

  // 微信登录
  userLogin() {
    let that = this;

    login().subscribe({
      next: (res) => {
        console.log(res);
        that.deom1();
      },
      error: (err) => {
        console.log(err);
      },
    });
  },
  // 并行请求多个接口
  deom1() {
    let observable = forkJoin([
      getUserData1("getUserData1数据"),
      getUserData2("getUserData2数据"),
      getUserData3("getUserData3数据"),
    ]).pipe(
      finalize(() => {
        console.log("接口全部完成或部分接口报错");
      })
    );

    observable.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("complete");
      },
    });
  },
});
