import React, { useEffect, useState } from "react";
import { View, ScrollView,Text,Animated } from "react-native";
import { ListItem } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import db from "../../permitsDb";
import { Feather } from '@expo/vector-icons';

//import data from "../../constants";

const AccordianList = (props) => {
  const { navigation, data,seletedQuarter, permitNumber,forTick,year} = props;
  const [expanded, setExpanded] = useState(false);
  const [error,setError]=useState('');
  const [count,setCount]=useState(1);
  const [countForPN,setCountForPN]=useState(1);
  const [textShake] = useState(new Animated.Value(0));

 


  const handleButtonClick = () => {
    Animated.sequence([
      Animated.timing(textShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(textShake, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(textShake, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(textShake, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const animatedStyle = {
    transform: [{ translateX: textShake }]
  };


  const filteredMYTick=forTick.filter(v=>v.PermitNumber === permitNumber)

  const log = (l, i) => {
    navigation.navigate("GW Details Page", { complainceData: l, id: i ,seletedQuarter:seletedQuarter, permitNumber:permitNumber,year:year});
  };

  return (
    <View style={{ paddingBottom: 30, flex: 1, marginTop: 10 }}>
        {error?
        <Animated.Text style={[{color:'red',padding:10},animatedStyle]}>{error}</Animated.Text>
              // <Text style={{color:'red',padding:10}}>
              //   {error}
              // </Text>
              :
              null
        }
      <ListItem.Accordion
        content={
          <>
            <Entypo name="water" size={20} style={{ marginRight: 10 }} />
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 18, fontWeight: "800" }}>
                Complaince List
              </ListItem.Title>
            
            </ListItem.Content>
            
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          if(seletedQuarter&&permitNumber)
          {
            setError('');
            setCount(1);
            setExpanded(!expanded);
          }
          else
          {
            if(!permitNumber)
            {
              setError('Sorry Please Enter Permit Number !');
              setCount(count+1);
              if(count>1)
              {
                handleButtonClick();
              }
            }
            else
            {
              setCount(count+1);
              if(count>1)
              {
                handleButtonClick();
                console.log(permitNumber)
              }
              setError('Sorry Please select Quater !');
            }
          }
        }}
      >
        <ScrollView>
          {data &&
            data?.map((l, i) => 
            {
              
              const myTick=filteredMYTick.find(v=>v.factorId === l.factorId);
              return(
              <ListItem
                key={i}
                onPress={() => {
                  log(l, i);
                }}
                bottomDivider
                animation={"350ms"}
              >
                <ListItem.Content>
                  <ListItem.Title style={{padding:10}}>
                     <View style={{flexDirection:'row'}}>
                    <Text>{l?.factorName}</Text>
                    {myTick&&
                    <View style={{paddingLeft:20}}>
                    <Feather name="check-circle" size={20} color="green"/>
                    </View>
                    }
                  </View>
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{ fontSize: 14, fontWeight: "300", padding: 4 }}
                  >
                    {l?.factorDescription}
                  </ListItem.Subtitle>
                </ListItem.Content>

                <ListItem.Chevron />
              </ListItem>
            )})}
        </ScrollView>
      </ListItem.Accordion>
    </View>
  );
          
};

export default AccordianList;
