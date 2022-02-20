import React, { useState, useContext } from "react";
import { CDataTable, CCard, CCardBody, CContainer, CRow } from "@coreui/react";
import Modal from "../components/modal/Modal";
import { UserContext } from "../contexts/UserContext";
import { SecurityContext } from "../contexts/SecurityContext";
import { Redirect } from "react-router-dom";

const UserPage = () => {
  const [modal, setModal] = useState(false);
  const { fields, users, isLoading, getBadge } = useContext(UserContext);
  const { token } = useContext(SecurityContext);

  const toggle = () => {
    setModal(!modal);
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <CContainer>
      {/* add new user*/}
      <CRow style={{ marginBottom: "40px" }}>
        <CCard>
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div style={{ fontWeight: "bold" }}>List users</div>
              {/* <CButton onClick={toggle} color='primary'>Add new user</CButton> */}
            </div>
          </CCardBody>
        </CCard>
      </CRow>
      <Modal
        title={"Add new user"}
        buttonTitle={"save"}
        modal={modal}
        toggle={toggle}
      ></Modal>
      {/* disply Users */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CRow>
          <CCard>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={5}
                itemsPerPageSelect
                pagination
                columnFilter
                tableFilter
                sorter
                hover
                footer
                scopedSlots={{
                  level: (item) => {
                    return <td className="py-2">{item.level.name}</td>;
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CRow>
      )}
    </CContainer>
  );
};
export default UserPage;
