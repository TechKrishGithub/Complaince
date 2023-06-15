import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'flex-start',
    backgroundColor: "#f4fbfd",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  input: {
    width: 300,
    height: Platform.OS === "ios" ? 42 : 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 300,
    height: Platform.OS === "ios" ? 42 : 45,
    backgroundColor: "#3A88C8",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "OpenSans-SemiBold",
  },
  forgotPasswordText: {
    marginTop: 10,
    textDecorationLine: "underline",
    color: "blue",
  },
  authViewContainer: {
    flex: 1,
    marginVertical: 40,
    backgroundColor: "#f4fbfd",
  },
  successText:
  {
    paddingBottom:5,
    color:'green'
  },
  errorText:
  {
    paddingBottom:5,
    color:'red'
  },
  signInText:
  {
    padding:10,
    fontSize:13,
    fontWeight:'400'
  }
});

export default styles;
