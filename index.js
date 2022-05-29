/**
 * @format
 */

// import React from 'react';
import { AppRegistry } from 'react-native';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { PortalStore } from './library/main';
import App from './App';
import { name as appName } from './app.json';
import { autoInjectProvider } from './library/main';

autoInjectProvider(false);

// const defaultReducer = () => null;

// const store = createStore(defaultReducer);

// PortalStore.setContainer(<Provider store={store} />);

AppRegistry.registerComponent(appName, () => App);
