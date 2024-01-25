import axios from 'axios';
import baseURL from '../Common/baseURL';
import { navigate } from '../Common/NavigationContainer';
import Start from "../components/screen/Start";
/**
 * 항상 모든 API 요청은 해당 Instatnce를 사용합니다.
 * 로그인이 된 instance는 쿠키에 인증이된 acc 토큰을 가지고 있습니다.
 */
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // withCredentials 옵션 추가
});
// instance.interceptors.response.use(
//   (response) =>{
//     return response;
//   }, 
//   async (error)=> {
//     console.log('intercepter', error)
//     if (error.response && error.response.status === 401) {
//       //refresh하기
//       const suc = await refresh()
//       // 재요청
//       if(suc === true){
//         const originalResponse = await instance.request(error.config);
//         return originalResponse;
//       }
//       else{
//         logout()
//       }

//     } else {
//         return Promise.reject(error);
//     }
//   }
// );
/**
 * 리프레시 토큰을 통한 acc토큰 체인지
 */
const refresh = async ()=>{
  const endPoint = 'v1/users/refresh'
  const apiURL = baseURL + endPoint

  return await instance.get(apiURL)
  .then((res)=>{
    if(res.status === 200){
      return true
    }
    else{
      return false
    }
  })
  .catch((error)=>{
    return false
  })

}
/**
 * 유저 유효성에따라서 logout은 전역적으로 관리합니다.
 */
const logout = async()=>{
  const endPoint = 'v1/users/logout'
  const apiURL = baseURL+endPoint
  instance.get(apiURL)
  .then((res)=>{
      console.log(res)
      navigate(Start)
  })
  .catch((error)=>{
      console.log(error)
  })
}


export {instance, refresh, logout};