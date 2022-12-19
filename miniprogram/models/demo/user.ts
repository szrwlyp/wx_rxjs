import {
  Observable,
  iif,
  of,
  tap,
  throwError,
  defer,
  switchMap,
  from,
  map,
} from "rxjs";
import { APP_ID } from "../../config/index";
import { login } from "../../module/index";

export interface UserOptions {
  onUserInfoLoaded?: () => void;
}

export class User {
  motto: string;
  userInfo: Partial<WechatMiniprogram.UserInfo>;
  options: UserOptions;
  sessionId: string;
  userLoginInfo: object;
  constructor(options?: UserOptions) {
    this.motto = "Hello World";
    this.userInfo = {};
    this.options = options as UserOptions;
    this.sessionId = wx.getStorageSync("sessionId");
    this.userLoginInfo = {};
  }

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.userInfo = res.userInfo;
        this.options.onUserInfoLoaded && this.options.onUserInfoLoaded();
      },
    });
  }

  getUserProfile1() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  }

  // 获取微信code
  getWxCode() {
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

  wxLogin() {
    let that = this;
    return iif(
      () => (that.sessionId ? true : false),
      of(that.sessionId),
      defer(() =>
        that.getWxCode().pipe(
          switchMap((code) =>
            from(
              login({
                appid: APP_ID,
                code,
              })
            ).pipe(
              map((res: any) => {
                let { code, data } = res;
                console.log(res);
                if (code === 0) {
                  that.userLoginInfo = data;
                  wx.setStorageSync("sessionId", data.sessionid);
                  return data.sessionid;
                }
                return throwError(() => new Error("登录失败"));
              })
            )
          )
        )
      )
    );
  }
}
