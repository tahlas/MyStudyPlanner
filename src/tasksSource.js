import { TASKS_URL } from "./apiConfig";


function responseACB(response) {
    if(response.status === 401){
        throw  {
            status:401,
        }; // TODO refresh token so that this doesnt happen so often!!
    }

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

        function addTasklistIdToTaskACB(task) {
            return {
                ...task,
                tasklistId: list.id
            };
        }

        function addTasklistIdACB(tasks) {
            return tasks.map(addTasklistIdToTaskACB);
        }

        return fetch(
            TASKS_URL + "/lists/" + list.id + "/tasks" + "?" + new URLSearchParams(searchParams),
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(responseACB)
            .then(returnItemsACB)
            .then(addTasklistIdACB);
    }



    function getAllTasksFromListsACB(lists){
        return Promise.all(lists.map(getTaskFromListACB)); // using Promise.all to return a single promise, instead of an array of promises. Will make model code easier.

    }



    return getAllLists(token).then(getAllTasksFromListsACB);

}



export function addTask(token, taskInfo) {
    return fetch(
        TASKS_URL + "/lists/@default/tasks",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskInfo)
        }
    ).then(responseACB);
}


export function completeTask(token, tasklistId, taskId) {
    return fetch(
        TASKS_URL + "/lists/" + tasklistId + "/tasks/" + taskId,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "completed" })
        }
    ).then(responseACB);
}