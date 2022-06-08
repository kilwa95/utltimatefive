import { useState, useEffect, useCallback } from "react";
import levelsHttp from "../lib/http/levelsHttp";
import Modal from "../components/modal/Modal";
import CreateLevelForm from "../components/form/CreateLevelForm";

import {
  CDataTable,
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CButton,
  CCollapse,
} from "@coreui/react";

const fields = [{ key: "name" }];

const LevelPage = () => {
  const [levels, setLevels] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState([]);

  const toggle = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onSubmit = async (values) => {
    const { data } = await levelsHttp.saveLevels(values);
    setLevels([...levels, data]);
    setModal(false);
  };

  useEffect(() => {
    const getLevels = async () => {
      const data = await levelsHttp.getLevels();
      setLevels(data);
    };
    getLevels();
  }, []);

  return (
    <CContainer>
      <CRow style={{ marginBottom: "40px" }}>
        <CCard>
          <CCardBody>
            <div className="d-flex justify-content-between">
              <div>levels</div>
              <CButton onClick={toggle} color="primary">
                add new level
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CRow>
      <Modal
        title={"add new level"}
        description={"information level"}
        buttonTitle={"save"}
        modal={modal}
        toggle={toggle}
      >
        <CreateLevelForm onSubmit={onSubmit} />
      </Modal>
      <CRow>
        <CCard>
          <CCardBody>
            <CDataTable
              fields={fields}
              items={levels ? levels : []}
              itemsPerPage={5}
            />
          </CCardBody>
        </CCard>
      </CRow>
    </CContainer>
  );
};

export default LevelPage;
