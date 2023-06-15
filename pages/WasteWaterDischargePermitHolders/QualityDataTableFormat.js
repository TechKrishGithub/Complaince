import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { ListItem } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { DropDownSearch } from "../../components";
import data from "../../constants";
import styles from "./styles";
import Table from "./TableFormat";

const QualityDataTableFormat = () => {
  const [formData] = useState({
    title: `Effluent (Wastewater) Quality Data`,
    textOne: `1. Drop down to allow daily, weekly or monthly data entries should be enabled in WIS permits management portal`,
    textTwo: `2. Parameters as stated in the special terms and conditions of the Waste Discharge Permit`,
    textThree: `3. Attach Effluent Certificates of Analysis from External Accredited Laboratory`,
  });
  const [parameterorpollutant, setParameterorpollutant] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedPermissibleLimit, setSelectedPermmissibleLimit] =
    useState(null);
  const [result, setResult] = useState("");
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const onChangePermit = (permit) => {
    setParameterorpollutant(permit);
  };
  const onChangeUnit = (unit) => {
    setSelectedUnit(unit);
  };

  const onChangePermissibleLimit = (perLimit) => {
    setSelectedPermmissibleLimit(perLimit);
  };

  const addWasteDischargePermit = () => {
    const QulaityTableFormat = {
      id: uuid.v4(),
      peramterPollutant: parameterorpollutant,
      unit: selectedUnit,
      permissibleLimit: selectedPermissibleLimit,
      result: result,
    };

    setTableData([...tableData, QulaityTableFormat]);
    // Reset the form fields
    setParameterorpollutant("");
    setSelectedPermmissibleLimit("");
    setSelectedUnit("");
    setResult("");
  };

  return (
    <View style={styles.qualityTableContainer}>
      <ListItem.Accordion
        content={
          <>
            <Entypo name="water" size={20} style={{ marginRight: 10 }} />
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 15,
                  fontWeight: "800",
                }}
              >
                {formData.title}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ScrollView>
          <ListItem.Content>
            <Text style={styles.text}>{formData.textOne}</Text>
            <Text style={styles.text}>{formData.textTwo}</Text>
            <Text style={styles.text}>{formData.textThree}</Text>
          </ListItem.Content>
        </ScrollView>
      </ListItem.Accordion>

      <View
        style={{
          marginHorizontal: 5,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <DropDownSearch
          placeholderText={"Select Parameterpollutant"}
          data={data.pollutantList}
          label={"Parameterpollutant"}
          width={320}
          handleChange={onChangePermit}
          selectedValue={parameterorpollutant}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <DropDownSearch
            placeholderText={"Select Unit"}
            data={data.unitsList}
            label={"Unit"}
            width={150}
            handleChange={onChangeUnit}
            selectedValue={selectedUnit}
          />
          <DropDownSearch
            placeholderText={"Select Max PermissibleLimit"}
            data={data.maxLimitsList}
            label={"Max Per Limit"}
            width={150}
            handleChange={onChangePermissibleLimit}
            selectedValue={selectedPermissibleLimit}
          />
        </View>
        <TextInput
          style={[styles.input, styles.resultInput]}
          onChangeText={(value) => setResult(value)}
          value={result}
          placeholder="Result"
        />
      </View>

      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: "#3A88C8",
          marginHorizontal: 22,
          borderRadius: 4,
          justifyContent: "center",
          width: 100,
        }}
        onPress={() => {
          addWasteDischargePermit();
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "900",
            textAlign: "center",
          }}
        >
          Add Item
        </Text>
      </TouchableOpacity>

      {/* Table Formation */}
      <Table tableData={tableData} />
    </View>
  );
};

export default QualityDataTableFormat;
