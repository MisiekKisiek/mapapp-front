import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import HeaderUnlogged from '../components/HeaderUnlogged';
import HeaderLogged from '../components/HeaderLogged';
import MainPageUnlogged from '../components/MainPageUnlogged';
import MainPageLogged from '../components/MainPageLogged';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleShowMarkerList = () => {
        const markerList = document.querySelector('.marker');
        markerList.classList.toggle('marker--active');
    }

    handleVisiblePassword = () => {
    }

    render() {
        const renderHeaderComponent = sessionStorage.getItem('logged') === 'unlogged' ?
            (<HeaderUnlogged
                logIn={this.props.logIn}
            ></HeaderUnlogged>) :
            (<HeaderLogged
                logOut={this.props.logOut}
                handleShowMarkerList={this.handleShowMarkerList}>
            </HeaderLogged>);
        const renderLoggedPage = sessionStorage.getItem('logged') === 'unlogged' ?
            (<MainPageUnlogged></MainPageUnlogged>) :
            (<MainPageLogged logOut={this.props.logOut} forceUpdateApp={this.props.forceUpdateApp}></MainPageLogged>);
        const renderLoginComponent = sessionStorage.getItem('logged') === 'unlogged' ?
            (<LoginComponent forceUpdateApp={this.props.forceUpdateApp}></LoginComponent>) :
            (<Redirect to='/'></Redirect>);
        const renderRegisterComponent = sessionStorage.getItem('logged') === 'unlogged' ?
            (<RegisterComponent></RegisterComponent>) :
            (<Redirect to='/'></Redirect>);
        return (<>
            <div className="main-page">
                {renderHeaderComponent}
                <Switch>
                    <Route exact path='/'>
                        {renderLoggedPage}
                    </Route>
                    <Route path="/login">
                        {renderLoginComponent}
                    </Route>
                    <Route path='/register'>
                        {renderRegisterComponent}
                    </Route>
                </Switch>
            </div>
        </>);
    }
}

export default MainPage;