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
  const endpoint = 'v1/meets/'
  const apiURL = baseURL + endpoint

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
  const endpoint = 'v1/meets/'
  const apiURL = baseURL + endpoint
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
  const endpoint = 'v1/meets/'
  const apiURL = baseURL+endpoint+ID
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
 * 유저가 ID번호의 파티에 참가 API true of false return
 * @param {int} ID
 * @returns 1 파티 참여 성공
 * @returns 2 이미 속해져있는 경우
 * @returns 3 파티 생성 실패
 */
const RegMeet = (ID) =>{
  const endpoint = 'v1/meets/'
  const apiURL = baseURL+ endpoint +ID + '/reg'
  instance.get(apiURL)
  .then((res)=>{
    console.log(res)
    if (res.status === 200){
      return 1
    }
  })
  .catch((error)=>{
    console.log(error)
    if(error.response.status === 400){
      return 2
    }

    return 3
  })
}
/**
 * 삭제 성공시 True return
 * @param {string} ID 
 */
const deleteMeet = (ID) =>{
  const endpoint = 'v1/meets/'
  const apiURL = baseURL+endpoint+ID
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
  const endpoint = 'v1/meets/'
  const apiURL = baseURL+endpoint+ID

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
/**
 * 
 * @param {string} Meetid 
 * @param {string} mercsId
 * @retrun true 용병 초대 성공
 * @retrun flase 용병 초대 실패 
 */
const inviteMercs = (Meetid, mercsId) =>{
  const endpoint = 'v1/meets/' + Meetid + '/mercs'
  const apiURL = baseURL + endpoint
  const requestData = {
    'mercId': mercsId
  }
  const finalData = JSON.stringify(requestData)
  
  instance.post(apiURL, finalData)
  .then((res)=>{
    console.log(res)
    if(res.status === 201){
      return true
    }
    else{
      return false
    }
  })
  .catch((err)=>{
    console.log(err)
    return false
  })
}
/**
 * 
 * @param {string} id 	meet 식별자
 * @param {string} stage 용병 신청 진행 상황 신청중: ap(applying)/ 등록됨: ac(accepted)
 */
const getMeetMercs = (id, stage) =>{
  const endpoint = 'v1/meets/' + id + '/mercs/' + stage
  const apiURL = baseURL + endpoint

  instance.get(apiURL)
  .then((res)=>{
    console.log(res)

  })

}
export {getMeetinfo, createMeet, getMeetDetail, 
  deleteMeet, setMeet, RegMeet, inviteMercs, getMeetMercs}

