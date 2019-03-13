import React, { Component } from "react";
import Calculator from './Exercises/Exercise5/Calculator';
import History from './Exercises/Exercise5/History';
import { createAppContainer, createStackNavigator } from "react-navigation";

// App.js file for Exercise 5 -- Katja Pennanen
export default class componentName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const MyApp = createStackNavigator({
      Calculator: { screen: Calculator },
      History: { screen: History }
    });

    const AppContainer = createAppContainer(MyApp);

    return <AppContainer />;
  }
}
