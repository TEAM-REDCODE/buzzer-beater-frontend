import axios from "axios";
import instance from "./instance";

const baseURL = 'http://192.168.219.112:5000/'

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

const getUserInfo = async()=>{
  const endPoint = 'v1/users/'
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

const getBelong = async()=>{
  const endPoint = 'v1/users/belong'
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
 * 
 * @param {*} newName 
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


const setHeight = async (newHeight) => {
  // const apiURL = 'http://172.16.7.235:5000/v1/users/login'
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