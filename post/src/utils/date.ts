export const isToday = (date: string) => {
  const today = new Date();
  const targetDate = new Date(date);

  if (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  ) {
    return true;
  }

  return false;
};
