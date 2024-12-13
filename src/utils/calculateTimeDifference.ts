const calculateTimeDifference = (sentAt: string | number | Date) => {
  const sentTime = new Date(sentAt).getTime();
  const currentTime = new Date().getTime();
  const differenceInMs = currentTime - sentTime;
  const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
  const differenceInDays = Math.floor(differenceInHours / 24);

  if (differenceInDays > 0) {
    return `${differenceInDays}일 전`;
  } else if (differenceInHours === 0) {
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
    return `${differenceInMinutes}분 전`;
  } else {
    return `${differenceInHours}시간 전`;
  }
};

export default calculateTimeDifference;
