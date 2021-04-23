import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import Toast, { DURATION } from "react-native-easy-toast";
import * as actions from "./../../redux/actions";
import Label from "./label";

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      title: "",
      category: this.props.categories[0],
    };
  }
  onSubmit = () => {
    if (!this.state.title) {
      this.toast.show("please add the title");
    } else if (!this.state.amount) {
      this.toast.show("please add the amount");
    } else if (!this.state.category) {
      this.toast.show("please add the category");
    } else if (
      this.state.amount > 0 &&
      this.state.title &&
      this.state.category
    ) {
      const data = {
        title: this.state.title,
        category: this.state.category,
        amount: parseFloat(this.state.amount),
        dateStamp: new Date().toLocaleString(),
      };
      this.props.addEntry(data);
      this.props.onClose();
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Add a new entry</Text>
        <Label>title</Label>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => this.setState({ title: text })}
          placeholder={"title"}
          value={this.state.title}
        />
        <Label>amount</Label>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => this.setState({ amount: parseFloat(text) })}
          keyboardType="decimal-pad"
          placeholder={"amount"}
          value={this.state.amount.toString()}
        />
        <Label>category</Label>
        <View style={[styles.textBox]}>
          <Picker
            style={{ height: 30 }}
            selectedValue={this.state.category}
            mode="dropdown"
            prompt="pick a category"
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ category: itemValue })
            }
          >
            {this.props.categories.map((element) => (
              <Picker.Item key={element} label={element} value={element} />
            ))}
          </Picker>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={this.props.onClose}
            style={[styles.btn, { backgroundColor: "lightgrey" }]}
          >
            <Text>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "powderblue" }]}
            onPress={this.onSubmit}
          >
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <Toast position="top" ref={(toast) => (this.toast = toast)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
  btn: {
    marginHorizontal: 5,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps, actions)(AddEntry);
