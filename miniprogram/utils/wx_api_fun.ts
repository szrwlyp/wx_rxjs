import { Observable, switchMap, from } from "rxjs";
import { locationWxLogin } from "../module/index";

// 获取微信code
export function getWxCode() {
  return new Observable((subscriber) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          subscriber.next(res.code);
          subscriber.complete();
        } else {
          subscriber.error();
        }
      },
      fail: (err) => {
        subscriber.error(err);
      },
    });
  });
}

export function login() {
  return getWxCode().pipe(
    switchMap((code) =>
      from(
        locationWxLogin({
          appid: "wx546cf0535ad27d74",
          code,
        })
      )
    )
  );
}
