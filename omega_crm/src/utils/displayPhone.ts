function displayPhone (phone: string) {
  if (phone != null) {
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`; 
  } else {
    return phone;
  }
}

export default displayPhone;