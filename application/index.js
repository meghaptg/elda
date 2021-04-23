import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import actions from "./redux/actions";
import AddEntry from "./components/AddEntry";
import Dashboard from "./components/Dashboard";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makeEntry: false,
    };
  }
  closeModal = () => {
    this.setState({ makeEntry: false });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text>
        <Text>{this.props.categories.join()}</Text>
        <Text>
          {this.props.data.length} - {this.state.makeEntry + "megha"}
        </Text> */}
        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => this.setState({ makeEntry: true })}
          style={{
            padding: 20,
            backgroundColor: "powderblue",
            borderRadius: 5,
            position: "absolute",
            right: 10,
            top: 60,
          }}
        >
          <Text>Add new entry</Text>
        </TouchableOpacity>
        <Dashboard />

        <Modal animationType="slide" visible={!!this.state.makeEntry}>
          <AddEntry onClose={this.closeModal} />
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
