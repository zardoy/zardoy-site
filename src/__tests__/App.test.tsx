/// <reference types="jest" />

// import renderer from 'react-test-renderer';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

test('renders without crash', () => {
    ReactDOM.render(<App />, document.createElement('div'));
    // expect(renderer.create(<App />).toJSON()<tree>).toMatchInlineSnapshot();
});
