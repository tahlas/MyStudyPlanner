import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";

export const model = {

    userInfo: {},
    tasks: [],
    events: [],
    playingStatus: false,
    accessToken: null,
    calendarFetchPromiseState: {},



    setUserInfo(user) {
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL = user.photoURL;
        this.token = user.token;
    },

    clearUserInfo(){},

    getFutureEvents(){

    }
}


