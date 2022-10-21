import { Observable, retry, timer } from "rxjs";
import { HttpAttribute, HttpParameter } from "../types/http";

// http://192.168.31.4:8080/api/v1/wxLogin
// https://vpascare.com/api/
export default class Http implements HttpAttribute {
  public base_url = "http://192.168.31.4:8080/api/";
  public url = "";
  public data = {};
  public method = "GET";
  public header = {
    "content-type": "application/json",
  };
  constructor(parameter: HttpParameter) {
    let { data, url, method } = parameter;
    this.data = data;
    this.url = url;
    this.method = method;
  }

  request() {
    let { base_url, url, data, method, header } = this;

    return new Observable((subscriber) => {
      wx.request({
        url: base_url + url,
        data,
        timeout: 30000,
        method: "POST",
        header,
        success(res) {
          console.warn("接口请求成功：", res);

          if (res.statusCode == 200) {
            subscriber.next(res);
            subscriber.complete();
          } else if (res.statusCode == 500) {
            subscriber.error(res);
            subscriber.complete();
          }
        },
        fail(err) {
          console.warn("接口请求失败：", err);
          subscriber.error(err);
          subscriber.complete();
        },
      });
    })
      .pipe(
        retry({
          count: 2,
          delay: (_error, retryCount) => {
            console.warn(
              `第${retryCount}次重试。重试的时间间隔${Math.pow(
                2,
                retryCount
              )}秒`
            );

            const random_number_milliseconds = Math.floor(Math.random() * 1000);
            console.log(
              Math.pow(2, retryCount) * 1000 + random_number_milliseconds
            );
            // 返回再次执行的通知函数（必须）
            return timer(Math.pow(2, retryCount) * 1000);
          },
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
