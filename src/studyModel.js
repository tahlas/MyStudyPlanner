import { logout } from "./authModel";
import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";
import { getAllCourseTasks, addTask, completeTask } from "./tasksSource";
import { getCourseNames, googleDateFormat } from "./utilities.js";

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
    getCalendarPromiseState: {},
    currentTasksPromiseState: {},

    playingStatus: false,
    defaultPomodoroSessionTimeInSeconds: DEFAULT_POMODORO_TIME,
    timeLeftInSeconds: DEFAULT_POMODORO_TIME,
    defaultBreakTimeInSeconds: DEFAULT_BREAK_TIME,
    timerIntervalId: null, //unique id of the interval timer to identify it later for clearing it
    isBreak: false,

    selectedTask: null,
    taskTimeTracking: {},

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
        this.getCalendarPromiseState = {};
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
        resolvePromise(prms, this.getCalendarPromiseState);
    },
    getTasks() {
        if (!this.accessToken) return;

        const searchParams = {
            showCompleted: false,
            maxResults: 250,
        };
        const prms = getAllCourseTasks(this.accessToken,this.courses, searchParams).then(
            (tasks) => {
                this.tasks = tasks;
                return tasks;
            },
        );

        resolvePromise(prms, this.currentTasksPromiseState);
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
            this.taskTimeTracking[this.selectedTask.id] =
                (this.taskTimeTracking[this.selectedTask.id] || 0) + seconds;
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
                const newTime =
                    this.timeLeftInSeconds - timeToDecreaseWithInSeconds;

                if (!this.isBreak && this.selectedTask) {
                    this.addTimeToSelectedTask(timeToDecreaseWithInSeconds);
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
        ).then(() => getAllCourseTasks(this.accessToken, this.courses,{ showCompleted: false }));

        resolvePromise(prms, this.currentTasksPromiseState);
    },

    markTaskAsCompleted(task) {
        if (!this.accessToken) return;

        const prms = completeTask(this.accessToken, task.listId, task.id).then(
            () => getAllCourseTasks(this.accessToken, this.courses,{ showCompleted: false }),
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
