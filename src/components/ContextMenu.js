import React from "react";

const ContextMenu = ({ handleAddMarkerElementVisible }) => {
  const handleAddMarkerElementVisibility = () => {
    handleAddMarkerElementVisible("context");
  };

  return (
    <>
      <nav className="context-menu">
        <ul className="context-menu__list">
          <li
            className="context-menu__item"
            onClick={handleAddMarkerElementVisibility}
          >
            Add marker
          </li>
          <li className="context-menu__item">Exit</li>
        </ul>
      </nav>
    </>
  );
};

export default ContextMenu;
