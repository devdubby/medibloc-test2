export const validator = (type, value) => {
  switch (type) {
    case "email":
      let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return { isValidEmail: value.match(regExp) };
    case "name":
      return { isValidName: value !== "" && value.length >= 2 };
    case "phoneNumber":
      return { isValidPhoneNumber: value !== "" && value.length >= 11 && value.indexOf("-") === -1 };
    case "address":
      return { isValidAddress: value !== "" };
    default:
      break;
  }
}

export const myAlert = (error) => {
  const { data: { message }, status, statusText } = error.response;
  return alert(message || `${status} ${statusText}`);
};