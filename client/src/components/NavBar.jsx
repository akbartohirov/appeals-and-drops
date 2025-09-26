// src/components/NavBar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

export default function NavBar() {
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // If not authenticated, don't render navbar except for login page
  if (!auth && location.pathname !== "/login") {
    navigate("/login");
    return null;
  }

  // If on login page and authenticated, redirect to appeals
  if (auth && location.pathname === "/login") {
    navigate("/appeals");
    return null;
  }

  // Don't show navbar on login page
  if (location.pathname === "/login") {
    return null;
  }

  const isAdmin = auth?.user?.is_admin;
  const active = (path) => location.pathname === path;

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/appeals"
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexGrow: 1,
            }}
          >
            Reyestr
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/appeals"
              color={active("/appeals") ? "primary" : "inherit"}
            >
              Murojaatlar
            </Button>
            <Button
              component={Link}
              to="/drops"
              color={active("/drops") ? "primary" : "inherit"}
            >
              Drop kartalar
            </Button>
            {isAdmin && (
              <Button
                component={Link}
                to="/users"
                color={active("/users") ? "primary" : "inherit"}
              >
                Admin
              </Button>
            )}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
