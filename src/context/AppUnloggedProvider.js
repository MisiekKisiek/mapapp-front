import React,{Component} from 'react'

//Context
import AppUnloggedContext from './AppUnloggedContext';
import {defaultValue} from './AppLoggedContext';

class AppUnloggedProvider extends Component {
    state = defaultValue
    render() { 
        return ( 
        <AppUnloggedContext.Provider value={{}}>
            {this.props.children}
        </AppUnloggedContext.Provider> );
    }
}
 
export default AppUnloggedProvider;