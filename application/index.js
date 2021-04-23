import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import actions from "./redux/actions";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makeEntry: false,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>{this.props.categories.join()}</Text>
        <Text>
          {this.props.data.length} - {this.state.makeEntry + "megha"}
        </Text>

        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => this.setState({ makeEntry: true })}
          style={{ padding: 20, backgroundColor: "powderblue" }}
        >
          <Text>Add entry</Text>
        </TouchableOpacity>
        <Modal animationType="slide" visible={!!this.state.makeEntry}>
          <View
            style={{
              backgroundColor: "red",
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ makeEntry: false })}
              style={{ padding: 20, backgroundColor: "powderblue" }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state) {
  return {
    data: state.data,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, actions)(Application);
