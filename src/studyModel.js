import { getCalendarEvents } from "./calendarSource";
import { resolvePromise } from "./resolvePromise";

export const model = {

    userInfo : {},
    tasks:  [],
    events: [],
    calendarFetchPromiseState: {},
  


    setUserInfo(user){
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL= user.photoURL;
        this.token = user.token;
    },

    clearUserInfo(){},



    getFutureEvents(){
        const searchParams = {
            timeMin: new Date().toISOString(), 
            orderBy: 'startTime',  
            singleEvents: true
        };

        const prms = getCalendarEvents(this.token, searchParams);
       resolvePromise()




    }
}


