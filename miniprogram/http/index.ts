import { Observable, retry, timer } from "rxjs";
import { HttpAttribute, HttpParameter, HttpMethod } from "./types";

/**
 * Http状态码有：1xx，2xx，3xx，4xx，5xx。
 * 根据状态码第一个字符来执行相应的函数。函数内部还能具体，比如：403，404等等。
 */
const HttpStatus = new Map([
  [
    "1",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "2",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "3",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "4",
    (subscriber: any, res: any) => {
      subscriber.next(res);
      subscriber.complete();
    },
  ],
  [
    "5",
    (subscriber: any, err: any) => {
      subscriber.error(err);
      subscriber.complete();
    },
  ],
  [
    "error",
    (subscriber: any, err: any) => {
      subscriber.error(err);
      subscriber.complete();
    },
  ],
]);

// https://vpascare.com/api/
export default class Http {
  private base_url = "http://192.168.31.4:8080/api/";
  private url = "";
  private data = {};
  private method = HttpMethod.GET;
  private header = {
    "content-type": "application/json",
  };
  constructor(parameter: HttpParameter) {
    let { data, url, method } = parameter;
    this.data = data;
    this.url = url;
    this.method = method;
  }

  public request() {
    let { base_url, url, data, method, header } = this;
    return new Observable((subscriber) => {
      wx.request({
        url: base_url + url,
        data,
        timeout: 30000,
        method,
        header,
        success(res) {
          console.warn("接口请求成功1：", res);

          let statusToString = res.statusCode.toString(),
            firstStr = statusToString.charAt(0);

          if (HttpStatus.has(firstStr)) {
            HttpStatus.get(firstStr)!(subscriber, res);
          } else {
            HttpStatus.get("error")!(subscriber, res);
          }
        },
        fail(err) {
          console.warn("接口请求失败：", err);
          HttpStatus.get("error")!(subscriber, err);
        },
      });
    }).pipe(
      retry({
        count: 2,
        delay: (_error, retryCount) => {
          console.warn(
            `第${retryCount}次重试。重试的时间间隔${Math.pow(2, retryCount)}秒`
          );

          const random_number_milliseconds = Math.floor(Math.random() * 1000);
          console.log(
            Math.pow(2, retryCount) * 1000 + random_number_milliseconds
          );
          // 返回再次执行的通知函数（必须）
          return timer(Math.pow(2, retryCount) * 1000);
        },
      })
    );
  }
}
