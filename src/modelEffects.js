import { useEffect } from "react";
import {logout} from "./authModel.js";

export function use401Redirect(model) {
    useEffect(() => {
        const taskError = model.currentTasksPromiseState.error;
        const calendarError = model.currentCalendarEventsPromiseState.error;

        if (
            (taskError && taskError.status === 401) ||
            (calendarError && calendarError.status === 401)
        ) {
            logout(model).then(() => {
                window.location.hash = "#/login";
            });
        }
    }, [
        model.currentTasksPromiseState.error,
        model.currentCalendarEventsPromiseState.error,
    ]);
}
export function useFetchTasks(model) {
    useEffect(() => {
        if (
            model.user &&
            model.accessToken &&
            model.ready &&
            !model.currentTasksPromiseState.promise
        ) {
            model.getTasks();
        }
    }, [model.user, model.accessToken, model.ready]);
}

export function useFetchCalendarEvents(model) {
    useEffect(() => {
        if (
            model.accessToken &&
            !model.currentCalendarEventsPromiseState.promise
        ) {
            model.getCalendarEvents();
        }
    }, [model.accessToken]);
}
