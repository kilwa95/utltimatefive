import React, { useState, useContext, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import matchHttp from "../http/matchHttp";
import { SecurityContext } from "../contexts/SecurityContext";
import { Redirect } from "react-router-dom";

const MyMatchPage = () => {
  const [ matchs, setMatchs ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isError, setIsError ] = useState(false);
  const { token, user } = useContext(SecurityContext);

  const getMatches = async (uid) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const { data } = await matchHttp.getListMatchsByUserId(uid);
      setMatchs(data);
    } catch (error) {
      setIsError(true);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const uid = JSON.parse(user).id;
    getMatches(uid);
  }, []);

  if (!token) {
    return <Redirect to="/login" />;
  }
  if (!user && !user.isPlayer) {
    return <Redirect to="/" />;
  }
  return (
    <React.Fragment>
      <NavMenu />
      <Container sx={{ marginTop: "80px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>salle</TableCell>
                <TableCell align="right">ville</TableCell>
                <TableCell align="right">level</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">edit</TableCell>
                <TableCell align="right">delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matchs.map((match) => (
                <TableRow
                  key={match.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {match.salle}
                  </TableCell>
                  <TableCell align="right">{match.ville}</TableCell>
                  <TableCell align="right">
                    {match.levelId === 1 ? (
                      "beginner"
                    ) : match.levelId === 2 ? (
                      "intermediate"
                    ) : (
                      "advanced"
                    )}
                  </TableCell>
                  <TableCell align="right">{match.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </Container>
    </React.Fragment>
  );
};

export default MyMatchPage;
