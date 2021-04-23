import React from "react";
import factory from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import Application from "./application/index";

const { store, persistor } = factory();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Application />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("elda", () => App);
