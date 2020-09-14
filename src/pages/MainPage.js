import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

//Components
import MainPageUnlogged from '../components/MainPageUnlogged';
import MainPageLogged from '../components/MainPageLogged';

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
                        {localStorage.getItem('logged') === 'unlogged' ?
                            (<>
                                <MainPageUnlogged logIn={this.props.logIn}></MainPageUnlogged>
                            </>) :
                            (<>
                                {/* <HeaderLogged logOut={this.props.logOut}></HeaderLogged> */}
                                <MainPageLogged logOut={this.props.logOut}></MainPageLogged>
                            </>)}

                    </Route>
                </Switch>
            </div>
        </>);
    }
}

export default MainPage;