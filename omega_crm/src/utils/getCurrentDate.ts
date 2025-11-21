export default function getCurrentDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (year + "-" + prefixNum(month) + "-" + prefixNum(day));
}

export function prefixNum(num: number) {
  return num < 10 ? "0" + num.toString() : num.toString();
}