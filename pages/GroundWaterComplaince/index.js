import React, { useEffect, useState,useCallback } from "react";
import { View, Text, Alert } from "react-native";
import data from "../../constants";
import { AccordianList, DropDownSearch } from "../../components";
import styles from "./style";
import { getComplainceCategories } from "../../config/api";
import { apiEndpoints } from "../../config/endpoints/index";
import db from "../../permitsDb";
import { Button } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import DropDown from "../../components/DropDown";

const GroundWaterComplaince = (props) => {
  const { navigation } = props;
  const [selectedPermit, setIsselectedPermit] = useState(null);
  const [seletedQuarter, setSelectedQuarter] = useState(null);
  const [complainceData, setComplainceData] = useState([]);
  const [forTick,setForTick]=useState([]);
  const [year,setYear]=useState('');

  const onChangePermit = (permit) => {
    setIsselectedPermit(permit);
    getMyTick(permit);
    setSelectedQuarter(null)
  };
  const onChangeQuarter = (quarter) => {
    setSelectedQuarter(quarter);
    quarter=='Q1 - Jul to Sept'||quarter=='Q2 - Oct to Dec'?setYear(new Date().getFullYear()-1):setYear(new Date().getFullYear())
  };


  const getMyTick=()=>
  {

    db.transaction(tx=>
      {
        tx.executeSql("select * from ComplianceFactersAfterUpdating where permitTypeId=?",
          ['GROUNDWATER PERMIT'],
          (_,{ rows })=>
          {
            if(rows.length>0)
            {
                setForTick(rows._array);
            }
          })
      })
  }

  const getComplainceCategories = async () => {
    try {
      db.transaction(tx=>
        {
          tx.executeSql('SELECT * FROM ComplianceFacters where permitTypeId=?',
          ['GROUNDWATER PERMIT'],
          (_, { rows })=>
          {
            setComplainceData(rows._array)
          }
          )
        })
    }
     catch (error) {
      console.error(error);
      Alert.alert("PERMITS", "Data Not Getting Try Again");
    }
  };

  useEffect(() =>
   {
    getComplainceCategories();
    getMyTick();
    setTimeout(()=>
    {
      getComplainceCategories();
      getMyTick();
    },500)
  }, []);

  
  const onScreenFocus = useCallback(() => {
    getComplainceCategories();
    getMyTick();
    setTimeout(()=>
    {
      getMyTick();
      getComplainceCategories();
    },500)
    
    // Perform any actions you want when the screen gains focus
  }, []);

  useFocusEffect(onScreenFocus);

    const getData=()=>
    {
      db.transaction(tx=>
        {
          tx.executeSql('SELECT * FROM ComplianceFacters where permitTypeId=?',
          ['GROUNDWATER PERMIT'],
          (tx,result)=>
          {
            for(let i=0;i<result.rows.length;i++)
            {
              const {factorId,factorName,factorDescription,permitTypeId}=result.rows.item(i);
              console.log(`factorId:${factorId},factorName:${factorName},factorDescription:${factorDescription},permitTypeId:${permitTypeId}`)
            }
            
          }
          )
        }
        )
    }

    

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* <Button
      title='Pinaccess'
      onPress={()=>console.log(complainceData)}
      /> */}
      {/* <DropDownSearch
        placeholderText={"Select Permit Number"}
        data={data.permitsList}
        label={"Permit Number"}
        width={355}
        handleChange={onChangePermit}
        selectedValue={selectedPermit}
      /> */}

      <DropDown
      placeholderText={"Permit Number"}
      label={"Permit Number"}
      Location={selectedPermit}
      myValue={(e)=>setIsselectedPermit(e)}
      />

      <DropDownSearch
        placeholderText={"Select Quarter"}
        data={data.quarterList}
        label={"Quarter"}
        myTest={seletedQuarter}
        width={355}
        maxHeight={"auto"}
        handleChange={onChangeQuarter}
        selectedValue={seletedQuarter}
      />

      <View style={styles.userView}>
        <Text style={styles.userlabel}>
          {" "}
          Year : {year==''?new Date().getFullYear():year}
        </Text>
      </View>
      {selectedPermit&&!selectedPermit==''&&seletedQuarter?
      <AccordianList navigation={navigation} data={complainceData} seletedQuarter={seletedQuarter} permitNumber={selectedPermit} forTick={forTick}  year={year}/>
      :
      null
       }
    </View>
  );
};

export default GroundWaterComplaince;

