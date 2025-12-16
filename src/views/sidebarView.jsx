import { Typography, Button, Stack } from "@mui/material";

export function SidebarView(props) {
    return (
        <div style={{
            width: "250px",
            backgroundColor: "#1a1d24",
            height: "100vh",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <Typography variant="h5" color="white" style={{ marginBottom: "20px" }}>
                My Study Planner
            </Typography>
            
            <Stack spacing={2}>
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => window.location.hash = "#/overview"}
                >
                    Overview
                </Button>
                
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => window.location.hash = "#/timer"}
                >
                    Timer
                </Button>
                
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => window.location.hash = "#/calendar"}
                >
                    Calendar
                </Button>
                
                <Button 
                    variant="outlined" 
                    color="error"
                    fullWidth
                    onClick={props.onLogout}
                    style={{ marginTop: "auto" }}
                >
                    Logout
                </Button>
            </Stack>
        </div>
    );
}