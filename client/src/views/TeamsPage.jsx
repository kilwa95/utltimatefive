import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import NavMenu from "../components/NavMenu";
import teamsHttp from "../http/teamsHttp";
import Team from "../components/Team";
import { Div } from "../style/styled";

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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState(query || "");
  const filteredTeams = filterTeams(teams, searchQuery);

  const getListTeams = async () => {
    setIsLoading(true);
    const data = await teamsHttp.getListTeams();
    setTeams(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getListTeams();
  }, []);

  return (
    <React.Fragment>
      <NavMenu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container>
        <Div direction="row" wrap="wrap" top="80px" width="100%">
          {filteredTeams.map((team) => (
            <Team key={team.id} isLoading={isLoading} team={team} />
          ))}
        </Div>
      </Container>
    </React.Fragment>
  );
};

export default TeamsPage;
