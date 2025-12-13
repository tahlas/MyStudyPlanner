import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, googleAuthProvider} from "/src/firebaseModel.js";

const Overview = observer(function OverviewRender(props) {

    useEffect(() => {

        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            console.log("Calling getTasks()");
            props.model.getTasks();
        }
    }, [props.model.accessToken]);

    const state = props.model.currentTasksPromiseState;


    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} />;
    }

    // Temporary loading state
    return <div style={{ color: "red" }}>Loading...</div>;
});

export { Overview };
