import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import * as actions from "./../../redux/actions";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makeEntry: false,
      showAll: true,
      dailyView: false,
      monthlyView: false,
      data: [],
      filterByCategory: false,
      category: this.props.categories[0],
    };
  }

  componentDidMount() {
    this.filterData(this.props.data);
  }
  UNSAFE_componentWillReceiveProps(next) {
    if (next.data.length >= this.props.data.length) {
      this.filterData(next.data);
    }
  }
  closeModal = () => {
    this.setState({ makeEntry: false });
  };
  filterData = (data) => {
    const list = data || [...this.props.data];
    const currentDate = new Date();
    if (this.state.monthlyView) {
      const newData = list.filter((element) => {
        const date = new Date(element.dateStamp);
        if (
          date.getFullYear() === currentDate.getFullYear() &&
          date.getMonth() === currentDate.getMonth()
        ) {
          if (this.state.filterByCategory) {
            if (
              this.state.category &&
              element.category === this.state.category
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
        return false;
      });
      this.setState({ data: newData });
    } else if (this.state.dailyView) {
      const newData = list.filter((element) => {
        const date = new Date(element.dateStamp);
        if (
          date.getFullYear() === currentDate.getFullYear() &&
          date.getMonth() === currentDate.getMonth() &&
          date.getDate() === currentDate.getDate()
        ) {
          if (this.state.filterByCategory) {
            if (
              this.state.category &&
              element.category === this.state.category
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }
        return false;
      });
      this.setState({ data: newData });
    } else {
      if (this.state.filterByCategory) {
        const newData = list.filter((element) => {
          if (this.state.category && element.category === this.state.category) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({ data: newData });
      } else {
        this.setState({ data: list });
      }
    }
  };
  keyExtractor = (item, index) => item.dateStamp;
  renderRow = ({ item }) => {
    const color = { ...this.props.theme };

    return (
      <View style={styles.rowStyle}>
        <Text style={[styles.rowItem, { color: color.fontColor }]}>
          {item.title}
        </Text>
        <Text style={[styles.rowItem, { color: color.fontColor }]}>
          {item.category}
        </Text>
        <Text style={[styles.rowItem, { color: color.fontColor }]}>
          {item.amount}
        </Text>
      </View>
    );
  };
  changeTheme = () => {
    this.props.changeTheme(
      this.props.selectedTheme === "light" ? "dark" : "light"
    );
  };
  enableCategoryFilter = () => {
    this.setState(
      {
        filterByCategory: !this.state.filterByCategory,
      },
      this.filterData
    );
  };
  render() {
    const color = { ...this.props.theme };
    return (
      <View
        style={[styles.container, { backgroundColor: color.backgroundColor }]}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: Dimensions.get("window").height * 0.9,
            paddingTop: 100,
          }}
        >
          <StatusBar
            style={this.props.selectedTheme === "light" ? "dark" : "light"}
          />

          <View style={styles.btnSection}>
            <TouchableOpacity
              onPress={() => {
                if (!this.state.showAll) {
                  this.setState(
                    { showAll: true, monthlyView: false, dailyView: false },
                    this.filterData
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.buttons,
                  {
                    backgroundColor: this.state.showAll
                      ? color.primaryColor
                      : color.secondaryColor,
                  },
                ]}
              >
                {"all expenses"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!this.state.dailyView) {
                  this.setState(
                    { showAll: false, monthlyView: false, dailyView: true },
                    this.filterData
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.buttons,
                  {
                    backgroundColor: this.state.dailyView
                      ? color.primaryColor
                      : color.secondaryColor,
                  },
                ]}
              >
                {"today"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!this.state.monthlyView) {
                  this.setState(
                    { showAll: false, monthlyView: true, dailyView: false },
                    this.filterData
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.buttons,
                  {
                    backgroundColor: this.state.monthlyView
                      ? color.primaryColor
                      : color.secondaryColor,
                  },
                ]}
              >
                {"this month"}
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.data && this.state.data.length ? (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.data}
              extraData={this.state}
              renderItem={this.renderRow}
              ListHeaderComponent={
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                    width: Dimensions.get("window").width * 0.8,
                    flex: 1,
                  }}
                >
                  <Text style={[styles.rowHeader, { color: color.fontColor }]}>
                    {"title"}
                  </Text>
                  <Text style={[styles.rowHeader, { color: color.fontColor }]}>
                    {"category"}
                  </Text>
                  <Text style={[styles.rowHeader, { color: color.fontColor }]}>
                    {"amount"}
                  </Text>
                </View>
              }
            />
          ) : (
            <Text style={{ color: color.fontColor }}>No data to display</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: color.fontColor }}>filter by category</Text>
          <Switch
            trackColor={{
              false: color.secondaryColor,
              true: color.secondaryColor,
            }}
            thumbColor={this.props.theme.primaryColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.enableCategoryFilter}
            value={this.state.filterByCategory}
          />
          {this.state.filterByCategory ? (
            <View style={{ borderWidth: 1, backgroundColor: "#fefefe" }}>
              <Picker
                style={{
                  height: 30,
                  height: 40,
                  width: 150,
                }}
                selectedValue={this.state.category}
                mode="dropdown"
                prompt="pick a category"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ category: itemValue }, this.filterData)
                }
              >
                {this.props.categories.map((element) => (
                  <Picker.Item key={element} label={element} value={element} />
                ))}
              </Picker>
            </View>
          ) : null}
        </View>
        <View
          style={{
            margin: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            right: 10,
            top: 60,
          }}
        >
          <Text style={{ color: color.fontColor }}>toggle theme</Text>
          <Switch
            trackColor={{
              false: color.secondaryColor,
              true: color.secondaryColor,
            }}
            thumbColor={this.props.theme.primaryColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.changeTheme}
            value={this.props.selectedTheme === "light"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rowItem: {
    flex: 1,
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginRight: 10,
  },
  rowHeader: {
    flex: 1,
    fontWeight: "bold",
  },
  btnSection: {
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.8,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  rowStyle: {
    flexDirection: "row",
    height: 20,
    width: Dimensions.get("window").width * 0.8,
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    data: state.data,
    categories: state.categories,
    theme: state.theme.theme,
    selectedTheme: state.theme.selectedTheme,
  };
}

export default connect(mapStateToProps, actions)(Application);
