import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';
import reducers from './reducers';
import App from './containers/app';

let mountElement = document.createElement('div');
document.body.appendChild(mountElement);

render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    mountElement
);