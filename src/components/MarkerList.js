import React from 'react';
import Marker from './MarkerItem';
import { connect } from 'react-redux';

const MarkerList = ({ markers }) => {

    const renderMarkerItems = () => {
        console.log(markers)
    }
    return (<>
        <aside className="marker active">
            <div className="marker__wrap">
                <ul className="marker__list">
                    {renderMarkerItems}
                    <li className="marker__item">
                        <h2 className="marker__item-title"></h2>
                    </li>
                </ul>
            </div>
        </aside>
    </>);
}

const MSTP = state => {
    const { markers } = state
}

export default connect(MSTP)(MarkerList);