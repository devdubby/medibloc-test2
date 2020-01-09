export const emailValidator = email => {
  let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if(email.match(regExp)) {
    return { isValidEmail: true };
  } else {
    return { isValidEmail: false };
  }
};

export const nameValidator = name => {
  if(name !== "" && name.length >= 2) {
    return { isValidName: true };
  } else return { isValidName: false };
};

export const phoneNumberValidator = number => {
  if(number !== "" && number.length >= 11 && number.indexOf("-") === -1) {
    return { isValidPhoneNumber: true };
  } else return { isValidPhoneNumber: false };
};

export const addressValidator = address => {
  if(address !== "") {
    return { isValidAddress: true };
  } else return { isValidAddress: false };
};