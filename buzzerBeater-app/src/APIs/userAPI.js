import axios from "axios";
import instance from "./instance";
import baseURL from "../Common/baseURL";

/**
 * 리프레시 토큰을 통한 acc토큰 체인지
 */
const refresh = async()=>{
  const endPoint = 'v1/users/refresh'
  const apiURL = baseURL + endPoint

  instance.get(apiURL)
  .then((res)=>{
    if(res.status == 200){
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
 * 현재 쿠키에 담겨있는 유저 정보를 GET
 * @returns 
 */
const getUserInfo = async()=>{
  const endPoint = 'v1/users/'
  const apiURL = baseURL + endPoint
  return instance.get(apiURL)
  .then((res)=>{
    if(res.status == 200){
      console.log(res.data)
      return res.data
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
 * 유저가 속해있는 파티 GET
 */
const getBelong = async()=>{
  const endPoint = 'v1/users/belong'
  const apiURL = baseURL + endPoint

  instance.get(apiURL)
  .then((res)=>{
    if(res.status == 200){
      console.log(res)
      return res
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
 * 
 * @param {string} newName 
 * @returns 
 */
const setNickname = async (newName) => {
  const endPoint = 'v1/users/nickname'
  const apiURL = baseURL + endPoint
  const requestData = {
    "nickname" : newName
  }
  const finalData = JSON.stringify(requestData)

  return await instance.put(apiURL, finalData)
  .then((res)=>{
    if (res.status == 204){
      return true
    }
    else{
      return false
    }
  })
  .catch((error)=>{
      console.log(error)
      return false
    }
  )
}

/**
 * 
 * @param {float} newHeight 
 * @returns 
 */
const setHeight = async (newHeight) => {
  const endPoint = 'v1/users/height'
  const apiURL = baseURL + endPoint
  const requestData = {
    height : newHeight
  }
  const finalData = JSON.stringify(requestData)

  return await instance.put(apiURL, finalData)
  .then((res)=>{
    if (res.status == 204){
      return true
    }
    else{
      return false
    }
  })
  .catch((error)=>{
      console.log(error)
      return false
    }
  )
}

export {setNickname, setHeight, getUserInfo, getBelong, refresh}