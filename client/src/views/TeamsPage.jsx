import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import NavMenu from "../components/NavMenu";
import teamsHttp from "../http/teamsHttp";
import Team from "../components/Team";
import { Div } from "../style/styled";

const TeamsPage = () => {
  const [ teams, setTeams ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

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
      <NavMenu />
      <Container>
        <Div direction="row" wrap="wrap" top="80px" width="100%">
          {teams.map((team) => (
            <Team key={team.id} isLoading={isLoading} team={team} />
          ))}
        </Div>
      </Container>
    </React.Fragment>
  );
};

export default TeamsPage;
