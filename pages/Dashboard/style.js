import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container: {
        flex: 1,
         
        // backgroundColor: '#F5F5F5'
        // backgroundColor:'rgba(198, 227, 228,0.5)'
      },
      header: {
        height: 50,
        //  backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333333',
      },
      content: {
        flex: 1
      },
      infoBlock: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      },
      infoBlockHeading: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#252aba',
        marginBottom: 10,
        borderBottomColor:'#dedeef',
        padding:10,
        borderBottomWidth:0.5
      },
      infoBlockContent: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#007AFF',
      },
})

export default styles;