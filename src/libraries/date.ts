export const sameDay = (d1: Date, d2: Date): boolean => d1.getFullYear() === d2.getFullYear()
      && d1.getMonth() === d2.getMonth()
      && d1.getDate() === d2.getDate();


export const dateToDateString = (date: Date) => date.toLocaleDateString('nl-NL', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const timestampToDate = (timestamp: number): Date => {
  const date = new Date(timestamp * 1000);
  date.setHours(12);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};


export const dateRange = (startDate: Date, numberOfDays: number) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + numberOfDays);
  return `${dateToDateString(startDate)} - ${dateToDateString(endDate)}`;
};
