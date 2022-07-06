import React, { useState, useEffect } from "react";
import matchesHttp from "../http/matchHttp";
import NavMenu from "../components/NavMenu";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Table = styled("table")({
  width: "100%",
  borderCollapse: "collapse"
});

const TableHead = styled("tr")({
  backgroundColor: "#F3F7FA",
  borderRadius: "8px",
  padding: "16px 20px",
  height: "56px",
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555"
});
const TableCell = styled("tr")({
  backgroundColor: "#FFFFFF",
  height: "64px"
});

const Column = styled("th")({
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555",
  textAlign: "center"
});
const Cell = styled("td")({
  fontFamily: "Raleway",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555555"
});

const headers = [
  {
    name: "salle"
  },
  {
    name: "ville"
  },
  {
    name: "address"
  },
  {
    name: "price"
  },
  {
    name: "horaire"
  },
  {
    name: "numero de place"
  },
  {
    name: "status"
  },
  {
    name: "teams"
  }
];

const MatchesplayerPage = () => {
  const [ matches, setMatches ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const reponse = await matchesHttp.getListMatchesPlayer();
      setMatches(reponse.matches);
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
      <Container sx={{ marginTop: "80px" }}>
        <Box style={{ width: "100%" }}>
          <Table>
            <TableHead>
              {headers.map((header, index) => (
                <Column align="center" key={index}>
                  {header.name}
                </Column>
              ))}
            </TableHead>
            {matches.map((match, index) => (
              <TableCell>
                <Cell key={index} align="center">
                  {match.salle}
                </Cell>
                <Cell key={index} align="center">
                  {match.ville}
                </Cell>
                <Cell key={index} align="center">
                  {match.address}
                </Cell>
                <Cell key={index} align="center">
                  {match.price}
                </Cell>
                <Cell key={index} align="center">
                  {match.slots}
                </Cell>
                <Cell key={index} align="center">
                  {match.square}
                </Cell>
                <Cell key={index} align="center">
                  {match.status}
                </Cell>
                <Cell key={index} align="center">
                  <Stack spacing={1}>
                    {match.teams.map((team) => (
                      <Chip size="small" label={team.name} variant="outlined" />
                    ))}
                  </Stack>
                </Cell>
              </TableCell>
            ))}
          </Table>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default MatchesplayerPage;
