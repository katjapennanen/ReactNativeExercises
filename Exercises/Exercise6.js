import React, { Component } from "react";
import {
  Alert,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage
} from "react-native";
import styles from "./Styles/styles";

// Exercise 6 - Katja Pennanen
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { randomNum: 0, quessedNum: "", output: "", highscore: "" };
  }

  componentDidMount() {
    this.setRandomNumber();
    this.handleHighscore(100);
  }

  setRandomNumber = () => {
    this.setState({ randomNum: Math.floor(Math.random() * 100) + 1 });
  };

  handleHighscore = async quesses => {
    let highscore = "";
    if (quesses === 100) {
      highscore = await AsyncStorage.getItem("key");
      this.setState({ highscore: ` ${highscore} quesses` });
    }
    
    try {
      var highscoreFromStorage = await AsyncStorage.getItem("key");
      if (quesses <= Number(highscoreFromStorage)) {
        AsyncStorage.setItem("key", JSON.stringify(quesses));
        highscore = await AsyncStorage.getItem("key");
        this.setState({ highscore: ` ${highscore} quesses` });
      }
    } catch (error) {
      Alert.alert("it no work");
    }
  };

  quessButton = () => {
    var output = "";
    var quess = this.state.quessedNum;
    var random = this.state.randomNum;

    if (Number(random) > Number(quess)) {
      output = `Your quess ${quess} is too low`;
      quessCounter++;
    } else if (Number(random) < Number(quess)) {
      output = `Your quess ${quess} is too high`;
      quessCounter++;
    } else {
      quessCounter++;
      output = Alert.alert(
        `You quessed the correct number (${random}) in ${quessCounter} quesses.`
      );
      this.setRandomNumber();
      this.handleHighscore(quessCounter);
      quessCounter = 0;
    }
    this.setState({ output, quessedNum: "" });
    return this.state.output;
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 17 }}>Quess a number between 1-100</Text>
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          {this.state.output}
        </Text>
        <View>
          <TextInput
            style={styles.inputStyle}
            keyboardType="number-pad"
            onChangeText={quessedNum => this.setState({ quessedNum })}
            value={this.state.quessedNum}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.quessButton} title="Make a quess!" />
        </View>
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          Highscore:
          {this.state.highscore}
        </Text>
      </View>
    );
  }
}

var quessCounter = 0;
