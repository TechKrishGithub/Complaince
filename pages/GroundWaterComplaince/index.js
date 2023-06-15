import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import data from "../../constants";
import { AccordianList, DropDownSearch } from "../../components";
import styles from "./style";
import { getComplainceCategories } from "../../config/api";
import { apiEndpoints } from "../../config/endpoints/index";
import db from "../../permitsDb";
import { Button } from "@rneui/base";

const GroundWaterComplaince = (props) => {
  const { navigation } = props;
  const [selectedPermit, setIsselectedPermit] = useState(null);
  const [seletedQuarter, setSelectedQuarter] = useState(null);
  const [complainceData, setComplainceData] = useState([]);

  const onChangePermit = (permit) => {
    setIsselectedPermit(permit);
  };

  const onChangeQuarter = (quarter) => {
    setSelectedQuarter(quarter);
  };

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
    setTimeout(()=>
    {
      getComplainceCategories();
    },500)
  }, []);

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
      <DropDownSearch
        placeholderText={"Select Permit Number"}
        data={data.permitsList}
        label={"Permit Number"}
        width={355}
        handleChange={onChangePermit}
        selectedValue={selectedPermit}
      />

      <DropDownSearch
        placeholderText={"Select Quarter"}
        data={data.quarterList}
        label={"Quarter"}
        width={355}
        maxHeight={"auto"}
        handleChange={onChangeQuarter}
        selectedValue={seletedQuarter}
      />

      <View style={styles.userView}>
        <Text style={styles.userlabel}>
          {" "}
          Year : {new Date().getFullYear()}
        </Text>
      </View>

      <AccordianList navigation={navigation} data={complainceData} seletedQuarter={seletedQuarter} permitNumber={selectedPermit}/>
    </View>
  );
};

export default GroundWaterComplaince;

