import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8F8F8',
    
  },
  
  cardContainer: {
    borderRadius: 10,
    marginVertical: 15,
    elevation: 3,
    
  },
  cardHeader: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize:15,
    fontWeight: 'bold',
    color: '#2455b9'
  },
  iconContainer: {
    marginLeft: 16,
  },
  cardDivider: {
    marginBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    flex: 1,
    fontWeight: '500',
    color: '#00256b',
  },
  infoValue: {
    flex: 2,
  },
  infoContainer: {
    backgroundColor: '#effcfd',
    padding: 10,
    marginTop: 2,
    borderRadius:8,
  },
  match:
  {
    borderBottomColor:'#4a4e54',
    borderBottomWidth:0.5,
    paddingBottom:10
  },
  length:
  {
    paddingBottom:5,
    paddingLeft:4,
    fontWeight:'bold',
    color:'#8ba1d6'
  }
});

export default styles;