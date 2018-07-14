import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestApp from "../src";
import { Busy, CookieHelper } from "altareturn-ui-controls";
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

        if (CookieHelper.checkCookie(Helper.TokenCookieName)) {
            const accessToken = CookieHelper.getCookie(Helper.TokenCookieName);
            axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
            this.setState({
                isLoading: false
            })
        }
        else {
            // call your retrieveOAuth2Info() method here
            setTimeout(() => {
                    this.setState({
                        oauth2Info: {
                            OAuth2Authority: "https://adfsdev.altareturn.com/adfs",
                            OAuth2ClientId: "c7e7d55d-0b06-447f-ac9e-8b1bbe3123d7",
                            OAuth2RedirectUri: "http://127.0.0.1:3000/",
                            OAuth2ResourceIdentifier: "http://127.0.0.1:3000/backend",
                            OAuth2TokenService: "https://altdevsf01.verticetech.com/Altareturn.Core/AuthService"
                        },
                        isLoading: false
                    })
                },
                1000);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { oauth2Info } = nextState;

        const oauthCookie = CookieHelper.checkCookie(Helper.TokenCookieName);
        if (!oauthCookie && oauth2Info) {
            configureOauth(
                oauth2Info.OAuth2Authority,
                oauth2Info.OAuth2ClientId,
                oauth2Info.OAuth2RedirectUri,
                oauth2Info.OAuth2ResourceIdentifier,
                oauth2Info.OAuth2TokenService
            )
            return false;
        }
        return true;
    }

    render() {
        const { isLoading } = this.state;

        return isLoading ? <Busy isVisible={isLoading} /> : <TestApp />;
    }
}



