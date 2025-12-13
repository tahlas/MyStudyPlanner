
import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";
import { getAllTasks } from "./tasksSource";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseModel.js";

export const model = {
    loggedIn: false,
    userInfo: {},
    tasks: [],
    events: [],
    accessToken: null,
    getCalendarPromiseState: {},
    currentTasksPromiseState: {},
    playingStatus: false,
    defaultPomodoroSessionTimeInSeconds: 60 * 25,
    timeLeftInSeconds: 60 * 25,

    setUserInfo(user) {
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL = user.photoURL;
        this.token = user.token;
    },

    clearUserInfo(){
        this.loggedIn = false;
        this.userInfo = {};
        this.accessToken = null;
        this.currentTasksPromiseState = {};
    },

    handleExpiredToken(){
        this.clearUserInfo();
        this.loggedIn = false;
    },

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    },



    taskPromiseStateErrorSideEffect() {

        if (this.currentTasksPromiseState.error ) { //&& this.currentTasksPromiseState.error.status === 401
            console.log("error");
            signOut(auth).then(r => console.log("signed out"));
        }
    },


    getFutureEvents() {
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
 
//remove later this is for debugging
window.model = model;
