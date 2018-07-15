import * as React from "react"
import TestComponent from './components/TestComponent'
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
    
    render() {
        return <div>
            <TestComponent label="Hello World!" />            
        </div>;
    }
}

