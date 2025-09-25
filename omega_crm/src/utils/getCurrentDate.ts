export default function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return (year + "-" + prefixNum(month) + "-" + prefixNum(day));
}

export function prefixNum(num: number) {
  return num < 10 ? "0" + num.toString() : num;
}