import { logout } from "./authModel";
import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";
import { getAllTasks } from "./tasksSource";

export const model = {
    user: undefined,
    accessToken: null,
    isTokenFromLogin: false,
    ready: false,
    tasks: [],
    events: [],
    getCalendarPromiseState: {},
    currentTasksPromiseState: {},
    playingStatus: false,
    defaultPomodoroSessionTimeInSeconds: 60 * 25,
    timeLeftInSeconds: 60 * 25,
    timerIntervalId: null, //unique id of the interval timer to identify it later for clearing it

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
        this.defaultPomodoroSessionTimeInSeconds = 60 * 25;
        this.timeLeftInSeconds = 60 * 25;
        if(this.timerIntervalId){
            clearInterval(this.timerIntervalId);
            this.timerIntervalId = null;
        }
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
            showCompleted: true,
            maxResults: 250,
        };
        const prms = getAllTasks(this.accessToken, searchParams);
        resolvePromise(prms, this.currentTasksPromiseState);
    },

    setPlayingStatus(status) {
        this.playingStatus = status;
        const timeBeforeCallingAgainInMilliseconds = 100;
        if (status) {
            this.timerIntervalId = setInterval(() => {
                if (this.timeLeftInSeconds > 0) {
                    this.setTimeLeftInSeconds(this.timeLeftInSeconds - 0.1);
                } else {
                    this.setPlayingStatus(false);
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

    resetTimer() {
        this.setPlayingStatus(false);
        this.setTimeLeftInSeconds(this.defaultPomodoroSessionTimeInSeconds);
    },

    //This function is only for testing, remove later
    testLogOut() {
        logout(this).then(() => (window.location.hash = "#/login"));
    },
};
// Remove later this is for debugging
window.model = model;
