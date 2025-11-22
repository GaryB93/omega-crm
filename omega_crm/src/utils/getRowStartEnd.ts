function getRow(time: string) {
  let row;

  switch (time) {
    case "08:00:00":
      row = 5;
      break;
    case "08:30:00":
      row = 6;
      break;
    case "09:00:00":
      row = 7;
      break;
    case "09:30:00":
      row = 8;
      break;
    case "10:00:00":
      row = 9;
      break;
    case "10:30:00":
      row = 10;
      break;
    case "11:00:00":
      row = 11;
      break;
    case "11:30:00":
      row = 12;
      break;
    case "12:00:00":
      row = 13;
      break;
    case "12:30:00":
      row = 14;
      break;
    case "13:00:00":
      row = 15;
      break;
    case "13:30:00":
      row = 16;
      break;
    case "14:00:00":
      row = 17;
      break;
    case "14:30:00":
      row = 18;
      break;
    case "15:00:00":
      row = 19;
      break;
    case "15:30:00":
      row = 20;
      break;
    case "16:00:00":
      row = 21;
      break;
    case "16:30:00":
      row = 22;
      break;
    case "17:00:00":
      row = 23;
      break;
    default:
      console.log("Invalid time");
  }

  return row;
}

export default getRow;