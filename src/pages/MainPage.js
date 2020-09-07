import React, { Component } from 'react'
import MapComponent from '../components/MapComponent'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<>
            <MapComponent></MapComponent>
        </>);
    }
}

export default MainPage;