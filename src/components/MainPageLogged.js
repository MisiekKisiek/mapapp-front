import React, { Component } from 'react';
import { connect } from 'react-redux';

//Apiprefix
import { API } from '../tools/apiPrefixes';

//Actions
import { getMarkers } from '../actions/markers.action';

//Components
import Header from './HeaderLogged';
import MapComponent from './MapComponent';
import MarkerList from './MarkerList';

class MainPageLogged extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    getAllTasks = async () => {
        await fetch(`${API}/api/getAllMarkers`)
            .then(
                e => e.json())
            .then(user => {
                this.props.getMarkers(user.markers);
            })
    }

    handleShowMarkerList = () => {
        const markerList = document.querySelector('.marker');
        markerList.classList.toggle('active');
    }

    componentDidMount() {
        this.getAllTasks();
    }

    render() {
        return (<>
            <main className="logged__wrap">
                <Header logOut={this.props.logOut} handleShowMarkerList={this.handleShowMarkerList}></Header>
                <MapComponent></MapComponent>
                <MarkerList></MarkerList>
            </main>
        </>);
    }
}

const MSTP = state => {
    return {
        markersAll: state.markers
    }
};

const MDTP = {
    getMarkers
}

export default connect(MSTP, MDTP)(MainPageLogged);