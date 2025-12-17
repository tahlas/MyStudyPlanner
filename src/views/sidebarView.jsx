import { Typography, Button, Stack, IconButton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";

/**
 * TODO: PLACEHOLDER. CHANGE LATER.
 */
export function SidebarView(props) {
    return (
        <Stack
            sx={{
                backgroundColor: "#000000ff",
                height: "100vh",
                flexDirection: "column",
            }}
            justifyContent="space-between"
        >
            <Stack>
                <IconButton>
                    <AssignmentIcon
                        onClick={() => {
                            window.location.hash = "#/overview";
                        }}
                        sx={{ color: "white" }}
                    />
                </IconButton>

                <IconButton>
                    <TimerIcon
                        onClick={() => {
                            window.location.hash = "#/timer";
                        }}
                        sx={{ color: "white" }}
                    />
                </IconButton>

                <IconButton>
                    <CalendarMonthIcon
                        onClick={() => {
                            window.location.hash = "#/calendar";
                        }}
                        sx={{ color: "white" }}
                    />
                </IconButton>
            </Stack>

            <IconButton>
                <LogoutIcon onClick={props.onLogout} sx={{ color: "white" }} />
            </IconButton>
        </Stack>
    );
}
