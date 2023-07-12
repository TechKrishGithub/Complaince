import React, { useState } from 'react';
import { Text,View,TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { Foundation } from '@expo/vector-icons';
import db from '../../permitsDb';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';

const SyncingData=(props)=> {
    const {
        permitNumber,
        matchingFactors,
        scoresData,
        user
    }=props;

    const [isLoading, setIsLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const [showClearData, setShowClearData] = useState(false);
    const [dots, setDots] = useState('');

    // const isNurseryFound = syncedData.some(obj => obj.NurseryName.includes(nursery));

    useEffect(()=>
    {
        const interval = setInterval(() => {
          setDots((prevDots) => {
            if (prevDots.length === 5) {
              return '';
            } else {
              return prevDots + '.';
            }
          });
        }, 500);
        return () => clearInterval(interval);
    },[])


    const filtedScores=scoresData?.filter(
        (question)=>question.PermitNumber==permitNumber
    )

  
    const syncData=()=>
    {
        const Updated=matchingFactors.map(v=>
            {

               return {
                ...v, // Keep the existing properties of the object
                userid: user
              };
            })

            const modifiedData = Updated.map(item => {
                if (item.permitTypeId === 'GROUNDWATER PERMIT') {
                  return { ...item, permitTypeId: 'Ground Water' };
                }
               else if (item.permitTypeId === 'CONSTRUCTION') {
                    return { ...item, permitTypeId: 'Construction' };
                  }

               else if (item.permitTypeId === 'SURFACE WATER PERMIT') {
                    return { ...item, permitTypeId: 'Surface Water' };
                  }
                  else if (item.permitTypeId === 'DRILLING PERMIT') {
                    return { ...item, permitTypeId: 'Drilling' };
                  }
                  else if (item.permitTypeId === 'WASTEWATER DISCHARGE') {
                    return { ...item, permitTypeId: 'Waste Water Discharge' };
                  }

                return item;
              });

       const newData=filtedScores.map(v=>
        {

            return {
                ...v,
                typeofpermit: modifiedData[0].permitTypeId,
              };
        })
        console.log(newData)
    }


    const syncDataQc=async ()=>
    {
      const netInfo = await NetInfo.fetch();
      const isConnected = netInfo.isConnected; 
      if (isConnected==false) {
        Alert.alert(
          'No Network Connection',
          'Please connect to a network For Send Data and try again.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }

      else
      {
        setIsLoading(true);
      if(isLoading)
      {
        loadDots();
      }
          const filteredNurseryAuditEntry = nurAudEntry.filter(obj => obj.nursery === nursery);
          const filteredNurseryAuditAnswers=nurAudAns.filter(obj=>obj.nursery===nursery);
  
          const newAnswersAfterRemovingNursery = filteredNurseryAuditAnswers.map(obj => {
              if (obj.nursery === nursery) {
                const { nursery,id, ...rest } = obj;
                return rest;
              }
              return obj;
            });
  
          const filteredObservations=nurObserData.filter(obj=>obj.Nusery===nursery);
          const newObservationsAfterRemovingNursery = filteredObservations.map(obj => {
              if (obj.Nusery === nursery) {
                const { Nusery,id, ...rest } = obj;
                return rest;
              }
              return obj;
            });
          const filteredCorrectiveActions=correctiveData.filter(obj=>obj.Nursery===nursery);
  
          const newCorrectiveActionsAfterRemovingNursery = filteredCorrectiveActions.map(obj => {
              if (obj.Nursery === nursery) {
                const { Nursery,id, ...rest } = obj;
                return rest;
              }
              return obj;
            });
  
           
            newAnswersAfterRemovingNursery.forEach((item) => {
              item.score = item.maxscore;
              delete item.maxscore;
            });
            
            const updatedMyAnswers = newAnswersAfterRemovingNursery.map((item) => {
              const matchingQuestion = forQuestionIdAndMaxScore.find((q) => q.question === item.question);
            
              if (matchingQuestion) {
                return {
                  ...item,
                  questionsid: matchingQuestion.questionsid,
                  maxscore: matchingQuestion.maxscore,
                };
              }
            
              return item;
            });
  
            const addNurseryId = (forNurId, filteredNurseryAuditEntry) => {
              return filteredNurseryAuditEntry.map(item => {
                const matchedNursery = forNurId.find(nursery => nursery.nurseryname === item.nursery);
            
                if (matchedNursery) {
                  return { ...item, nurseryid: matchedNursery.nurseryid };
                }
            
                return item;
              });
            };
            
            const updatedNurseryEntryDetails = addNurseryId(forNurId, filteredNurseryAuditEntry);
  
            const modifiedNurseryAnswers= updatedMyAnswers.map(obj => {
              return {
                ...obj, // Keep the existing properties of the object
                nurseryid: updatedNurseryEntryDetails[0].nurseryid
              };
            });
            
  
              const modifiedDataEntry = updatedNurseryEntryDetails.map(item => {
                const speciesArray = JSON.parse(item.species);
                const modifiedSpecies = "{" + speciesArray.join(",") + "}";
                
                const modifiedItem = {
                  ...item,
                  species: modifiedSpecies
                };
            
                return modifiedItem;
              });
          
              modifiedDataEntry[0].userid = userDetails[0].userid;

              const modifiedData = modifiedDataEntry.map(item => {
                const modifiedItem = { ...item };
            
                // Modify the specific properties where the value is "0"
                if (modifiedItem.BothRequisitesHaveBeenMet === "0") {
                  modifiedItem.BothRequisitesHaveBeenMet = "No";
                }
            
                if (modifiedItem.HoldingCapacity === "0") {
                  modifiedItem.HoldingCapacity = "No";
                }
            
                if (modifiedItem.SeedfromNationallyRecommendedSources === "0") {
                  modifiedItem.SeedfromNationallyRecommendedSources = "No";
                }
            
                return modifiedItem;
              });
            
            
              setIsLoading(true);
            fetch("http://182.18.181.115:8084/api/Complaince/synchnurseryauditdtls", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              NurseryEntryDetails:modifiedData,
              NurseryAnswersDetails:modifiedNurseryAnswers,
              NurseryObservation:newObservationsAfterRemovingNursery,
              CorrectiveAction:newCorrectiveActionsAfterRemovingNursery                    
            })
          })
            .then(response => response.json()).
            then(responseData=>JSON.parse(responseData))                   
            .then(data=>{
             if(data=='Synched')
             {
              setIsLoading(false)
              setResponseStatus('Yes');

              setShowClearData(true);
              dataInsertToAfterDataSyncTable(updatedNurseryEntryDetails[0].nurseryid);
              myStatus('Yes')
            }
            else
            {
             Alert.alert('WARNING','Sorry Data Not Sended,Please Try Again');
             setIsLoading(false)
            }
            }
            ).catch((error) => {
              // Handle any error that occurred during the fetch request
              console.error(error);
            })
            .finally(() => {
              // Set isLoading to false after the fetch request is complete
              setIsLoading(false);
              myStatus('Yes')
            });

      }

    }

    const dataInsertToAfterDataSyncTable=(myNurId)=>
    {
      db.transaction(tx=>
        {
          tx.executeSql('INSERT INTO NurseriesAfterSyncingData(NurseryName,nurseryid) VALUES(?,?)',
          [nursery,myNurId],
          (tx,resullt)=>
          {
            console.log('Data Inserted Into Local Vericationd Table');
        
        })
    })
  }

  const DeleteData=()=>
  {
    Alert.alert('WARNING','Do you want to clear the data? This data will not be available further. Please confirm',
    
    [{text:'confirm',
    onPress:()=>{
      db.transaction(tx => 
      {
        tx.executeSql(
          'DELETE FROM NurseryAuditEntryDetails WHERE nursery = ?',
          [nursery]
        );
        tx.executeSql(
          'DELETE FROM NurseryAuditAnswers WHERE nursery = ?',
          [nursery]
        );
        tx.executeSql(
          'DELETE FROM NurseryObservation WHERE Nusery = ?',
          [nursery]
        );
        tx.executeSql(
          'DELETE FROM CorrectiveAction WHERE nursery = ?',
          [nursery],
          (_, result) => {
          },
        );
        tx.executeSql(
          'DELETE FROM NurseriesAfterSyncingData WHERE NurseryName = ?',
          [nursery],
        );
        tx.executeSql('INSERT INTO NurseriesAfterClearingData(nursery) VALUES(?)',
        [nursery],
        (_, result) => {
          myStatus('Yes')
         console.log('success')
        },
        );
       
      }
      
      );

    }
  },
    {text:'cancel'}
  ]
    )
  
  }


    return (
     <View>
      {!isLoading?
       <TouchableOpacity  onPress={syncData}
       style={{justifyContent:'flex-end'}}
       >
         <View style={[styles.buttonContainerDetails]}>
            <Text style={styles.buttonTextDetails}>sync</Text>
         </View>
     </TouchableOpacity>
     :
     null
      }
       {isLoading&&
        <View style={styles.sending}>
        <Text style={styles.sendingText}>Sending {dots}</Text>
        </View>
        }
        {/* {
          isNurseryFound&&
          <View style={{flexDirection:'row',padding:5,alignItems:'center',justifyContent:'center'}}>
          <Text style={{paddingRight:10,fontWeight:'bold',color:'green',fontSize:10}}>Data submitted successfully.</Text>
          <Foundation name="checkbox" size={20} color="green"/>
          <TouchableOpacity 
          onPress={DeleteData}
         style={{justifyContent:'center',alignItems:'center',paddingLeft:30}}
          >
         <View style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Data</Text>
         </View>
          </TouchableOpacity>
          </View>
        } */}
     </View>
      
    )
}

export default SyncingData;

