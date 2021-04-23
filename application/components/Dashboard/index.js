import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makeEntry: false,
      showAll: true,
      dailyView: false,
      monthlyView: false,
      data: [],
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
          return true;
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
          return true;
        }
        return false;
      });
      this.setState({ data: newData });
    } else {
      this.setState({ data: list });
    }
  };
  keyExtractor = (item, index) => item.dateStamp;
  renderRow = ({ item }) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={styles.rowItem}>{item.title}</Text>
        <Text style={styles.rowItem}>{item.category}</Text>
        <Text style={styles.rowItem}>{item.amount}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
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
                    ? "powderblue"
                    : "lightgrey",
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
                    ? "powderblue"
                    : "lightgrey",
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
                    ? "powderblue"
                    : "lightgrey",
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
                <Text style={styles.rowHeader}>{"title"}</Text>
                <Text style={styles.rowHeader}>{"category"}</Text>
                <Text style={styles.rowHeader}>{"amount"}</Text>
              </View>
            }
          />
        ) : (
          <Text>No data to display</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: Dimensions.get("window").height * 0.7,
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
  };
}

export default connect(mapStateToProps, null)(Application);
