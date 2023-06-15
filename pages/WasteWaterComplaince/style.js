import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  userView: {
    flex: Platform.OS === "ios" ? 0.034 : 0.046,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: Platform.OS === "ios" ? 16 : 18,
    width: 355,
    alignContent: "center",
    alignItems: "center",
    padding: 13,
    borderRadius: 5,
    // backgroundColor: "lightgrey",
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 15,
  },
  userlabel: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "700",
    color: "gray",
  },
});

export default styles;
