import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    buttonContainerDetails: {
        backgroundColor: '#057d7b',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center'
      },
      buttonTextDetails: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
      },
      sending:
      {
        justifyContent:'center',
        alignItems:'center'
      },
      sendingText:
      {
        fontWeight:'bold',
        color:'blue'
      },
      clearButton:
      {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      clearButtonText:
      {
        color: '#fff',
        fontSize:12,
        fontWeight: 'bold',
      }
})

export default styles;