import { CALENDAR_URL } from "./apiConfig";

function responseACB(response) {
    if(response.status === 401){
        throw  {
            status:401,
        };
    }

    if (response.status === 204) {
        return {};
    }

    if (response.status !== 200)
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
            const eventType = event.extendedProperties?.private?.eventType || null;

            return {
                ...event,
                color: courseColor,
                courseName: courseName,
                eventType: eventType,
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

export function deleteCalendarEvent(token, eventId, searchParams) {
    return fetch(
        CALENDAR_URL + "/primary/events/" + eventId + "?" + new URLSearchParams(searchParams),
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(responseACB);
}