import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from "./App"

var root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById("root")
);
