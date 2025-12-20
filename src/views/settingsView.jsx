import "/src/style.css";
import { Typography, Divider, Button } from "@mui/material";

export function SettingsView(props) {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {accountInfo(props.user, props.onLogout)}
            {boxWithCourses(props.courses)}
        </div>
    );
}

function accountInfo(user, onLogout) {
    return (
        <div className="settingsBoxes">
            <Typography
                variant="h4"
                color="white"
                paddingLeft="15px"
                paddingTop="10px"
                paddingBottom="10px"
                fontWeight="bold"
            >
                Account
            </Typography>
            <Divider sx={{ backgroundColor: "white" }} variant="middle" />
            <img
                src={user.photoURL}
                alt="User Profile"
                style={{ borderRadius: "50%", margin: "15px" }}
            />
            <Typography
                variant="h6"
                color="white"
                paddingLeft="15px"
                paddingBottom="10px"
            >
                {user.displayName}
            </Typography>
            <Typography
                variant="h6"
                color="white"
                paddingLeft="15px"
                paddingBottom="15px"
            >
                {user.email}
            </Typography>
            <Button
                variant="outlined"
                onClick={onLogout}
                style={{ marginLeft: "15px" }}
            >
                Sign Out
            </Button>
        </div>
    );
}

function boxWithCourses(courses) {
    return (
        <div className="settingsBoxes">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography
                    variant="h4"
                    color="white"
                    paddingLeft="15px"
                    paddingTop="10px"
                    paddingBottom="10px"
                    fontWeight="bold"
                >
                    Courses
                </Typography>
                {/* TODO: Add Course on click! */}
                <Button onClick={() => console.log("TODO")} style={{ marginLeft: "auto", marginRight: "10px" }}>
                    Add Course
                </Button>
            </div>

            {courses.map(renderCourseItemCB)}
        </div>
    );
}

function renderCourseItemCB(course) {
    return (
        <div key={course.name}>
            <Divider sx={{ backgroundColor: "white" }} variant="middle" />
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "15px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }}
            >
                <div
                    style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: course.color,
                        marginRight: "10px",
                    }}
                />
                <Typography variant="h6" color="white">
                    {course.name}
                </Typography>
                {/* TOOD UPDATE COURSE */}
                <Button
                    onClick={() => console.log("TODO")}
                    sx={{ marginLeft: "auto", marginRight: "10px" }}
                >
                    Edit
                </Button>
            </div>
        </div>
    );
}
