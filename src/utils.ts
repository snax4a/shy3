// utils
export default {
  amPm(date: Date): string {
    const thisDate = new Date(date); // In case it's ISO 8601
    return thisDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      .replace(':00', '')
      .replace(' ', '')
      .toLowerCase();
  },
  fullDate(date: Date): string {
    const thisDate = new Date(date);
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return thisDate.toLocaleString('en-US', options);
  },
  dayAndDate(date: Date): string {
    const thisDate = new Date(date);
    const options: any = { weekday: 'long', month: 'long', day: 'numeric' };
    return thisDate.toLocaleString('en-US', options);
  }
};
