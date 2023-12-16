import axios from "axios";
import instance from "./instance";
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
    const apiURL = 'http://172.16.3.243:5000/v1/users/signup'
    const requestData = {
        "nickname": nickname,
        "password": password,
        "email": email,
        "height": height,
        "mainPosition": mainPosition,
    }
    console.log(requestData);
    const finalData = JSON.stringify(requestData)
    console.log(finalData);
    return await axios.post(apiURL, finalData, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
        withCredentials : true
    })
    .then((res) => {
        const status = res.status
        console.log(status)
        if (status === 201){
            alert('회원가입 성공')
            window.location.href = ''
            return true;
        }
        else{
            console.log(status)
            alert('회원가입 실패')
            return false;
        }
    })

};

const logout = async()=>{
    const endPoint = 'v1/users/logout'
    const apiURL = baseURL+endPoint
    instance.get(apiURL)
    .then((res)=>{
        console.log(res)
    })
    .catch((error)=>{
        console.log(error)
    })
}
export {signIn, signUp, logout};







