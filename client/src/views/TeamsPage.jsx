import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import NavMenu from "../components/NavMenu";
import teamsHttp from "../http/teamsHttp";
import Team from "../components/Team";
import { Div } from "../style/styled";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const filterTeams = (teams, query) => {
  if (!query) {
    return teams;
  }
  return teams.filter((team) => {
    const teamName = team.name.toLowerCase();
    return teamName.includes(query);
  });
};

const TeamsPage = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [ teams, setTeams ] = useState([]);
  const [ teamsPlayers, setTeamsPlayers ] = useState([]);
  const [ playerAction, setPlayerAction ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState(query || "");
  const filteredTeams = filterTeams(teams, searchQuery);

  const getListTeams = async () => {
    setIsLoading(true);
    const data = await teamsHttp.getListTeams();
    setTeams(data);
    setIsLoading(false);
  };

  const getListTeamsByUserId = async () => {
    setIsLoading(true);
    const reponse = await teamsHttp.getListTeamByPlayerId();
    setTeamsPlayers(reponse.data);
    setIsLoading(false);
  };

  useEffect(
    () => {
      getListTeams();
      getListTeamsByUserId();
    },
    [ playerAction ]
  );

  return (
    <React.Fragment>
      <NavMenu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Box
          style={{ width: "100%", height: "100vh" }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Container>
          <Div direction="row" wrap="wrap" top="80px" width="100%">
            {filteredTeams.map((team) => (
              <Team
                setPlayerAction={setPlayerAction}
                teams={teamsPlayers}
                key={team.id}
                isLoading={isLoading}
                team={team}
              />
            ))}
          </Div>
        </Container>
      )}
    </React.Fragment>
  );
};

export default TeamsPage;
