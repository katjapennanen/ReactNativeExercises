import React from "react";
import {
  Text,
  Image,
  Linking,
  View,
  Button,
  TextInput,
  FlatList
} from "react-native";
import styles from "./Styles/styles";

// Exercise 7 - Katja Pennanen
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], keyword: "" };
  }

  fetchRecipesByKeyword = () => {
    const url = `http://www.recipepuppy.com/api/?i=${this.state.keyword}&q=`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ recipes: responseJson.results });
      })
      .catch(error => {
        alert.alert(error);
      });
  };

  render() {
    return (
      <View style={styles.mainContainerE3}>
        <View style={styles.historyContainerNav}>
          <Text>Recipes:</Text>
          <FlatList
            keyExtractor={item => item.title}
            renderItem={({ item }) => (
              <Text onPress={() => Linking.openURL(item.href)}>
                {item.title}
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: item.thumbnail
                  }}
                />
              </Text>
            )}
            data={this.state.recipes}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputStyle}
            onChangeText={keyword => this.setState({ keyword })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.fetchRecipesByKeyword} title="Search" />
        </View>
      </View>
    );
  }
}
