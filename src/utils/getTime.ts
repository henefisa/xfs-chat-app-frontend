const getTime = (stringTime: string) => {
  const date = new Date(stringTime);
  let minutes = String(date.getMinutes());
  if (minutes.length == 1) minutes = '0' + minutes;
  return `${date.getHours()}:${minutes}`;
};

export default getTime;
