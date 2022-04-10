import React, { useContext, useEffect } from "react";
import { SecurityContext } from "../contexts/SecurityContext";
import { UserContext } from "../contexts/UserContext";
import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import NavMenu from "../components/NavMenu";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ProfilePlayerPage = () => {
  const { token, user } = useContext(SecurityContext);
  const { userCurrent, isLoading, getUserInfo } = useContext(UserContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!token) {
    return <Redirect to="/login" />;
  }
  if (!user && !user.isPlayer) {
    return <Redirect to="/" />;
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <React.Fragment>
        <NavMenu />
        <Container maxWidth="md" sx={{ marginTop: "80px" }}>
          <Card sx={{ width: "100%", padding: "24px" }}>
            <Typography variant="h6" gutterBottom component="div">
              My account
            </Typography>
            <Box
              component="form"
              sx={{
                marginTop: "16px",
                "& .MuiTextField-root": { m: 1, width: "25ch" }
              }}
            >
              <Box component="div">
                <TextField
                  id="outlined-basic"
                  label="firstName"
                  variant="outlined"
                  defaultValue={userCurrent.firstName}
                />
                <TextField
                  id="outlined-basic"
                  label="lastName"
                  variant="outlined"
                  defaultValue={userCurrent.lastName}
                />
                <TextField
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  defaultValue={userCurrent.email}
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  defaultValue={userCurrent.password}
                />
                <TextField
                  disabled
                  id="outlined-basic"
                  label="level"
                  variant="outlined"
                  defaultValue={userCurrent.level.name}
                />
              </Box>
              <Box sx={{ marginTop: "16px" }}>
                <Button type="submit" variant="contained" color="primary">
                  update
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
};

export default ProfilePlayerPage;
