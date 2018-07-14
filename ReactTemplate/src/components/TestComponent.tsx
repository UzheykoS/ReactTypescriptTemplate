
import * as React from 'react'

export interface ITestComponentProps {
    label: string;
}

export default class TestComponent extends React.Component<ITestComponentProps, any>{
    render() {
        const { label } = this.props;
        return <div className="hello-world">
            <div className="hello-world-child">
                {label}
            </div>
        </div>;
    }
}