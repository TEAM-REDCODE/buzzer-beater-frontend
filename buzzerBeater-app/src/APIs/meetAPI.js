import axios from "axios";
import instance from "./instance";
import baseURL from "../Common/baseURL";

/**
 * 새로운 농구팟 생성
 * @param {string} title 
 * @param {int} maxPerson 
 * @param {string} place 
 * @param {date time} time 
 * @param {string} createdById 
 * @returns 
 */
const createMeet = async (title, maxPerson, place, time, createdById)=>{
  endpoint = 'v1/meets/'
  apiURL = baseURL + endpoint

  const requestData= {
    'title': title,
    'maxPerson': maxPerson,
    'place': place,
    'time': time,
    'createdById': createdById,
  }

  const finalData = JSON.stringify(requestData)
  return await instance.post(apiURL, 
    finalData)
    .then((res)=>{
      console.log(res)
      if(res.status === 201){
        return true
      }
      else{
        return false
      }
    })
    .catch((error)=>{
      console.log(error)
      return false
    })

}
/**
 * 파티 정보들을 GET 
 * @param {int} page 
 * @param {int} size 
 * @returns 
 */
const getMeetinfo = async (page, size) => {
  endpoint = 'v1/meets/'
  apiURL = baseURL + endpoint
  return await instance.get(apiURL, {
    params: {
      'page': page, // 페이지 번호
      'size': size, // 페이지당 아이템 수
    },
  })
  .then((res)=>{
    if(res.status === 200){
      console.log(res)
      return res
    }
    else{
      return false
    }
  }
  )
  .catch((error)=>{
    console.log(error)
    return false
  })
  
}

/**
 * meet id를 통해 디테일 정보를 GET
 * @param {string} ID 
 */
const getMeetDetail = (ID) =>{
  endpoint = 'v1/meets/'
  apiURL = baseURL+endpoint+ID
  instance.get(apiURL)
  .then((res)=>{
    console.log(res)
    if (res.status === 200){
      return res
    }
    else{
      return false
    }
  })
  .catch((error)=>{
    console.log(error)
    return false
  })
}
/**
 * 삭제 성공시 True return
 * @param {string} ID 
 */
const deleteMeet = (ID) =>{
  endpoint = 'v1/meets/'
  apiURL = baseURL+endpoint+ID
  instance.delete(apiURL,{
  })
  .then((res)=>{
    if (res.status === 200){
      return true
    }
    else{
      return false
    }
  })
  .catch((error)=>{
    console.log(error)
    return false
  })
}
/**
 * 파티 정보를 수정
 * @param {string} ID 
 * @param {string} title 
 * @param {int} maxPerson 
 * @param {string} place 
 * @param {date time} time 
 */
const setMeet = (ID, title, maxPerson, place, time) =>{
  endpoint = 'v1/meets/'
  apiURL = baseURL+endpoint+ID

  const requestData ={
    'title' : title, 
    'maxPerson': maxPerson, 
    'place': place, 
    'time' : time
  }
  const finalData = JSON.stringify(requestData)
  instance.put(apiURL, finalData)
  .then((res)=>{
    console.log(res)
    if(res.status === 200){
      return true
    }
    else{
      return false
    }
  })
  .catch((error)=>{
    console.log(error)
    return false
  })
}

export {getMeetinfo, createMeet, getMeetDetail, deleteMeet, setMeet}

