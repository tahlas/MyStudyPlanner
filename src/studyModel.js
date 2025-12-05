import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";

export const model = {

    userInfo: {},
    tasks: [],
    events: [],
    accessToken: null,
    calendarFetchPromiseState: {},



    setUserInfo(user) {
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL = user.photoURL;
        this.token = user.token;
    },

    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    },


    clearUserInfo() { },



    getFutureEvents() {

        console.log('Sending token:', this.accessToken);


        const searchParams = {
            timeMin: new Date().toISOString(),
            orderBy: 'startTime',
            singleEvents: true,
            maxResults: 250
        };

        const promise = getCalendarEvents(this.accessToken, searchParams)
            .then(events => {
                this.events = events;
                console.log('Events fetched:', toJS(this.events));
            });

        resolvePromise(promise, this.calendarFetchPromiseState);

       

    }
}

//remove later this is for debugging
window.model = model;


