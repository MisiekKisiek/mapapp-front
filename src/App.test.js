import React from 'react';

import App from './App';
// import Header from '../components/Header/Header';
// import SearchBar from '../components/SearchBar/SearchBar';
// import CoinList from '../components/CoinList/CoinList';

describe('<App />', () => {
    let appWrapper;
    let appInstance;
    const app = (disableLifecycleMethods = false) =>
        // shallow(<App />, { disableLifecycleMethods });

        beforeEach(() => {
            appWrapper = app();
            appInstance = appWrapper.instance();
        });

    afterEach(() => {
        appWrapper = undefined;
        appInstance = undefined;
    });

    it('renders without crashing', () => {
        expect(app().exists()).toBe(true);
    });
});
