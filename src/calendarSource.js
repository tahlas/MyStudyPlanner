import { CALENDAR_URL } from "./apiConfig";

function responseACB(response) {
    if(response.status === 401){
        throw new Error("unauthorized token"); // TODO refresh token so that this doesnt happen so often!!
    }
    if (response.status !== 200 && response.status !== 201)
        throw new Error("non-200 http response");
    return response.json();
}

function returnItemsACB(data) {
    return data.items || [];
}

export function getCalendarEvents(token, searchParams) {
    return fetch(
        CALENDAR_URL + "/primary/events" + "?" + new URLSearchParams(searchParams),
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(responseACB).then(returnItemsACB);
}

export function addCalendarEvent(token, eventData) {
    return fetch(
        CALENDAR_URL + "/primary/events",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        }
    ).then(responseACB);
}