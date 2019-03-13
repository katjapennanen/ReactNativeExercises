import React, { Component } from "react";
import { Text, View, FlatList } from "react-native";
import styles from "../../Styles/styles";

export default class History extends React.Component {
  static navigationOptions = { title: "History" };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.historyContainerNav}>
        <Text>History:</Text>
        <FlatList
          data={params.historyArray}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    );
  }
}
