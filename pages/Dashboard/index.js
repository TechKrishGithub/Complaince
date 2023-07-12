import React, { 
  useEffect,
  useState,
  useCallback
} from 'react';
import { Text, View,ScrollView } from 'react-native'
import styles from './style';
import DashboardData from '../DashboardData';
import db from '../../permitsDb';
import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/base';
import Spinner from 'react-native-loading-spinner-overlay';

const Dashboard=({navigation})=> {
  const [scoresData,setScoresData]=useState([]);
  const [complFactData,setComplFactData]=useState([]);
  const [complainceData,setComplainceData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [user,setUser]=useState([]);

  

  const getDetails=()=>
  {
    db.transaction(tx=>
      {
        tx.executeSql("SELECT * FROM ScoresTable",
        [],
        (_,{rows})=>
        {
          setScoresData(rows._array);
        }
        )
        tx.executeSql("SELECT * FROM ComplianceFactersAfterUpdating",
        [],
        (_,{rows})=>
        {
          setComplFactData(rows._array)
        }
        )
        tx.executeSql('SELECT * FROM ComplianceFacters',
          [],
          (_, { rows })=>
          {
            setComplainceData(rows._array);
          }
          )
          tx.executeSql(
            'SELECT * FROM User_Master',
            [],
            (_, { rows }) => setUser(rows._array[0].userid)
            )
      })
  }



  const onScreenFocus = useCallback(() => {
    getDetails();
    setLoading(true);
    setTimeout(()=>
    {
      setLoading(false)
    },500)
    setTimeout(()=>
    {
      getDetails();
    },100)
    // Perform any actions you want when the screen gains focus
  }, []);

  useFocusEffect(onScreenFocus);
  
  useEffect(()=>
  {
    setLoading(true);
    setTimeout(()=>
    {
      setLoading(false)
    },500)
    getDetails();
    setTimeout(()=>
    {
      getDetails();
    },100)
  },[])


    return (
      <ScrollView style={{backgroundColor:'#d6f3f6'}}>
    <View style={styles.container}>
  {/* <Button
  title="know"
  onPress={()=>{console.log(socresData)}}
  /> */}
      <View style={styles.content}>
        <Spinner
          visible={loading} 
          size="small"
          color="#121834"
        />
      {complFactData.length>0?
        <View>
          <DashboardData scoresData={scoresData} complFactData={complFactData} navigation={navigation} complainceData={complainceData} user={user}/>
        </View>
       :
       <View style={[styles.infoBlock,{margin:16,flexDirection:'row',justifyContent:'space-between'}]}>
          <Text style={styles.infoBlockHeading}>Compliance Applications</Text>
          <Text style={[styles.infoBlockHeading,{ fontWeight:'bold',color:'#8ba1d6'}]}>(0)</Text>
       
       </View>
      }
      </View>

         </View>
         </ScrollView>
    )
}

export default Dashboard;

