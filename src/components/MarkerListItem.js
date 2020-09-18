import React from 'react';

const MarkerListItem = ({ handleMarkerListActiveItem, marker, first, id }) => {

    const { lat, lng, name, place, description } = marker

    return (<>
        <li className={`marker__item ${first ? 'marker__item--active' : ''}`} data-markerid={id} onClick={(e) => { handleMarkerListActiveItem(e) }}>
            <h2 className="marker__item-title">{name}</h2>
            <section className="marker__item-section">
                <p className="marker__place">{place}</p>
                <p className="marker__description">{description}</p>
            </section>
        </li>
    </>);
}

export default MarkerListItem;