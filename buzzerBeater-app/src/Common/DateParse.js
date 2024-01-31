/**
 * 
 * @param {Date} target 
 * @returns 
 */
function DateParse(target) {
  const targetDate = new Date(target);

  // 월, 일, 시간 정보만 가져오기
  const month = targetDate.toLocaleString('ko-KR', { month: 'numeric' });
  const day = targetDate.toLocaleString('ko-KR', { day: 'numeric' });
  const time = targetDate.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: false });

  const koreanTimeString = `${month}${day} ${time}`;
  return koreanTimeString;
}

/**
 * 
 * @param {Date} target 
 * @returns 
 */
function TimeParse(target) {
  const targetDate = new Date(target);

  const twoHoursLater = new Date(targetDate.getTime() + 2 * 60 * 60 * 1000); // 2시간 후의 시간

  

  const startTime = targetDate.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: false });
  const endTime = twoHoursLater.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: false });

  const koreanTimeString = `${startTime}~${endTime}`;
  return koreanTimeString;
}

export {DateParse, TimeParse}
