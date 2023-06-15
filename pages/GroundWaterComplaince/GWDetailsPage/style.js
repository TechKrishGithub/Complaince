import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: "flex-start",
    marginBottom: 50,
    marginTop: 5,
  },
  loader: {
    fontSize: 24,
  },
  questionRowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 0.1,
    marginHorizontal: 12,
  },
  userView: {
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  scoreInput: {
    height: 45,
    padding: 10,
    width: 60,
    borderWidth: 1,
    borderColor: "gray",
    marginHorizontal: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  textLabel: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "left",
    padding: 10,
    marginLeft: 20,
    marginVertical: 10,
    marginTop: Platform.OS === "ios" ? 5 : 15,
  },
  badgeView: {
    position: "absolute",
    top: -20,
    padding:5,
    fontWeight:'500',
    right: Platform.OS === "ios" ? 205 : 220,
    maxWidth: 100,
  },
  criteriaNameStyle:
  {
    color:'blue',
    margin:10,
    fontWeight: 'bold',
    textDecorationColor:'blue',
    textDecorationLine:'underline'
  },
  error:
  {
    padding:5,
    marginLeft:10,
    color:'red'
  }
});

export default styles;
