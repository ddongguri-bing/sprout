const validifyPw = (pw: string): boolean => {
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  return passwordRegExp.test(pw);
};

export { validifyPw };
