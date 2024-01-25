import axios from "axios";
import {instance} from "./instance";
import baseURL from "../Common/baseURL";

const signIn = async (email, password) => {
    const endPoint = 'v1/users/login'
    const apiURL = baseURL + endPoint
    const requestData = {
        'email' : email,
        'password' : password,
    }
    const finalData = JSON.stringify(requestData)
    console.log(finalData);
    return await axios.post(apiURL, finalData, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
        withCredentials : true
    })
    .then((res) => {
        console.log(res)
        const status = res.status

        // console.log(res.cookie);
        if (status === 200){
            alert('로그인 성공')
            return true;
        }
        else{
            console.log(status)
            alert('로그인 실패')
            return false;
        }
    })

};

const signUp = async (nickname, email, password, height, mainPosition) => {
    const endPoint = 'v1/users/signUp'
    const apiURL = baseURL + endPoint
    const requestData = {
        "nickname": nickname,
        "password": password,
        "email": email,
        "height": height,
        "mainPosition": mainPosition,
    }
    const finalData = JSON.stringify(requestData)
    console.log(finalData);
    return await instance.post(apiURL, finalData)
    .then((res) => {
        const status = res.status
        if (status === 201){
            alert('회원가입 성공')
            return true;
        }
        else{
            console.log(status)
            alert('회원가입 실패')
            return false;
        }
    })

};


export {signIn, signUp};







