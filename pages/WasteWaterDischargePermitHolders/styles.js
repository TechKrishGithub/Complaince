import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 30,
  },
  stepView: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    height: Platform.OS === "ios" ? height / 18 : height / 15,
    width: width / 1.18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginBottom: 14,
    fontFamily: "OpenSans-Regular",
  },
  title: {
    fontSize: 15,
    fontWeight: "900",
    marginHorizontal: 10,
    color: "gray",
    paddingTop: 10,
    fontFamily: "OpenSans-ExtraBold",
  },
  text: {
    fontSize: 13,
    textAlign: "justify",
    marginHorizontal: 12,
    marginTop: 5,
    color: "gray",
    fontFamily: "OpenSans-Regular",
  },
  qualityTableContainer: {
    flex: 1,
  },
  resultInput: { marginTop: 15, marginHorizontal: 17, width: 320 },
});

export default styles;
