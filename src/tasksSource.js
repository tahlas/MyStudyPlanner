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
                listId: list.id,
              listTitle: list.title
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

export function createNewList(token, listTitle) {
    return fetch(
        TASKS_URL + "/users/@me/lists",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: listTitle })
        }
    ).then(responseACB);
}


export async function addTask(token, taskInfo, listTitle, currentTasks) {
    let listId;

    const tasks = currentTasks || [];


    function findListByTitleACB(list) {
        return list.title === listTitle;
    }

    const existingList = tasks.find(findListByTitleACB);


    if (existingList) {
        listId = existingList.id;
    } else {
        const newList = await createNewList(token, listTitle);
        listId = newList.id;
    }

    return fetch(
        TASKS_URL + "/lists/" + listId + "/tasks",
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