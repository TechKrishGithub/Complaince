import React, { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

const DropDownSearch = (props) => {
  const {
    placeholderText,
    data,
    label,
    handleChange,
    selectedValue,
    maxHeight,
    width,
    forPending,
    myTest
  } = props;
  const [value, setValue] = useState(selectedValue ? selectedValue : null);
  const [isFocus, setIsFocus] = useState(false);

  const onSelect = (item) => {
    setValue(item.value);
    setIsFocus(false);
    //child to parent passing selected Value
    handleChange(item.label);
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" },forPending&&{backgroundColor:'transparent'} ]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container,forPending&&{backgroundColor:'transparent'}]}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          { width: width ? width : "" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus ? (placeholderText ? placeholderText : "Select Item") : "..."
        }
        searchPlaceholder="Search..."
        value={myTest!==null?value:''}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onSelect(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropDownSearch;
