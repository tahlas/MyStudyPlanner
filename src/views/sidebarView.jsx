import { IconButton, Stack } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";

export function SidebarView(props) {
    return (
        <Stack
            sx={{
                backgroundColor: "#2a2b2b",
                height: "100vh",
                flexDirection: "column"
            }}
            justifyContent="space-between"
        >
            <Stack>
                <IconButton
                    onClick={() => {
                        window.location.hash = "#/overview";
                    }}
                >
                    <AssignmentIcon sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                    onClick={() => {
                        window.location.hash = "#/timer";
                    }}
                >
                    <TimerIcon sx={{ color: "white" }} />
                </IconButton>

                <IconButton
                    onClick={() => {
                        window.location.hash = "#/calendar";
                    }}
                >
                    <CalendarMonthIcon sx={{ color: "white" }} />
                </IconButton>

                <IconButton onClick={() => {
                    window.location.hash = "#/statistics";
                }}>
                    <AnalyticsIcon sx={{ color: "white" }} />
                </IconButton>
            </Stack>

            {/* <IconButton>
                <LogoutIcon onClick={props.onLogout} sx={{ color: "white" }} />
            </IconButton> */}
            <IconButton
                onClick={() => {
                    window.location.hash = "#/settings";
                }}
            >
                <SettingsIcon sx={{ color: "white" }} />
            </IconButton>
        </Stack>
    );
}
