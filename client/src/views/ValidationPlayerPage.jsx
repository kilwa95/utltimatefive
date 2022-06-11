import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import NavMenu from "../components/NavMenu";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Chip } from "@mui/material";

const ValidationPlayerPage = () => {
  const [ players, setPlayers ] = React.useState(
    JSON.parse(localStorage.getItem("players"))
  );
  const [ teams, setTeams ] = React.useState(
    JSON.parse(localStorage.getItem("teams"))
  );
  const [ value, setValue ] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
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
                value={value}
                label="team"
                name="tteam"
                onChange={handleChange}
              >
                {teams.map((team) => {
                  return (
                    <MenuItem key={team.id} value={team.name}>
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
            <Button variant="contained" color="primary">
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
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ValidationPlayerPage;
