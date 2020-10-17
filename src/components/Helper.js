import React, { useContext } from "react";

//Tools
import Text from "../tools/helperText";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const Helper = () => {
  const { handleActiveHelper } = useContext(AppLoggedContext);

  return (
    <>
      <section className="helper">
        <div className="helper__courtine" onClick={handleActiveHelper}></div>
        <div className="helper__wrap">
          <h3 className="helper__title">How to use?</h3>
          <article className="helper__article">
            <Text />
          </article>
          <div className="helper__btn-ok">
            <button onClick={handleActiveHelper}>Ok, thanks!</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Helper;
