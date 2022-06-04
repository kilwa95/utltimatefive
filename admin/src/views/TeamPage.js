import { useState, useEffect, useCallback } from "react";
import {
  CDataTable,
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CButton,
} from "@coreui/react";
import Modal from "../components/modal/Modal";
import CreateTeamForm from "../components/form/CreateTeamForm";
import teamsHttp from "../lib/http/teamsHttp";

const fields = [
  { key: "id" },
  { key: "name" },
  { key: "level" },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];
const TeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const toggleDetails = useCallback(
    (index) => {
      const position = details.indexOf(index);
      let newDetails = details.slice();
      if (position !== -1) {
        newDetails.splice(position, 1);
      } else {
        newDetails = [...details, index];
      }
      setDetails(newDetails);
    },
    [details]
  );

  const onSubmit = async (values) => {
    const { data } = await teamsHttp.createTeam(values);
    setTeams([...teams, data.data]);
    setModal(false);
  };

  useEffect(() => {
    const getListTeams = async () => {
      const data = await teamsHttp.getListTeams();
      setTeams(data);
    };
    getListTeams();
  }, []);

  return (
    <CContainer>
      <CRow style={{ marginBottom: "40px" }}>
        <CCard>
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>Teams</div>
              <CButton onClick={toggle} color="primary">
                add new team
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CRow>
      <Modal
        title={"add new team"}
        description={"information team"}
        buttonTitle={"save"}
        modal={modal}
        toggle={toggle}
      >
        <CreateTeamForm onSubmit={onSubmit} />
      </Modal>
      {/* disply Users */}
      <CRow>
        <CCard>
          <CCardBody>
            <CDataTable
              fields={fields}
              items={teams ? teams : []}
              itemsPerPage={5}
              columnFilter
              pagination
              tableFilter
              sorter
              hover
              footer
              scopedSlots={{
                level: (item) => {
                  return <td className="py-2">{item.level.name}</td>;
                },
                show_details: (item, index) => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          toggleDetails(index);
                        }}
                      >
                        {details.includes(index) ? "Hide" : "players"}
                      </CButton>
                    </td>
                  );
                },
                // details: (item, index) => {
                //   return (
                //     <CCollapse show={details.includes(index)}>
                //       <CCardBody>
                //         <CDataTable items={item.players} />
                //       </CCardBody>
                //     </CCollapse>
                //   );
                // },
              }}
            />
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  );
};

export default TeamPage;
