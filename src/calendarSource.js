import { CALENDAR_URL } from "./apiConfig";

export function getCalendarEvents(token, searchParams) {

    function responseACB(response) {
        if (response.status !== 200)
            throw new Error("non-200 http response");
        return response.json();
    }

    function returnItemsACB(data) {
         console.log("Calendar API returned data:", data.items); // for debugging
        return data.items || [];
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