import React, { useState, useContext, useEffect } from "react";
import NavMenu from "../components/NavMenu";
import Container from "@mui/material/Container";
import matchHttp from "../http/matchHttp";
import { SecurityContext } from "../contexts/SecurityContext";
import { Redirect } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import { blue, red } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

const MyMatchPage = () => {
  const [ matchs, setMatchs ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isError, setIsError ] = useState(false);
  const { token, user } = useContext(SecurityContext);
  const history = useHistory();

  const deleteMatche = async (id) => {
    try {
      setIsLoading(true);
      await matchHttp.deleteMatch(id);
      setIsLoading(false);
      setMatchs(matchs.filter((match) => match.id !== id));
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setError(error.message);
    }
  };

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

  const columns = [
    { field: "salle", headerName: "salle", width: 100, editable: true },
    { field: "price", headerName: "prix", width: 100, editable: true },
    {
      field: "square",
      headerName: "place disponible",
      width: 50,
      editable: true
    },
    {
      field: "slots",
      headerName: "créneaux horaires",
      width: 100,
      editable: true
    },
    { field: "ville", headerName: "ville", width: 100, editable: true },
    { field: "address", headerName: "address", width: 300, editable: true },
    {
      field: "level",
      headerName: "niveux",
      disableClickEventBubbling: true,
      width: 100,
      valueGetter: (params) => `${params.row.level.name || ""}`
    },
    {
      field: "delete",
      headerName: "supprimer",
      sortable: false,

      renderCell: (params) => {
        return (
          <DeleteOutlinedIcon
            onClick={() => deleteMatche(params.row.id)}
            style={{ color: red[500], cursor: "pointer" }}
          />
        );
      }
    },
    {
      field: "valide",
      headerName: "valider players",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              localStorage.setItem(
                "players",
                JSON.stringify(params.row.players)
              );
              localStorage.setItem("teams", JSON.stringify(params.row.teams));
              history.push("/validationplayer");
            }}
          >
            valider
          </Button>
        );
      }
    }
  ];

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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={matchs}
            columns={columns}
            loading={isLoading}
            error={error}
            aria-label="simple table"
            aria-labelledby="tableTitle"
            autoHeight
            autoPageSize
            checkboxSelection
            density="comfortable"
            editMode="cell"
            pageSize={5}
            rowsPerPageOptions={[ 5 ]}
            processRowUpdate={async (updatedRow) => {
              await matchHttp.updateMatch(updatedRow.id, updatedRow);
              setMatchs(
                matchs.map(
                  (row) => (row.id === updatedRow.id ? updatedRow : row)
                )
              );
            }}
            onProcessRowUpdateError={(error) => {
              console.log(error);
            }}
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default MyMatchPage;
