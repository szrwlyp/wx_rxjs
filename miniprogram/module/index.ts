import Http from "../utils/http";
import { HttpParameter } from "../types/http";

export function wxLogin(data: any) {
  let params: HttpParameter = {
    data,
    url: "wxService/wxLogin",
    method: "POST",
  };
  new Http(params).request();
}

export function locationWxLogin(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/wxLogin",
    method: "POST",
  };
  new Http(params).request();
}
