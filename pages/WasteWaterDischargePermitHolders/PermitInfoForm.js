import {
  View,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { DropDownSearch } from "../../components";
import data from "../../constants";
import styles from "./styles";

const PermitInfoForm = () => {
  const [selectedBasin, setSelectedBasin] = useState(null);
  const [selectedWmz, setSelectedWmz] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [siteName, setSiteName] = useState("");
  const [permitsHolderName, setPermitsHolderName] = useState("");
  const [permitsNumber, setPermitsNumber] = useState("");

  const onChangeBasin = (basin) => {
    setSelectedBasin(basin);
  };
  const onChangeWMZ = (wmz) => {
    setSelectedWmz(wmz);
  };

  const onChangeDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const handlePressOutside = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  useEffect(() => {
    const permitFormObject = {
      siteName,
      permitsHolderName,
      permitsNumber,
      selectedBasin,
      selectedWmz,
      selectedDistrict,
    };

    console.log("permitFormObject:", permitFormObject);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={{ flex: 1 }}>
        <View>
          <DropDownSearch
            placeholderText={"Select Basin"}
            data={data.basinsList}
            label={"Basin"}
            width={330}
            handleChange={onChangeBasin}
            selectedValue={selectedBasin}
          />
          <DropDownSearch
            placeholderText={"Select WMZ"}
            data={data.wmzList}
            label={"Select WMZ"}
            width={330}
            handleChange={onChangeWMZ}
            selectedValue={selectedWmz}
          />
          <DropDownSearch
            placeholderText={"Select District"}
            data={data.districtsList}
            label={"Select District"}
            width={330}
            handleChange={onChangeDistrict}
            selectedValue={selectedDistrict}
          />
          <TextInput
            style={[
              styles.input,
              { marginTop: 14, width: Platform.OS === "ios" ? 330 : 330 },
            ]}
            onChangeText={(value) => setPermitsNumber(value)}
            value={permitsNumber}
            placeholder="Permit Number"
          />
          <TextInput
            style={[styles.input, { width: Platform.OS === "ios" ? 330 : 330 }]}
            onChangeText={(value) => setPermitsHolderName(value)}
            value={permitsHolderName}
            placeholder="Permit's Holder Name"
          />
          <TextInput
            style={[styles.input, { width: Platform.OS === "ios" ? 330 : 330 }]}
            onChangeText={(value) => setSiteName(value)}
            value={siteName}
            placeholder="Site name"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PermitInfoForm;
