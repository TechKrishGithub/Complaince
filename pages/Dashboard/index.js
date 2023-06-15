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
            setLoading(false)
          }
          )
      })
  }



  const onScreenFocus = useCallback(() => {
    getDetails();
    setLoading(true);
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
          <DashboardData scoresData={scoresData} complFactData={complFactData} navigation={navigation} complainceData={complainceData}/>
        </View>
       :
       <View style={[styles.infoBlock,{margin:16}]}>
          <Text style={styles.infoBlockHeading}>Compliance Applications</Text>
       <Text style={{fontWeight:'bold',color:'#495309',marginLeft:20}}>Data Not Found !</Text>
       </View>
      }
      </View>

         </View>
         </ScrollView>
    )
}

export default Dashboard;

