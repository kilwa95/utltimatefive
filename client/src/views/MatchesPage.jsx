import React, { useContext, useState } from "react";
import { Div } from "../style/styled";
import { Container } from "@mui/material";
import MatchCard from "../components/MatchCard";
import { MatchContext } from "../contexts/MatchContext";
import NavMenu from "../components/NavMenu";
import { Select } from "@mui/material";

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
          <Div direction="row" top="80px" width="100%" alignItems="center">
            <div
              style={{
                fontWeight: "500",
                fontSize: "18px",
                color: "#172C41",
                width: "100%"
              }}
            >
              touts les matches
            </div>
            {/* <Div direction="row" width="100%" alignItems="center">
              <div style={{ marginRight: "10px" }}>Filter :</div>
              <Select
                style={{ width: "100px", marginRight: "10px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              />
              <Select
                style={{ width: "100px", marginRight: "10px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              />
              <Select
                style={{ width: "100px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              />
            </Div> */}
          </Div>
          {filteredMatchs.map((match) => (
            <MatchCard key={match.id} isLoading={isLoading} match={match} />
          ))}
        </Div>
      </Container>
    </React.Fragment>
  );
};

export default MatchesPage;
