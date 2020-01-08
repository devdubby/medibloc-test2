export const emailValidator = email => {
  let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return email.match(regExp);
};

export const nameValidator = name => {
  if(name !== "" && name.length >= 2) return true;
  else return false;
};

export const numberValidator = number => {
  if(number !== "" && number.length >= 11 && number.indexOf("-") === -1) return true;
  else return false;
};

export const addressValidator = address => {
  if(address !== "") return true;
  else return false;
};