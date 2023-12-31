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

export default DateParse
