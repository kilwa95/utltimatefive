import { useState, useEffect, useCallback } from "react";
import { CDataTable, CCard, CCardBody, CContainer, CRow } from "@coreui/react";
import Modal from "../components/modal/Modal";
import teamsHttp from "../lib/http/teamsHttp";

const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  useEffect(() => {
    const getListTeams = async () => {
      const { data } = await teamsHttp.getListTeams();
      setTeams(data);
    };
    getListTeams();
  }, []);

  return (
    <CContainer>
      <Modal
        title={"add new user"}
        description={"information user"}
        buttonTitle={"save"}
        modal={modal}
        toggle={toggle}
      ></Modal>
      {/* disply Users */}
      <CRow>
        <CCard>
          <CCardBody>
            <CDataTable
              items={teams ? teams : []}
              itemsPerPage={5}
              columnFilter
              pagination
              tableFilter
              sorter
              hover
              footer
            />
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  );
};

export default TeamPage;
