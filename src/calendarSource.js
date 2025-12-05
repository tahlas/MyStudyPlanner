import { CALENDAR_URL } from "./apiConfig";

export function getCalendarEvents(token, searchParams) {

    function responseACB(response) {
        if (response.status !== 200)
            throw new Error("non-200 http response");
        return response.json();
    }

    function returnItemsACB(data) {
        return data.items || [];
    }

    return fetch(
        CALENDAR_URL + "/calendars/primary/events" + "?" + new URLSearchParams(searchParams),
        {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        }
    ).then(responseACB).then(returnItemsACB);
}