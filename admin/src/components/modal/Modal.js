import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const Modal = ({ title, buttonTitle, children, modal, toggle }) => {
  return (
    <CModal show={modal} onClose={toggle}>
      <CModalHeader closeButton>{title}</CModalHeader>
      <CModalBody>{children}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;
