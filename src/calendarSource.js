import { CALENDAR_URL } from "./apiConfig";
import { getCourseNames } from "./utilities.js";

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

export function getCourseEvents(token, courses, searchParams) {

    function filterAndAddColorToEventsACB(events) {

        function filterEventACB(event) {
            if (!event.summary) return null;

            const course = courses.find(function(course) {
                return event.summary.includes(course.name);
            });

            if (!course) return null;

            const courseColor = course.color || null;
            const courseName = course.name || null;

            return {
                ...event,
                color: courseColor,
                courseName: courseName
            };
        }

        return events.map(filterEventACB).filter(function(event) {
            return event !== null;
        });
    }

    return getCalendarEvents(token, searchParams)
        .then(filterAndAddColorToEventsACB);
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