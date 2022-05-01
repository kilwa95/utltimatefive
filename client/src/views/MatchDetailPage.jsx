import React, { useEffect, useContext } from "react";
import NavMenu from "../components/NavMenu";
import { useLocation } from "react-router-dom";
import { Container, Box, Button, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import matchesHttp from "../http/matchHttp";
import { SecurityContext } from "../contexts/SecurityContext";
import { Redirect } from "react-router-dom";

const MatchDetailPage = (props) => {
  let location = useLocation();
  const [ match, setMatch ] = React.useState({});
  const [ organizer, setOrganizer ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isPlayerJoined, setIsPlayerJoined ] = React.useState(false);
  const { token, user } = useContext(SecurityContext);

  const getMatch = async (mid) => {
    const match = await matchesHttp.getMatchByMatchId(mid);
    setMatch(match.data);
    setOrganizer(match.data.organizer);
  };

  const joinMatch = async (mid) => {
    const match = await matchesHttp.joinMatch(mid);
    setIsPlayerJoined(true);
  };

  useEffect(() => {
    const matchId = props.match.params.id;
    getMatch(matchId);
  }, []);

  useEffect(
    () => {
      if (match.players?.map((player) => player.id).includes(user?.id)) {
        setIsPlayerJoined(true);
      }
    },
    [ match ]
  );

  return (
    <React.Fragment>
      <NavMenu />
      <Container sx={{ marginTop: "80px" }}>
        <Box style={{ display: "flex", width: "100%", height: "320px" }}>
          <Box style={{ marginRight: "40px", width: "700px" }}>
            <img
              height="320"
              style={{ width: "100%" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZ1klR_m15J8tEyHPLeVJLpV1VziaTf7RGw&usqp=CAU"
            />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "350px",
              background: "rgb(255, 255, 255)",
              borderRadius: "0.4rem",
              boxShadow:
                "rgb(26 26 26 / 8%) 0px -1px 4px 0px, rgb(26 26 26 / 12%) 0px 4px 8px 0px"
            }}
          >
            <Box
              style={{
                display: "flex",

                alignItems: "center",
                padding: "24px 0px",
                margin: "0px 16px",
                width: "100%"
              }}
            >
              <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "16px" }}>
                N
              </Avatar>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>
                  {organizer.firstName} {organizer.lastName}
                </Typography>
                <Typography>{organizer.email}</Typography>
              </Box>
            </Box>
            <Box
              style={{
                padding: "24px 0px",
                margin: "0px 16px"
              }}
            >
              <Button
                sx={{ width: "100%", marginBottom: "8px" }}
                variant="outlined"
              >
                Contacter
              </Button>
              {isPlayerJoined ? (
                <Button
                  color="error"
                  sx={{ width: "100%" }}
                  variant="outlined"
                >
                  vous avez déjà rejoint le jeu
                </Button>
              ) : token && user.isPlayer ? (
                <Button
                  onClick={() => joinMatch(match.id)}
                  color="success"
                  sx={{ width: "100%" }}
                  variant="contained"
                >
                  rejoindre cette matche
                </Button>
              ) : (
                <Button
                  disabled
                  color="success"
                  sx={{ width: "100%" }}
                  variant="contained"
                >
                  rejoindre cette matche
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ marginTop: "80px" }}>
          <Typography variant="h4">Description</Typography>
          <hr />
          <Typography variant="h5">salle: {match.salle}</Typography>
          <hr />
          <Typography variant="h5">niveux: debutant</Typography>
          <hr />
          <Typography variant="h5">prix: {match.price}€</Typography>
          <hr />
          <Typography variant="h5">place disponible: {match.square}</Typography>
          <hr />
          <Typography variant="h4">players</Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MatchDetailPage;
