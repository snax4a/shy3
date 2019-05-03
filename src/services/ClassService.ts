import Api from '@/services/Api';

function addTime(date: Date, time: string): Date {
  const hours = parseInt(time.substring(0, 2), 10);
  const mins = parseInt(time.substring(3, 5), 10);
  date.setHours(hours, mins);
  return date;
}

function nextDateForDOW(dayOfWeek: number): Date {
  const result = new Date();
  result.setDate(result.getDate() + (dayOfWeek + 6 - result.getDay()) % 7);
  // Clear time so we can add starts and ends
  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(0);
  return result;
}

function rowToClass(row: any) {
  const yogaClass = { ...row };
  yogaClass.startTime = addTime(nextDateForDOW(row.day), row.startTime);
  yogaClass.endTime = addTime(nextDateForDOW(row.day), row.endTime);
  return yogaClass;
}

export default {
  classesGet() {
      return Api().get('/api/class');
  },
  nest(flatScheduleItems: any[]): any[] {
    const nestedScheduleItems = [];
    let currentLocation: string = '';
    let locationIndex = -1; // assume none
    let currentDay: number = 0;
    let dayIndex: number = 0;

    for (const i in flatScheduleItems) {
      const row = flatScheduleItems[i];
      if (currentLocation !== row.location) {
        locationIndex++; // zero first time through
        dayIndex = 0; // Start days over for new location
        nestedScheduleItems.push({
          location: row.location,
          locationId: row.locationId,
          days: [
            {
              day: row.day,
              date: nextDateForDOW(row.day),
              classes: [rowToClass(row)]
            }
          ]
        });
      } else {
        if (currentDay !== row.day) {
          dayIndex++;
          nestedScheduleItems[locationIndex].days.push({
            day: row.day,
            date: nextDateForDOW(row.day),
            classes: [rowToClass(row)]
          });
        } else {
          nestedScheduleItems[locationIndex].days[dayIndex].classes.push(rowToClass(row));
        }
        currentDay = row.day;
      }
      currentDay = row.day;
      currentLocation = row.location;
    }
    console.log(nestedScheduleItems);
    return nestedScheduleItems;
  },
  scheduleGet() {
    return Api().get('/api/schedule');
  }
};
