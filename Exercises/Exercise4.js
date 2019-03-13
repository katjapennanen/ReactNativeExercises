import React from "react";
import { Text, View, Button, TextInput, FlatList } from "react-native";
import styles from "./Styles/styles";

//Exercise 4 - Katja Pennanen
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listItem: "", shoppingList: [] };
  }

  addItem = () => {
    this.setState({
      shoppingList: [...this.state.shoppingList, { key: this.state.listItem }],
      listItem: ""
    });
  };

  clearList = () => {
    this.setState({
      shoppingList: []
    });
  };

  render() {
    return (
      <View style={styles.mainContainerE3}>
        <View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={listItem => this.setState({ listItem })}
            value={this.state.listItem}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.addItem} title="Add item" />
          <Button onPress={this.clearList} title="Clear list" />
        </View>
        <View style={styles.todoListContainer}>
          <Text style={styles.headerStyle}>Shopping list:</Text>
          <FlatList
            data={this.state.shoppingList}
            renderItem={({ item }) => <Text>{item.key}</Text>}
          />
        </View>
      </View>
    );
  }
}
