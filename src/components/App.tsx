import { Box, Container, Typography } from "@mui/material";

export function App() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Hello World
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to Team Time
        </Typography>
      </Box>
    </Container>
  );
}
