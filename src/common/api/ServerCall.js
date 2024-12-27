import axios from "axios"
import { Cookies } from "./Cookies"


export class ServerCall {

    static authenticate(url, dataObj) {
        return axios.post(process.env.NEXT_PUBLIC_BASE_URL + url,  { username: dataObj.uid, password: dataObj.pwd }, {
            headers: { 'Content-type': 'application/json' }
        })
    }

    static signup(url, dataObj) {
        return axios.post(process.env.NEXT_PUBLIC_BASE_URL + url,  { username: dataObj.mobileno, password: dataObj.pwd, name: dataObj.name, mobileno: dataObj.mobileno, email: dataObj.uid }, {
            headers: { 'Content-type': 'application/json' }
        })
    }
     
      
    static sendGetReq(url) {
        return axios.get(process.env.NEXT_PUBLIC_BASE_URL + url, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendPostReq(url, data) {
        return axios.post(process.env.NEXT_PUBLIC_BASE_URL + url, data, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendPutReq(url, data) {
        return axios.put(process.env.NEXT_PUBLIC_BASE_URL + url, data, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
    static sendDeleteReq(url) {
        return axios.delete(process.env.NEXT_PUBLIC_BASE_URL + url, {
            headers: {
                Authorization: Cookies.getCookie("token")
            }
        })
    }
}

