import React, { useContext } from "react";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const ContextMenu = ({ forwardRef }) => {

  //context
  const { 
    handleAddMarkerElementVisible, 
    handleActiveHelper, 
    handleLogOut, 
    handleAlertComponentVisibility
  } = useContext(
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
          <li 
            className="context-menu__item" 
            onClick={()=>{
              handleAlertComponentVisibility(handleLogOut,"Do You want to log out?");
              sessionStorage.setItem("logged", "unlogged") 
            }}
          >
            Log out
          </li>
          <li className="context-menu__item">Close</li>
        </ul>
      </nav>
    </>
  );
};

export default ContextMenu;
