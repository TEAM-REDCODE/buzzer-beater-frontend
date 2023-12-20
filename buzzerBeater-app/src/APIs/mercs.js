import baseURL from "../Common/baseURL";
import instance from "./instance";

/**
 * 
 * @param {strint} position  ['c', 'pf', 'sf', 'sg', 'pg'] 중에서 1개로 요청보내야 함.
 * @param {Date} avTime 
 * @returns 
 */
const createMercs = async (position, avTime) =>{
  const endpoint = 'v1/mercs/'
  const apiURL= baseURL + endpoint

  const requestData={
    'position' : position,
    'avTime' : avTime
  }

  const finalData =JSON.stringify(requestData)
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
    .catch((err)=>{
      console.log(err)
      return false
    })

}
/**
 * 
 * @param {string} position  ['c', 'pf', 'sf', 'sg', 'pg'] 중에서 1개로 요청보내야 함.
 */
const getPosMercs = async (position) =>{
  const endpoint = 'v1/mercs/'
  const apiURL = baseURL + endpoint + position
  instance.get(apiURL)
  .then((res) =>{
    console.log(res.data)
    if(res.status === 200){
      return res.data
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
 * 회원 쿠키를 통해 회원 용병을 삭제하는 API
 */
const deleteMercs = async () =>{
  const endpoint = 'v1/mercs/'
  const apiURL = baseURL + endpoint
  instance.delete(apiURL)
  .then((res)=>{
    console.log(res)
    if(res.status === 200){
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
export {createMercs, getPosMercs, deleteMercs}