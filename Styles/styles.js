import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100
  },
  mainContainerE3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200
  },
  mainContainer12: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
  },
  buttonContainer: {
    width: 200,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20
  },
  inputStyle: {
    width: 150,
    borderBottomColor: "black",
    borderWidth: 1,
    margin: 10
  },
  historyContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  historyContainerNav: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
}));
