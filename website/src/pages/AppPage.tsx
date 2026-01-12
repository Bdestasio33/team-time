import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export function AppPage() {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome, {user?.name}!
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You're logged in to Team Time. This is where the app functionality
            will live.
          </Typography>

          <Box sx={{ p: 3, bgcolor: "grey.100", borderRadius: 1, mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Your Info
            </Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>Team ID: {user?.teamId}</Typography>
          </Box>

          <Button variant="outlined" onClick={logout}>
            Sign Out
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
