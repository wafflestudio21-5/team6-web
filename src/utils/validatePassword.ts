const engCheckRegex = /[a-zA-Z]/;

const numCheckRegex = /\d/;

const specialCheckRegex = /[\W_]/;

const validatePassword = (password: string) => {
  if (password.length < 10) return false;
  const satisfyCount =
    (engCheckRegex.test(password) ? 1 : 0) +
    (numCheckRegex.test(password) ? 1 : 0) +
    (specialCheckRegex.test(password) ? 1 : 0);
  return satisfyCount >= 2;
};

export default validatePassword;
