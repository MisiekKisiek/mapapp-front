import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Components
import Marker from './MarkerListItem';


const MarkerList = ({ markersAll, handleMarkerListActiveItem }) => {

    const renderMarkerItems = () => {
        const markers = markersAll.map((e, index) => <Marker key={e.id} id={e.id} marker={e} handleMarkerListActiveItem={handleMarkerListActiveItem} first={index === 0 ? true : false}></Marker>);
        return markers;
    }

    return (<>
        <aside className="marker marker--active">
            <div className="marker__wrap">
                <ul className="marker__list">
                    {renderMarkerItems()}
                </ul>
            </div>
        </aside>
    </>);
}

const MSTP = state => {
    return { markersAll: state.markers }
}

export default connect(MSTP)(MarkerList);