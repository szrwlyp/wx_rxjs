import Http from "../http";
import { HttpParameter, HttpMethod } from "../http/types";

export function wxLogin(data: any) {
  console.log("code", data);
  let params: HttpParameter = {
    data,
    url: "v1/wxLogin",
    method: HttpMethod.POST,
  };
  return new Http(params).request();
}

export function locationWxLogin(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/locationWxLogin",
    method: HttpMethod.POST,
  };
  return new Http(params).request();
}
