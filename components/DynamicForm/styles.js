import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  delete: {
    color: "red",
    marginLeft: 8,
  },
  add: {
    color: "blue",
    marginTop: 8,
  },
  addItemText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
  },
  addItemView: {
    height: 38,
    backgroundColor: "#3A88C8",
    marginHorizontal: 0,
    borderRadius: 4,
    justifyContent: "center",
    width: 100,
  },
});

export default styles;
