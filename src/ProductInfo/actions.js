const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const changeDate = (date) => {
   let curDate = new Date(date)

   return `${curDate.getDay()} ${months[curDate.getMonth()]}`
}