import CircularProgress from "@mui/material/CircularProgress";

export function SuspenseView(props) {
    if (!props.promise) {
        // return <span>no data</span>;
        return loading();
    }
    if (props.promise && props.error) {
        return <span>{props.error.toString()}</span>;
    }
    if (props.promise && !props.data && !props.error) {
        return loading();
    }
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
