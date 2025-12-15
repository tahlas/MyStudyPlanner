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


    setAccessToken(accessToken) {
        this.accessToken = accessToken;
        this.isTokenFromLogin = true;
    },

    clearData(){
        this.isTokenFromLogin = false;
        this.ready = false;
        this.tasks = [];
        this.events = [];
        this.getCalendarPromiseState = {};
        this.currentTasksPromiseState = {};
        this.playingStatus = false;
        this.defaultPomodoroSessionTimeInSeconds = 60 * 25;
        this.timeLeftInSeconds = 60 * 25;
    },

    setUser(user) {
        this.clearData();
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

    setTimeLeftInSeconds(seconds) {
        this.timeLeftInSeconds = seconds;
    },
};

// Remove later this is for debugging
window.model = model;