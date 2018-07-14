import * as React from "react";
import * as ReactDOM from "react-dom";
import TestComponent from "../src/components/TestComponent"
import { mount, shallow, render } from 'enzyme';
import { expect, assert } from 'chai';
import * as sinon from 'sinon';

describe("<App/>", function () {
    let container;

    beforeEach(() => {
    })

    it("should render component correctly and print Hello World", () => {
        container = render(<TestComponent label="Hello World!"/>);
        expect(container.text()).to.eq("Hello World!");
    });
});