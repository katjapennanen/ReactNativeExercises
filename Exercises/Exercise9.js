import React from "react";
import { Text, View, Button, TextInput, Alert } from "react-native";
import { MapView } from "expo";
import styles from "./Styles/styles";

// Exercise 9 - Katja Pennanen
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        lat: 60.200692,
        lng: 24.934302
      },
      location: "",
      marker: { latitude: 60.200692, longitude: 24.934302 }
    };
  }

  fetchLocation = () => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=ik0mAq4PambqD0KOkn7JqPllb9iJe4aA&location=${
      this.state.location
    }`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          region: responseJson.results[0].locations[0].latLng
        });
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 5 }}
          region={{
            latitude: this.state.region.lat,
            longitude: this.state.region.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0322
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.lat,
              longitude: this.state.region.lng
            }}
          />
        </MapView>
        <View>
          <View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={location => this.setState({ location })}
            />
          </View>
          <Text>{this.state.region.latitude}</Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                this.fetchLocation();
              }}
              title="Search"
            />
          </View>
        </View>
      </View>
    );
  }
}
