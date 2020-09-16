import React, { useEffect } from 'react';
import { connect } from 'react-redux';

//Components
import Marker from './MarkerListItem';


const MarkerList = ({ markersAll }) => {

    const renderMarkerItems = () => {
        // const markers = <li>elko</li>;
        const markers = markersAll.map(e => <Marker name={e.name}></Marker>);
        console.log('dupsko', markers);
        return markers;
    }

    return (<>
        <aside className="marker active">
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