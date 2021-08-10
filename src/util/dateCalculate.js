export const dateCalculate = (date) => {
  const cur_date = new Date();
  const time_val = cur_date.getTime() - Date.parse(date);
  const min = 60000;
  const hour = 3600000;
  const day = 86400000;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (time_val < min) return '방금 전';
  else if (time_val < hour) return Math.round(time_val / min) + '분 전';
  else if (time_val < day) return Math.round(time_val / hour) + '시간 전';
  else if (time_val < week) return Math.round(time_val / day) + '일 전';
  else if (time_val < month) return Math.round(time_val / week) + '주 전';
  else if (time_val < year) return Math.round(time_val / month) + '개월 전';
  else return Math.round(time_val / year) + '년 전';
};

export const getDate = (isoDate) => {
  const createdDate = isoDate.split(/-|T/);
  const year = createdDate[0];
  const month = parseInt(createdDate[1]).toString();
  const date = parseInt(createdDate[2]).toString();
  const time = createdDate[3].split(':');
  const hour = time[0];
  const min = time[1];

  return `${year}년 ${month}월 ${date}일  ${hour}:${min}`;
};
