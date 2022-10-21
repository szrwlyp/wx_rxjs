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
} from "rxjs";

class StorageServiceService {
  params: string;
  constructor(params: string) {
    this.params = params;
  }
  getRxjsData() {
    let that = this;

    return new Observable((subscriber) => {
      setTimeout(() => {
        // console.log(that.params);
        if (that.params === "p2") {
          subscriber.error(`${that.params} error`);
          subscriber.complete();
        } else {
          subscriber.next(that.params);
          subscriber.complete();
        }
      }, 2000);
    });
  }
}

import { wxLogin, locationWxLogin } from "../../module/index";

Page({
  data: {
    motto: "Hello World",
  },

  onLoad() {},
  onShow() {
    console.log(wx.createSelectorQuery().select(".npl-intro"));

    // let observableData_1 = new StorageServiceService("p1").getRxjsData();
    // let observableData_2 = new StorageServiceService("p2").getRxjsData();
    // let observableData_3 = new StorageServiceService("p3").getRxjsData();

    // let observable = forkJoin([
    //   observableData_1,
    //   observableData_2,
    //   observableData_3,
    // ]).pipe(
    //   finalize(() => {
    //     console.log("接口全部完成或部分接口报错");
    //   })
    // );
    // console.log(observable);
    // observable.subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log("complete");
    //   },
    // });

    // const source = interval(1000);
    // const result = source.pipe(
    //   mergeMap((val) => (val > 5 ? throwError(() => "Error!") : of(val))),
    //   retry({
    //     count: 2,
    //     delay: (_error, retryCount) => {
    //       console.log(_error);
    //       console.warn("重试次数", retryCount);
    //       console.warn(Math.pow(2, retryCount) * 1000);
    //       // 返回再次执行的通知函数（必须）
    //       return timer(Math.pow(2, retryCount) * 1000);
    //     },
    //   })
    // );

    // result.subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.log(`${err}: Retried 2 times then quit!`),
    // });

    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        let p = {
          appid: "wx546cf0535ad27d74",
          code: res.code,
        };
        locationWxLogin(p);
        // wxLogin(p);
      },
    });
  },
});
