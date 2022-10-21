import Http from "../utils/http";
import { HttpParameter } from "../types/http";

export function wxLogin(data: any) {
  console.log("code", data);
  let params: HttpParameter = {
    data,
    url: "wxService/wxLogin",
    method: "POST",
  };
  return new Http(params).request();
}

export function locationWxLogin(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/wxLogin",
    method: "POST",
  };
  return new Http(params).request();
}
export function getUserData1(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/getUserData1",
    method: "POST",
  };
  return new Http(params).request();
}
export function getUserData2(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/getUserData2",
    method: "POST",
  };
  return new Http(params).request();
}
export function getUserData3(data: any) {
  let params: HttpParameter = {
    data,
    url: "v1/getUserData3",
    method: "POST",
  };
  return new Http(params).request();
}
