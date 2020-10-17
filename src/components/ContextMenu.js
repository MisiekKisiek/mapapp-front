import React, { useContext } from "react";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const ContextMenu = ({ forwardRef }) => {
  const { handleAddMarkerElementVisible, handleActiveHelper } = useContext(
    AppLoggedContext
  );

  const handleAddMarkerElementVisibility = () => {
    handleAddMarkerElementVisible("context");
  };

  return (
    <>
      <nav className="context-menu" ref={forwardRef}>
        <ul className="context-menu__list">
          <li
            className="context-menu__item"
            onClick={handleAddMarkerElementVisibility}
          >
            Add marker
          </li>
          <li className="context-menu__item" onClick={handleActiveHelper}>
            Help
          </li>
          <li className="context-menu__item">Exit</li>
        </ul>
      </nav>
    </>
  );
};

export default ContextMenu;
