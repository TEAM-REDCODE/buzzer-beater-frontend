import axios from "axios";

const signUp = async (nickname, email, pw, height, position) => {
    // axios를 이용하여 jwt 회원가입 요청을 보낸다.
    const apiURL = "http://localhost:5000/v1"
    const requestData = {
        'nickname' : nickname,
        'email': email,
        'password': pw,
        'height' : height,
        'position' : position,
    }
    const finalData = JSON.stringify(requestData)
    console.log(finalData)
    return await axios.post(apiURL, finalData, {
        headers: {
            'Content-Type': 'application/json', // JSON 데이터를 보내는 것을 명시
        },
        withCredentials : true

    })
}






