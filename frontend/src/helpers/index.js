export const validator = (type, value) => {
  switch (type) {
    case "email":
      let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if(value.match(regExp)) {
        return { isValidEmail: true };
      } else {
        return { isValidEmail: false };
      }
    case "name":
      if(value !== "" && value.length >= 2) {
        return { isValidName: true };
      } else return { isValidName: false };
    case "phoneNumber":
      if(value !== "" && value.length >= 11 && value.indexOf("-") === -1) {
        return { isValidPhoneNumber: true };
      } else return { isValidPhoneNumber: false };
    case "address":
      if(value !== "") {
        return { isValidAddress: true };
      } else return { isValidAddress: false };
    default:
      break;
  }
}