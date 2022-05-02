import React, { useContext, useState } from "react";
import { Div } from "../style/styled";
import { Container } from "@mui/material";
import Match from "../components/Match";
import { MatchContext } from "../contexts/MatchContext";
import NavMenu from "../components/NavMenu";

const filterMatchs = (matches, query) => {
  if (!query) {
    return matches;
  }
  return matches.filter((match) => {
    const matchName = match.salle.toLowerCase();
    return matchName.includes(query);
  });
};

const MatchesPage = () => {
  const { matches, isLoading } = useContext(MatchContext);
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [ searchQuery, setSearchQuery ] = useState(query || "");
  const filteredMatchs = filterMatchs(matches, searchQuery);

  return (
    <React.Fragment>
      <NavMenu searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container>
        <Div direction="row" wrap="wrap" top="80px" width="100%">
          {filteredMatchs.map((match) => (
            <Match key={match.id} isLoading={isLoading} match={match} />
          ))}
        </Div>
      </Container>
    </React.Fragment>
  );
};

export default MatchesPage;
