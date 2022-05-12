const phone = /\+[0-9]+[0-9]/;

export const isPhoneNumberValid = givenPhoneNumber => {
  if (typeof givenPhoneNumber === 'string' && givenPhoneNumber) {
    if (givenPhoneNumber.length < 13) {
      return false; //+ ", karena jumlah password kurang, yaitu hanya " + givenPhoneNumber.length
    } else if (!phone.test(givenPhoneNumber)) {
      return false; //+ ", karena tidak sesuai"
    } else {
      return true;
    }
  } else {
    return false; //"ERROR: Invalid Type Data"
  }
};
