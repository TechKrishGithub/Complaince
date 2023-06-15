import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity  } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';



const DashboardData = (props) => {
  const { complFactData, navigation, complainceData, scoresData } = props;

  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedPermitNumbers, setExpandedPermitNumbers] = useState([]);


  const log = (v) => {
    navigation.navigate('GW Details Page', {
      complainceDataUpdated: v,
      scoresData: scoresData,
    });
  };

  const PendingOne=(factorId,permitNumber)=>
  {
    navigation.navigate('GW Details Page', {
      complainceData: factorId,
      permitNumber:permitNumber
    });
   
  }

  const EditPress=(factorId,permitNumber)=>
  {
    navigation.navigate('GW Details Page', {
      complainceDataEdit: factorId,
      permitNumberEdit:permitNumber,
      scoresData:scoresData
    });
  }

  

  const groupedData = {};
  complFactData.forEach((v) => {
    const key = v.permitTypeId;
    if (groupedData[key]) {
      groupedData[key].push(v);
    } else {
      groupedData[key] = [v];
    }
  });

  const handleCardExpand = (permitTypeId) => {
    setExpandedCard((prevState) => (prevState === permitTypeId ? null : permitTypeId));
    setExpandedPermitNumbers([]);
  };
 
  
  const handlePermitNumberExpand = (permitNumber) => {
    setExpandedPermitNumbers((prevState) => {
      if (prevState.includes(permitNumber)) {
        // Close the clicked permit number
        return prevState.filter((num) => num !== permitNumber);
      } else {
        // Close the previously expanded permit number and expand the clicked one
        return [permitNumber];
      }
    });
  };
  

  return (
    <ScrollView style={styles.container}>
      {Object.keys(groupedData).map((permitTypeId) => {
        const permitNumbers = Array.from(
          new Set(groupedData[permitTypeId].map((data) => data.PermitNumber))
        );
        
        const Status=complainceData.filter(v=>v.permitTypeId==permitTypeId);
       
      
        const isCardExpanded = permitTypeId === expandedCard;

        return (
          <Card key={permitTypeId} containerStyle={styles.cardContainer}>
            <TouchableOpacity activeOpacity={1}  style={styles.cardHeader} onPress={()=>handleCardExpand(permitTypeId)}>
              
            
              <Text style={[styles.cardTitle, isCardExpanded && {color:'#3f978e',fontSize:13}]}>
                  {permitTypeId}
                </Text>

           <View style={{flexDirection:'row'}}> 
          <Text style={styles.length}>({permitNumbers.length})</Text>
              <Icon
                name={isCardExpanded ? 'expand-less' : 'expand-more'}
                type="material"
                size={24}
                color="#666666"
                containerStyle={styles.iconContainer}
                onPress={() => handleCardExpand(permitTypeId)}
              />
             </View>
            </TouchableOpacity  >
            {isCardExpanded&&<Card.Divider style={styles.cardDivider} />}
            {isCardExpanded && (
              <View style={styles.contentContainer}>
                {permitNumbers.map((permitNumber, index) => {
                  
                  const matchingFactors = complFactData.filter(
                    (factor) =>
                    factor.permitTypeId === permitTypeId &&
                    factor.PermitNumber === permitNumber
                  );
                  
                 
                
                  const allFactorsPresent =matchingFactors.length
                 
                  const isPermitNumberExpanded = expandedPermitNumbers.includes(permitNumber);

                  return (
                    <View key={index} style={styles.match}>
                         <View style={styles.cardHeader}>
                              <Text style={styles.cardTitle}></Text>
                      {allFactorsPresent && (
                   isPermitNumberExpanded?
                 <Icon
                 name="eye-off"
                 type="material-community"
                 size={24}
                 color="black"
                 containerStyle={[styles.iconContainer, { padding: 5 }]}
                 onPress={() => handlePermitNumberExpand(permitNumber)}
                 />
                
                  :
             <Icon
             name='eye'
             type="foundation"
             size={27}
             color="black"
             containerStyle={[styles.iconContainer,{padding:5}]}
             onPress={() => handlePermitNumberExpand(permitNumber)}
           />
                 )}
                 </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Permit Number</Text>
                        <Text style={styles.infoValue}>: {permitNumber}</Text>
                        
                      </View>
                      <View style={styles.infoRow}>
                           <Text style={styles.infoLabel}>User Name</Text>
                           <Text style={styles.infoValue}>: WEIS</Text>
                            </View>
                            <View style={styles.infoRow}>
                           <Text style={styles.infoLabel}>Year</Text>
                          <Text style={styles.infoValue}>: {new Date().getFullYear()}</Text>
                           </View>
                           <View style={styles.infoRow}>
                           <Text style={styles.infoLabel}>Status</Text>
                          <Text style={[styles.infoValue,matchingFactors.length==Status.length?{color:'green'}:{color:'red'}]}>: {matchingFactors.length==Status.length?'Completed':'InProgress'}</Text>
                           </View>
                      {isPermitNumberExpanded && (
                        <View style={styles.infoContainer}>
                          {Status.map((factor) => 
                          {                       
                            const Completed=matchingFactors.some((o) => o.factorName === factor.factorName)
                            const completedFactors=matchingFactors.find((o) => o.factorName === factor.factorName)
                          
                          return(
                            <View key={factor.factorId} >
                              {completedFactors&&
                              <View style={styles.cardHeader}>
                              <Text style={styles.cardTitle}></Text>
                              <Icon
                              name="preview"
                              type="material"
                              size={24}
                              color="#4248a6"
                              containerStyle={[styles.iconContainer,{padding:10}]}
                              onPress={() => {
                                log(completedFactors);
                                  }}
                               />
                           </View>
                          }
                             <View  style={styles.infoRow}>
                              
                             <Text style={styles.infoLabel}>Complain Name</Text>
                             <Text style={styles.infoValue}>: {factor.factorName}</Text>
                             
                            </View>
                          {completedFactors&&
                            <View  style={styles.infoRow}>
                             <Text style={styles.infoLabel}>Quarter</Text>
                             <Text style={styles.infoValue}>: {completedFactors?completedFactors.Quarter:factor.Quarter}</Text>
                            </View>
                          }
                            

                            <View  style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Status</Text>
                            {Completed?
                            
                            <Text style={[styles.infoValue,{color:'#3eae4f'}]}> :Compeleted</Text> 
                            :
                            <TouchableOpacity 
                            style={styles.infoValue}
                            onPress={() => {
                              PendingOne(factor,permitNumber);
                                }}
                            >
                              <Text style={[styles.infoValue,{
                                fontWeight:'500',
                                color: '#633606',
                                textDecorationLine:'underline',
                                textDecorationColor:'blue'
                              }]}>
                              :Pending
                              </Text>
                              </TouchableOpacity>
                          }
                          {Completed&&
                          <TouchableOpacity
                          onPress={()=>EditPress(completedFactors,permitNumber)}
                          style={{
                            borderWidth:0.5,
                            borderColor:'#b5e4e7',
                            borderRadius:5,
                            padding:1,
                            // backgroundColor:'#b5e4e7'
                          }}
                          >
                          <AntDesign name="edit" size={24} color="blue" />
                          </TouchableOpacity>
                          }
                          
                            </View>
      
                            <Card.Divider style={styles.cardDivider} />
                            </View>
                            
                          )}
                          )}
                       
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default DashboardData;





  