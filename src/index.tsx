import * as React from "react"
import TestComponent from './components/TestComponent'
import { Busy, CookieHelper } from "altareturn-ui-controls"
import { configureOauth } from "./utils/oauth2";
import Helper, { OAuth2Info } from "./utils/helper";
import './styles/global.scss';
import axios from 'axios';

export interface AppProps {
}

export interface AppState {
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var instance = axios.create({
            baseURL: "",//WebApiUrl
            headers: { 'X-Custom-Header': 'foobar' }
        });

        if (CookieHelper.checkCookie(Helper.TokenCookieName)) {
            instance.defaults.headers.common['Authorization'] = "Bearer " + CookieHelper.getCookie(Helper.TokenCookieName);
        }
        else {
            location.reload();
        }
    }

    render() {
        return <div>
            <TestComponent label="Hello World!" />            
        </div>;
    }
}

