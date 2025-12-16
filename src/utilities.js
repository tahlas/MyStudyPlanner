Date.prototype.getEuropeanWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0); // reset time

  // Start of the year
  var yearStart = new Date(date.getFullYear(), 0, 1);

  // Get day of week for Jan 1, convert Sunday=0..Saturday=6 to Monday=0..Sunday=6
  var dayOfWeek = (yearStart.getDay() + 6) % 7;

  // Calculate difference in days from Jan 1
  var dayDiff = Math.floor((date - yearStart) / 86400000);

  // Calculate week number, starting from 1
  return Math.floor((dayDiff + dayOfWeek) / 7) + 1;
}


export function googleDateFormat(date, time) {
  if (!date) {
    return null;
  }
  if (!time || time === "") {
    return date + "T00:00:00Z";
  }
  return date + "T" + time + ":00Z";
}

