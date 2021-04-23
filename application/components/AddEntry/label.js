import React from "react";
import { Text, View } from "react-native";

const Label = (props) => {
  return (
    <View style={{ width: "80%", marginTop: 5 }}>
      <Text style={{ color: props?.color || "white" }}>
        {props.children || ""}
      </Text>
    </View>
  );
};

export default Label;
