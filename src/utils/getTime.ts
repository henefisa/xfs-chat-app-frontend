const getTime = (stringTime: string) => {
  const date = new Date(stringTime);

  return `${date.getHours()}:${date.getMinutes()}`;
};

export default getTime;
