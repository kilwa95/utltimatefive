import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import NavMenu from "../components/NavMenu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Chip } from "@mui/material";
import usersHttp from "../http/usersHttp";
import teamsHttp from "../http/teamsHttp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ValidationPlayerPage = (props) => {
  const [ players, setPlayers ] = React.useState([]);
  const [ teams, setTeams ] = React.useState([]);
  const [ value, setValue ] = React.useState({});
  const [ open, setOpen ] = React.useState(false);
  const [ uid, setUid ] = React.useState(0);

  const validerPlayer = async (player) => {
    const reponse = await usersHttp.validerPlayer(player.id);
    if (reponse.status === 200) {
      const { data } = reponse;
      const status = data.data.status;
      const newPlayers = [ ...players ];
      const index = newPlayers.findIndex((p) => p.id === player.id);
      newPlayers[index].status = status;
      setPlayers(newPlayers);
      localStorage.setItem("players", JSON.stringify(newPlayers));
    } else {
      console.log("Erreur");
    }
  };

  const joinTeam = async (tid) => {
    try {
      const reponse = await teamsHttp.joinTeam(tid, uid);
      if (reponse) {
        const { data } = reponse;
        const { userJSON, dataJSON } = data;
        const name = dataJSON.name;
        const newPlayers = [ ...players ];
        const index = newPlayers.findIndex((p) => p.id === userJSON.id);
        newPlayers[index].equibes.push(dataJSON);
        setPlayers(newPlayers);
        localStorage.setItem("players", JSON.stringify(newPlayers));
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (uid, event) => {
    const team = event.target.value;
    setUid(uid);
    setValue(team);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setPlayers(JSON.parse(localStorage.getItem("players")));
    setTeams(JSON.parse(localStorage.getItem("teams")));
  }, []);

  const columns = [
    { field: "id", headerName: "id", width: 50 },
    { field: "firstName", headerName: "prénom", width: 100 },
    { field: "lastName", headerName: "Nom", width: 100 },
    { field: "email", headerName: "email", width: 150 },
    {
      field: "equibes",
      width: 100,
      headerName: "team",
      renderCell: (params) => {
        return (
          <div>
            {params.row.equibes.length != 0 && params.row.equibes[0] ? (
              params.row.equibes[0].name
            ) : (
              ""
            )}
          </div>
        );
      }
    },
    {
      field: "status",
      headerName: "status",
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "created" ? (
              <Chip label="en attente de validation" color="warning" />
            ) : (
              <Chip label={params.row.status} color="success" />
            )}
          </div>
        );
      },
      width: 200
    },
    {
      field: "mettre en equibe",
      width: 200,
      headerName: "mettre en equibe",
      renderCell: (params) => {
        return (
          <div style={{ width: "100%" }}>
            {params.row.equibes.length != 0 && params.row.equibes[0] ? (
              ""
            ) : (
              <Select
                style={{ width: "100%" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value.name}
                label="team"
                name="team"
                onChange={(event) => handleChange(params.row.id, event)}
              >
                {teams.map((team) => {
                  return (
                    <MenuItem key={team.id} value={team}>
                      {team.name}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
        );
      }
    },
    {
      field: "Valider",
      width: 200,
      headerName: "Valider",
      renderCell: (params) => {
        return (
          <div style={{ width: "100%" }}>
            <Button
              disabled={
                params.row.status === "validated" ||
                params.row.equibes.length == 0
              }
              onClick={() => validerPlayer(params.row)}
              variant="contained"
              color="primary"
            >
              <span>Valider</span>
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <React.Fragment>
      <NavMenu />
      <Container sx={{ marginTop: "80px" }}>
        <h1>Validation des joueurs</h1>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={players}
            columns={columns}
            autoHeight
            aria-label="simple table"
            aria-labelledby="tableTitle"
            density="comfortable"
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Mettre en equipe"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                vous voulez mettre cette joueur en equipe de {value.name}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>non</Button>
              <Button onClick={() => joinTeam(value.id)} autoFocus>
                oui
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ValidationPlayerPage;
