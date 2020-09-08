import React, { Component } from 'react'
import MapComponent from '../components/MapComponent'
import MainPageUnlogged from '../components/MainPageUnlogged'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<>
            <div className="main-page">
                <MainPageUnlogged></MainPageUnlogged>
                {/* <MapComponent></MapComponent> */}
            </div>
        </>);
    }
}

export default MainPage;