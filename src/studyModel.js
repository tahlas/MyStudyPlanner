import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";

export const model = {

    userInfo: {},
    tasks: [],
    userInfo: {},
    tasks: [],
    events: [],
    accessToken: null,
    getCalendarPromiseState: {},
    currentTasksPromiseState: {},
    playingStatus: false,
    defaultPomodoroSessionTimeInSeconds: 60 * 25,
    timeLeftInSeconds: 60 * 25,

    setUserInfo(user)  {
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL  = user.photoURL;
        this.token = user.token;
    },

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    },


    clearUserInfo() { },



    getFutureEvents() {

        const searchParams = {
            timeMin: new Date().toISOString(),
            orderBy: 'startTime',
            singleEvents: true,
            maxResults: 250
        };

        const prms = getCalendarEvents(this.accessToken, searchParams);

        resolvePromise(prms, this.getCalendarPromiseState);

       

    },
    setTimeLeftInSeconds(seconds) {
        this.timeLeftInSeconds = seconds;
    },
}

//remove later this is for debugging
window.model = model;

    
