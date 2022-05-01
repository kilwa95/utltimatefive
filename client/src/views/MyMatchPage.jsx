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

const MyMatchPage = () => {
  const [ matchs, setMatchs ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ isError, setIsError ] = useState(false);
  const { token, user } = useContext(SecurityContext);


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
  }


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
    { field: "salle", headerName: "salle", width: 130 },
    { field: "price", headerName: "prix", width: 130 },
    { field: "square", headerName: "place disponible", width: 130 },
    { field: "slots", headerName: "créneaux horaires", width: 130 },
    { field: "ville", headerName: "ville", width: 130 },
    { field: "address", headerName: "address", width: 130 },
    {
      field: "level",
      headerName: "niveux",
      disableClickEventBubbling: true,
      width: 130,
      valueGetter: (params) => `${params.row.level?.name || ""}`
    },
    {
      field: "delete",
      headerName: "supprimer",
      sortable: false,

      width: 130,
      renderCell: (params) => {
        return (
          <DeleteOutlinedIcon onClick={() =>deleteMatche(params.row.id)} style={{ color: red[500], cursor: "pointer" }} />
        );
      }
    },
    {
      field: "edit",
      headerName: "Update",
      sortable: false,

      width: 130,
      renderCell: (params) => {
        return <EditIcon style={{ color: blue[500], cursor: "pointer" }} />;
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
          />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default MyMatchPage;
