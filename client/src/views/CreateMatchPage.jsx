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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CreateMatchPage = () => {
  return (
    <React.Fragment>
      <NavMenu />
      <Container component="main" sx={{ marginTop: "80px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ville</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField label="ville" variant="outlined" name="ville" />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Salle</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField label="salle" variant="outlined" name="salle" />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>image</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TextField label="salle" variant="outlined" name="salle" />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </React.Fragment>
  );
};

export default CreateMatchPage;
