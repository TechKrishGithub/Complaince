import { StyleSheet, Dimensions, Platform } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
    marginHorizontal: 4,
    marginLeft: 14,
    marginRight: Platform.OS === "ios" ? 20 : 40,
  },
  locationAddressView: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginLeft: Platform.OS === "ios" ? 14 : 15,
    marginRight: Platform.OS === "ios" ? 22 : 40,
  },
  field: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    height: Platform.OS === "ios" ? height / 17.8 : height / 15,
  },
});

export default styles;
