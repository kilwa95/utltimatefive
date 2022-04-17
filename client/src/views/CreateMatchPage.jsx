import React, { useState, useContext, useEffect } from "react";
import levelHttp from "../http/levelHttp";
import matchHttp from "../http/matchHttp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { OrganizerContext } from "../contexts/OrganizerContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NavMenu from "../components/NavMenu";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const theme = createTheme();

const CreateMatchPage = () => {
  const [ levels, setLevels ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ image, setImage ] = useState(null);
  const [ values, setValues ] = useState({
    ville: "",
    salle: "",
    image: "",
    levelId: ""
  });

  const _onSubmit = (event) => {
    event.preventDefault();
    saveMatch({ ...values, image: image });
  };

  const getLevels = async () => {
    setLoading(true);
    try {
      const levels = await levelHttp.getListLevels();
      setLevels(levels);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const saveMatch = async (data) => {
    setLoading(true);
    try {
      const match = await matchHttp.saveMatche(data);
      setLoading(false);
      return match;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavMenu />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography component="h1" variant="h5">
            add new match
          </Typography>
          <Box component="form" noValidate onSubmit={_onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  autoComplete="given-name"
                  name="ville"
                  required
                  fullWidth
                  id="ville"
                  label="ville"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="salle"
                  label="salle"
                  name="salle"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))}
                  fullWidth
                  name="file"
                  type="file"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">level</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.level}
                    label="Age"
                    name="levelId"
                    onChange={handleChange}
                  >
                    {levels.map((level) => {
                      return (
                        <MenuItem key={level.id} value={level.id}>
                          {level.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateMatchPage;