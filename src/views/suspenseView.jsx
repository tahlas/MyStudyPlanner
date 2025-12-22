import CircularProgress from "@mui/material/CircularProgress";

export function SuspenseView(props) {
    if (!props.taskPromise && !props.eventPromise) {
        return loading();
    }

    if (props.taskError) {
        return <span>{props.taskError.toString()}</span>;
    }
    if (props.eventError) {
        return <span>{props.eventError.toString()}</span>;
    }

    if ((props.taskPromise && !props.taskData && !props.taskError) ||
        (props.eventPromise && !props.eventData && !props.eventError)) {
        return loading();
    }

    return props.children || null;
}

function loading() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress size="200px" />
        </div>
    );
}