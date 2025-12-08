import { CALENDAR_URL } from "./apiConfig";

export function getCalendarEvents(token, searchParams) {

    function responseACB(response) {
        if(response.status === 401){
            throw new Error("unauthorized token"); // TODO refresh token so that this doesnt happen so often!!
        }
        if (response.status !== 200)
            throw new Error("non-200 http response");
        return response.json();
    }

    function returnItemsACB(data) { 
    }

    return fetch(
        CALENDAR_URL + "/primary/events" + "?" + new URLSearchParams(searchParams),
        {
            headers: {
                 "Authorization": `Bearer ${token}`
            }
        }
    ).then(responseACB).then(returnItemsACB);
}