const pos = ['c', 'pf', 'sf', 'sg', 'pg']
const posToKor = (targetPos) =>{
  if (targetPos === pos[0]){
    return '센터'
  }else if (targetPos === pos[1]){
    return '파워포워드'

  }else if (targetPos === pos[2]){
    return '스몰포워드'

  }else if (targetPos === pos[3]){
    return '슈팅가드'

  }else if (targetPos === pos[4]){
    return '포인트가드'

  }
}

export {posToKor}