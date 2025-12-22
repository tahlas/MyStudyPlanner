Date.prototype.getEuropeanWeek = function () {
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
};

export function googleDateFormat(date) {
    if (!date) {
        return null;
    }
    return date + "T00:00:00Z";
}

export function getCourseNames(courses) {
    return courses.map((c) => c.name);
}

export function getCourseColor(coursesName) {
    const course = this.courses.find((c) => c.name === coursesName);
    return course ? course.color : null;
}

export function numberOfTasksPerCourse(taskData) {
    const everyList = taskData.map((task) => task.listTitle); //gets every course, can include duplicates.
    let lists = everyList.filter(
        (list, index) => everyList.indexOf(list) === index,
    ); // remove the duplicates.
    lists = lists.map((listTitle) => {
        const task = taskData.find((task) => task.listTitle === listTitle); // find a task with this listTitle to get color.
        return {
            label: listTitle,
            value: taskData.filter((task) => task.listTitle === listTitle)
                .length, // count tasks with this listTitle.
            color: task.color,
        };
    });
    return lists;
}

export function mapRepeatToRRule(repeatOption) {
    const repeatMap = {
        Daily: "RRULE:FREQ=DAILY",
        Weekly: "RRULE:FREQ=WEEKLY",
        Monthly: "RRULE:FREQ=MONTHLY",
    };

    return repeatMap[repeatOption] || "";
}

export function formatDateTime(date, time = "00:00") {
    if (!date) {
        return null;
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        dateTime: date + "T" + time + ":00",
        timeZone: timeZone,
    };
}

//this function was written by the help of a llm
export function calculateEndTime(date, time, durationMinutes) {
    if (!date || !time || !durationMinutes) {
        return null;
    }

    const startDateTime = new Date(date + "T" + time);
    startDateTime.setMinutes(
        startDateTime.getMinutes() + parseInt(durationMinutes),
    );

    const endDate = startDateTime.toISOString().split("T")[0];
    const endTime = startDateTime.toTimeString().slice(0, 5);

    return formatDateTime(endDate, endTime);
}

export function formatTime(dateTime) {
    if (!dateTime) return "";

    const date = new Date(dateTime);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return hours + ":" + minutes;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
export function isBeforeToday(date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    return date < currentDate;
}

export function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export function isTomorrow(date) {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    return (
        date.getFullYear() === tomorrowDate.getFullYear() &&
        date.getMonth() === tomorrowDate.getMonth() &&
        date.getDate() === tomorrowDate.getDate()
    );
}

export function isLaterThisWeek(date) {
    if (isBeforeToday(date) || isToday(date) || isTomorrow(date)) {
        return false;
    }
    const currentWeek = new Date().getEuropeanWeek();
    const dateWeek = date.getEuropeanWeek();
    return dateWeek === currentWeek;
}
//TODO: Will not work if the next week is in the next year.
export function isNextWeek(date) {
    if (isLaterThisWeek(date)) {
        return false;
    }
    const currentWeek = new Date().getEuropeanWeek();
    const dateWeek = date.getEuropeanWeek();
    return dateWeek === currentWeek + 1;
}

export function isAfterNextWeekAndLater(date) {
    return !(
        isBeforeToday(date) ||
        isToday(date) ||
        isTomorrow(date) ||
        isLaterThisWeek(date) ||
        isNextWeek(date)
    );
}

export function extractSummaryWithoutCourseNameAndEventType(event) {
    return event.summary.substring(event.summary.indexOf(": ") + 2);
}
