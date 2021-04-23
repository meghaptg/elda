import React from "react";
import { Text, View } from "react-native";

const Label = (props) => (
  <View style={{ width: "80%", marginTop: 5 }}>
    <Text>{props.children || ""}</Text>
  </View>
);

export default Label;
