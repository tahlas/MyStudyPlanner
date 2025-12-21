import { logout } from "./authModel";
import {
    addCalendarEvent,
    getCalendarEvents,
    getCourseEvents,
} from "./calendarSource";
import { resolvePromise } from "./resolvePromise";
import {
    getAllCourseTasks,
    addTask,
    completeTask,
    updateTaskListName,
} from "./tasksSource";
import {
    calculateEndTime,
    formatDateTime,
    getCourseNames,
    googleDateFormat,
    mapRepeatToRRule,
} from "./utilities.js";

const DEFAULT_POMODORO_TIME = 60 * 25;
const DEFAULT_BREAK_TIME = 60 * 5;

export const model = {
    user: undefined,
    accessToken: null,
    isTokenFromLogin: false,
    ready: false,
    tasks: [],
    events: [],
    courses: [],
    currentCalendarEventsPromiseState: {},
    currentTasksPromiseState: {},
    playingStatus: false,
    defaultPomodoroSessionTimeInSeconds: DEFAULT_POMODORO_TIME,
    timeLeftInSeconds: DEFAULT_POMODORO_TIME,
    defaultBreakTimeInSeconds: DEFAULT_BREAK_TIME,
    timerIntervalId: null, //unique id of the interval timer to identify it later for clearing it
    isBreak: false,

    selectedTask: null,
    taskTimeTracking: {},
    taskTimeByDate: {},

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        this.isTokenFromLogin = true;
        this.ready = true;
    },

    clearData() {
        this.ready = false;
        this.isTokenFromLogin = false;
        this.tasks = [];
        this.events = [];
        this.currentCalendarEventsPromiseState = {};
        this.currentTasksPromiseState = {};
        this.playingStatus = false;
        this.defaultPomodoroSessionTimeInSeconds = DEFAULT_POMODORO_TIME;
        this.timeLeftInSeconds = DEFAULT_POMODORO_TIME;
        this.defaultBreakTimeInSeconds = DEFAULT_BREAK_TIME;
        if (this.timerIntervalId) {
            clearInterval(this.timerIntervalId);
            this.timerIntervalId = null;
        }
        this.isBreak = false;

        this.selectedTask = null;
        this.taskTimeTracking = {};
        this.taskTimeByDate = {};
    },

    setUser(user) {
        this.user = user;
    },

    getFutureEvents() {
        if (!this.accessToken) return;

        const searchParams = {
            timeMin: new Date().toISOString(),
            orderBy: "startTime",
            singleEvents: true,
            maxResults: 250,
        };
        const prms = getCalendarEvents(this.accessToken, searchParams);
        resolvePromise(prms, this.currentCalendarEventsPromiseState);
    },
    getTasks() {
        if (!this.accessToken) return;

        const searchParams = {
            showCompleted: false,
            maxResults: 250,
        };
        const prms = getAllCourseTasks(
            this.accessToken,
            this.courses,
            searchParams,
        );

        resolvePromise(prms, this.currentTasksPromiseState);
    },

    getCalendarEvents() {
        if (!this.accessToken) return;

        const searchParams = {
            maxResults: 250,
            singleEvents: true,
            orderBy: "startTime",
        };

        const prms = getCourseEvents(
            this.accessToken,
            this.courses,
            searchParams,
        );

        resolvePromise(prms, this.currentCalendarEventsPromiseState);
    },

    newCourse(course) {
        const courseNames = getCourseNames(this.courses);
        if (courseNames.includes(course.name)) return;

        this.courses.push(course);
    },

    selectTask(task) {
        this.selectedTask = task;
        if (!this.taskTimeTracking[task.id]) {
            this.taskTimeTracking[task.id] = 0;
        }
    },

    addTimeToSelectedTask(seconds) {
        if (this.selectedTask) {
            const taskId = this.selectedTask.id;
            //get today's date in yyyy-mm-dd format (local timezone)
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            const todayStr = `${year}-${month}-${day}`;

            //update total time spent on the task
            this.taskTimeTracking[this.selectedTask.id] =
                (this.taskTimeTracking[this.selectedTask.id] || 0) + seconds;

            //update time spent on the task for today
            if (!this.taskTimeByDate[taskId]) {
                this.taskTimeByDate[taskId] = {};
            }
            this.taskTimeByDate[taskId][todayStr] =
                (this.taskTimeByDate[taskId][todayStr] || 0) + seconds;
        }
    },

    getTaskTimeSpent(taskId) {
        return this.taskTimeTracking[taskId] || 0;
    },

    setPlayingStatus(status) {
        this.playingStatus = status;
        const timeBeforeCallingAgainInMilliseconds = 100;
        if (status) {
            this.timerIntervalId = setInterval(() => {
                const timeToDecreaseWithInSeconds = 0.1;
                const timeToIncreaseWithInSeconds = timeToDecreaseWithInSeconds;
                const newTime =
                    this.timeLeftInSeconds - timeToDecreaseWithInSeconds;

                if (!this.isBreak && this.selectedTask) {
                    this.addTimeToSelectedTask(timeToIncreaseWithInSeconds);
                }

                if (newTime <= 0) {
                    if (!this.isBreak) {
                        this.startBreak();
                    } else {
                        this.startPomodoroSession();
                    }
                } else {
                    this.setTimeLeftInSeconds(newTime);
                }
            }, timeBeforeCallingAgainInMilliseconds);
        } else {
            if (this.timerIntervalId) {
                clearInterval(this.timerIntervalId); //stops the timer with this id
                this.timerIntervalId = null;
            }
        }
    },

    setTimeLeftInSeconds(seconds) {
        this.timeLeftInSeconds = seconds;
    },

    startBreak() {
        this.isBreak = true;
        this.setTimeLeftInSeconds(this.defaultBreakTimeInSeconds);
    },

    startPomodoroSession() {
        this.isBreak = false;
        this.setPlayingStatus(false);
        this.setTimeLeftInSeconds(this.defaultPomodoroSessionTimeInSeconds);
    },

    skipTimer(){
        if (this.isBreak) {
            this.startPomodoroSession();
        } else {
            this.startBreak();
        }
    },

    saveNewTask(taskInfo) {
        if (!this.accessToken) return;

        const prms = addTask(
            this.accessToken,
            {
                title: taskInfo.title,
                notes: taskInfo.description,
                due: googleDateFormat(taskInfo.date),
            },
            taskInfo.listTitle,
        ).then(() =>
            getAllCourseTasks(this.accessToken, this.courses, {
                showCompleted: false,
            }),
        );

        resolvePromise(prms, this.currentTasksPromiseState);
    },

    saveNewEvent(eventInfo) {
        if (!this.accessToken) return;

        const eventData = {
            summary: eventInfo.course + " - " + eventInfo.eventType,
            description: eventInfo.description,
            start: formatDateTime(eventInfo.date, eventInfo.time),
            end: calculateEndTime(
                eventInfo.date,
                eventInfo.time,
                eventInfo.duration,
            ),
        };

        if (eventInfo.repeatOption) {
            eventData.recurrence = [mapRepeatToRRule(eventInfo.repeatOption)];
        }

        const prms = addCalendarEvent(this.accessToken, eventData)
            .then(() => this.getCalendarEvents());

        resolvePromise(prms, this.currentCalendarEventsPromiseState);
    },

        markTaskAsCompleted(task) {
        if (!this.accessToken) return;

        const prms = completeTask(this.accessToken, task.listId, task.id).then(
            () =>
                getAllCourseTasks(this.accessToken, this.courses, {
                    showCompleted: false,
                }),
        );

        resolvePromise(prms, this.currentTasksPromiseState);
    },

    updateCourse(oldName, newName, newColor) {
        if (!this.accessToken) return;

        const course = this.courses.find((course) => course.name === oldName);
        if (course) {
            course.name = newName;
            course.color = newColor;
        }

        const prms = updateTaskListName(
            this.accessToken,
            oldName,
            newName,
        ).then(() =>
            getAllCourseTasks(this.accessToken, this.courses, {
                showCompleted: false,
            }),
        );

        resolvePromise(prms, this.currentTasksPromiseState);
    },

    resetTimer() {
        this.setPlayingStatus(false);
        this.setTimeLeftInSeconds(this.defaultPomodoroSessionTimeInSeconds);
        this.isBreak = false;
    },

    //This function is only for testing, remove later
    testLogOut() {
        logout(this).then(() => (window.location.hash = "#/login"));
    },
};
// Remove later this is for debugging
window.model = model;
