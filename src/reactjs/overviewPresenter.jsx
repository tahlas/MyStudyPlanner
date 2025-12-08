import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";

const Overview = observer(function OverviewRender(props) {

    
   useEffect(() => {
        if (props.model.ready && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.ready, props.model.currentTasksPromiseState.promise]);
    
    const state = props.model.currentTasksPromiseState;
    
    useEffect(() => {
        if (state.error) {
            window.location.hash = "#/login";
            // return <div style={{ color: "red" }}>Error: {state.error.message}</div>;
        }
          
    }, [state.error]);
  
    
    
    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} />;
    }
    
    // Temporary loading state
    return <div style={{ color: "red" }}>Loading...</div>;
});

export { Overview };
