import * as React from 'react';
import TestApp from "../src";
import Helper, { OAuth2Info } from "../src/utils/helper";
import { configureOauth } from "../src/utils/oauth2";
import axios from 'axios';

export interface AppState {
    oauth2Info?: OAuth2Info;
    isLoading?: boolean;
}

export default class App extends React.Component<any, AppState> {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        axios.defaults.headers.common["Accept"] = 'application/json;odata=verbose';
        axios.defaults.headers.common["Content-Type"] = 'application/json';
        axios.defaults.headers.post["Content-Type"] = 'application/json';
        axios.defaults.withCredentials = false;
    }

    render() {
        const { isLoading } = this.state;

        return <TestApp />;//isLoading ? <Busy isVisible={isLoading} /> : <TestApp />;
    }
}



