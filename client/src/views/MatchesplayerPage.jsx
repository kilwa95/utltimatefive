import React, { useState, useEffect } from "react";
import matchesHttp from "../http/matchHttp";
import NavMenu from "../components/NavMenu";
import Container from "@mui/material/Container";

const MatchesplayerPage = () => {
  const [ matches, setMatches ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const data = await matchesHttp.getListMatchesPlayer();
      setMatches(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <React.Fragment>
      <NavMenu />
      <Container sx={{ marginTop: "80px" }} />
    </React.Fragment>
  );
};

export default MatchesplayerPage;
