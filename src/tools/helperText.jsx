import React from "react";

//Images
import helperAddMarker from "../img/helperAddMarker.gif";
import helperAddMarker2 from "../img/helperAddMarker2.gif";
import helperAddMarker3 from "../img/helperAddMarker3.gif";
import helperAddMarker4 from "../img/helperAddMarker4.gif";

const text = () => {
  return (
    <>
      <p>
        Hi! It's cool that you decide to try our app. We can provide, that You
        won't be disappointed and Your memories won't disappear ever...
      </p>
      <p>
        Down below there's some guides and tips how to use and enjoy Save The
        World app.
      </p>
      <div>
        <span>1</span>
        <span>How to add marker?</span>
      </div>
      <p>
        Adding marker is quite s1mple like boiling water. First You have to right
        mouse click on map, then the menu will appear like on image below.
        <img src={helperAddMarker} alt="helper" />
        After clicking on dropped menu add marker button, there will show a
        form, whare You can add information about Your beautiful memory :)
        <img src={helperAddMarker2} alt="helper" />
      </p>
      <div>
        <span>2</span>
        <span>How to edit marker?</span>
      </div>
      <p>
        To edit marker You just have to pull-out marker list and click edit
        button line on image below. Then You can customize and edit all
        information about marker, including it's position.
        <img src={helperAddMarker3} alt="helper" />
      </p>
      <div>
        <span>3</span>
        <span>How to remove marker?</span>
      </div>
      <p>
        Removing marker is really easy, all You have to do is to pull-out marker
        list, localize marker You want to remove and finally click on the remove
        button like on image down below. (If You have too much markers, it's
        good to use search input to find search marker).
        <img src={helperAddMarker4} alt="helper" />
      </p>
    </>
  );
};

export default text;
