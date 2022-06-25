import React, { useContext } from "react";
import { SecurityContext } from "../../contexts/SecurityContext";

import "./Header.css";
import { CButton } from "@coreui/react";

const Header = () => {
  const { logout } = useContext(SecurityContext);

  return (
    <header className="header">
      <h1>Header</h1>
      <CButton onClick={logout} style={{ color: "white" }} color="danger">
        déconnexion
      </CButton>
    </header>
  );
};

export default Header;
