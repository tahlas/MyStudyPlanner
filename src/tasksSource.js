import { TASKS_URL } from "./apiConfig";

export function getAllLists(token) {

    function responseACB(response) {
        if (response.status !== 200)
            throw new Error("non-200 http response");
        return response.json();
    }

    function returnItemsACB(data) {
        return data.items || [];
    }

    return fetch(
         TASKS_URL + "/users/@me/lists",
        {
            headers: {
                 "Authorization": `Bearer ${token}`
            }
        }
    ).then(responseACB).then(returnItemsACB);
}


export function getAllTasks() {
    getAllLists().then()

    functon getTasksForListACB(list) {
        return fetch(
            TASKS_URL + "/lists/" + list.id + "/tasks",
            {
                headers: {  


}
