import React, { useState, useContext, useEffect } from "react";
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
import Toast from "../components/toast";


const ProfilePlayerPage = () => {
  const [ open, setOpen ] = useState(false);
  const [ color, setColor ] = useState("");
  const [ message, setMessage ] = useState("");
  const { token, user } = useContext(SecurityContext);
  const { userCurrent, isLoading, getUserInfo, updateUser } = useContext(
    UserContext
  );

  const [ values, setValues ] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    birthday: false,
    road: false,
    city: false,
    postalcode: false,
    roles: [ "player" ]
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const _onSubmit =  async (event) => {
    event.preventDefault();
    const response = await updateUser(user.id, {
      firstName: values.firstName || userCurrent.firstName,
      lastName: values.lastName || userCurrent.lastName,
      email: values.email || userCurrent.email,
      password: values.password || userCurrent.password,
      birthday: values.birthday || userCurrent.birthday,
      road: values.road || userCurrent.address?.road,
      city: values.city || userCurrent.address?.city,
      postalcode: values.postalcode || userCurrent.address?.postalcode,
      roles: values.roles,
    });
    if (response.status === 200) {
      setMessage("Votre profil a été mis à jour");
      setColor("success");
      setOpen(true);
    } else {
      setMessage("Une erreur est survenue");
      setColor("error");
      setOpen(true);
    }
  };

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
              onSubmit={_onSubmit}
              noValidate
              sx={{
                marginTop: "16px",
                "& .MuiTextField-root": { m: 1, width: "25ch" }
              }}
            >
              <Box component="div">
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="firstName"
                  variant="outlined"
                  name="firstName"
                  defaultValue={userCurrent ? userCurrent.firstName : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="lastName"
                  variant="outlined"
                  name="lastName"
                  defaultValue={userCurrent ? userCurrent.lastName : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="email"
                  variant="outlined"
                  name="email"
                  defaultValue={userCurrent ? userCurrent.email : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  defaultValue={userCurrent ? userCurrent.password : ""}
                />
                <TextField
                  onChange={handleChange}
                  disabled
                  id="outlined-basic"
                  label="level"
                  variant="outlined"
                  name="level"
                  defaultValue={userCurrent ? userCurrent.level?.name : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="road"
                  variant="outlined"
                  name="road"
                  defaultValue={userCurrent ? userCurrent.address?.road : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="city"
                  variant="outlined"
                  name="city"
                  defaultValue={userCurrent ? userCurrent.address?.city : ""}
                />
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="postalcode"
                  variant="outlined"
                  name="postalcode"
                  defaultValue={userCurrent ? userCurrent.address?.postalcode : ""}
                />
              
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  label="birthday"
                  variant="outlined"
                  name="birthday"
                  defaultValue={userCurrent ? userCurrent.birthday : ""}
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
        <Toast message={message} color={color} open={open} setOpen={setOpen} />
      </React.Fragment>
    );
  }
};

export default ProfilePlayerPage;
