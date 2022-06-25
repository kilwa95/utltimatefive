import React, { useState } from "react";
import { CForm, CInput, CInputGroup, CButton } from "@coreui/react";

const CreateLevelForm = ({ onSubmit, error }) => {
  const [values, setValues] = useState({
    name: "",
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
          placeholder="name level"
          autoComplete="off"
          onChange={handleChange}
          name="name"
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

export default CreateLevelForm;
