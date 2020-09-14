import React, { Component } from 'react';

//Components
import Header from './HeaderLogged';
import MapComponent from './MapComponent';
import MarkerList from './MarkerList';

class MainPageLogged extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleShowMarkerList = () => {
        const markerList = document.querySelector('.marker');
        markerList.classList.toggle('active');
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

export default MainPageLogged;