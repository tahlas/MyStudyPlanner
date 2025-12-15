import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";
import { logout } from "../authModel.js";


const Overview = observer(function OverviewRender(props) {

    useEffect(() => {
        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.accessToken,props.model.user]);

    useEffect(() => {
        if (props.model.currentTasksPromiseState.error && props.model.currentTasksPromiseState.error.status === 401) {
            logout(props.model).then(() => window.location.hash = "#/login");
        }
    },[props.model.currentTasksPromiseState.error]);


    const state = props.model.currentTasksPromiseState;

    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} newTask = {handleNewTaskACB} />;
    }

    // Temporary loading state
    return <div style={{ color: "red", padding: "20px" }}>Loading</div>;


    function handleNewTaskACB(taskInfo){
        console.log("handleNewTASKACB called + ", taskInfo);
    }
});

export { Overview };
