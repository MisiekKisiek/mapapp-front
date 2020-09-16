import React from 'react';

const MarkerListItem = ({ name }) => {
    return (<>
        <li className="marker__item">
            <h2 className="marker__item-title">{name}</h2>
        </li>
    </>);
}

export default MarkerListItem;