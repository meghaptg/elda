import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import actions from "./redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddEntry from "./components/AddEntry";
import Dashboard from "./components/Dashboard";

const Tab = createBottomTabNavigator();

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
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="New entry" component={AddEntry} />
        </Tab.Navigator>
      </NavigationContainer>
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
