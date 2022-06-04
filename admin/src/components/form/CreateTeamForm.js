import React, { useState } from "react";
import { CForm, CInput, CInputGroup, CButton } from "@coreui/react";

const CreateTeamForm = ({ onSubmit, error }) => {
  const [values, setValues] = useState({
    name: "",
    levelId: null,
  });

  const _onSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <CForm onSubmit={_onSubmit}>
      <CInputGroup className="mb-3">
        <CInput
          type="text"
          placeholder="name team"
          autoComplete="off"
          onChange={handleChange}
          name="name"
        />
      </CInputGroup>
      <CInputGroup className="mb-3">
        <CInput
          type="text"
          placeholder="level"
          autoComplete="off"
          onChange={handleChange}
          name="levelId"
        />
      </CInputGroup>

      <CInputGroup className="mb-3">
        <CButton color="primary" type="submit">
          Envoyer
        </CButton>
      </CInputGroup>
    </CForm>
  );
};

export default CreateTeamForm;
