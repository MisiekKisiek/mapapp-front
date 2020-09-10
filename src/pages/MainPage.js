import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//Components
import HeaderUnlogged from '../components/HeaderUnlogged';
import MainPageUnlogged from '../components/MainPageUnlogged';
import HeaderLogged from '../components/HeaderLogged';
import MapComponent from '../components/MapComponent';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<>
            <div className="main-page">
                <Switch>
                    <Route path='/'>
                        {localStorage.getItem('logged') === 'logged' ?
                            (<>
                                <HeaderUnlogged></HeaderUnlogged>
                                <MainPageUnlogged></MainPageUnlogged>
                            </>) :
                            (<>
                                <HeaderLogged></HeaderLogged>
                                <MapComponent></MapComponent>
                            </>)}

                    </Route>
                </Switch>
            </div>
        </>);
    }
}

export default MainPage;