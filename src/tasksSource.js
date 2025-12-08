import { TASKS_URL } from "./apiConfig";


function responseACB(response) {
    if (response.status !== 200)
        throw new Error("non-200 http response");
    return response.json();
}

function returnItemsACB(data) {
    return data.items || [];
}


export function getAllLists(token) {


    return fetch(
        TASKS_URL + "/users/@me/lists",
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    ).then(responseACB).then(returnItemsACB);
}


export function getAllTasks(token, searchParams) {

    function getTaskFromListACB(list) {
        return fetch(
            TASKS_URL + "/lists/" + list.id + "/tasks" + "?" + new URLSearchParams(searchParams),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(responseACB).then(returnItemsACB);

    }

    function getAllTasksFromListsACB(lists){
       return lists.map(getTaskFromListACB);

    }

    return getAllLists(token).then(getAllTasksFromListsACB);

}
