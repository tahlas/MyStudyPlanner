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


export function googleDateFormat(date) {
  if (!date) {
    return null;
  }
    return date + "T00:00:00Z";
}



export function getCourseNames(courses){
  return courses.map(c => c.name);
}

export function getCourseColor(coursesName){
  const course = this.courses.find(c => c.name === coursesName);
  const defaultColor = "#5c5252ff"
  return course ? course.color : null;
}

//   export function numberOfTasksPerList(taskData){
//
//     const everyList = taskData.map((task) => task.listTitle); //gets every list, can include duplicates.
//     let lists = everyList.filter((list, index) => everyList.indexOf(list) === index); // remove the duplicates.
//     lists = lists.map((listTitle) => {
//       return { listTitle: listTitle, taskCount: taskData.filter((task) => task.listTitle === listTitle).length };
//     });
//
//     return lists;
// }


export function numberOfTasksPerCourse(taskData) {
  const everyList = taskData.map((task) => task.listTitle); //gets every course, can include duplicates.
  let lists = everyList.filter((list, index) => everyList.indexOf(list) === index); // remove the duplicates.
  lists = lists.map((listTitle) => {
    const task = taskData.find((task) => task.listTitle === listTitle); // find a task with this listTitle to get color.
    return {
      label: listTitle,
      value: taskData.filter((task) => task.listTitle === listTitle).length,  // count tasks with this listTitle.
      color: task.color
    };
  });

  return lists;
}
