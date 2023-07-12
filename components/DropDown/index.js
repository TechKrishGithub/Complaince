import React, { useState,useEffect } from "react";
import { View, Text,TextInput, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

const DropDown=(props)=>
{
    const {
        placeholderText,
        label,
        maxHeight,
        myValue,
        keyboardType,
        takeValue
      } = props;
      const [value, setValue] = useState('');
      const [isFocus, setIsFocus] = useState(false);
      const [placeholderTextColor,setPlaceHolderTextColor]=useState('black')

      const renderLabel= () => {
        if (isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color:"blue" }]}>
            {label}
            </Text>
          );
        }
        return null;
      };

    return(
        <View style={styles.container}>
            {renderLabel()}
            <TextInput 
            style={[styles.dropdown,{fontSize:18} ]}
            placeholder={isFocus?'EX:BUL501757/2CPJDX':placeholderText}
            onFocus={() => {setIsFocus(true);setPlaceHolderTextColor('gray')}}
            onBlur={() =>{
             value==''?setIsFocus(false):setIsFocus(true);
             myValue(value)
              
        }}
        autoCapitalize="characters"
        keyboardAppearance="dark"
        maxHeight={maxHeight}
        value={value}
        placeholderTextColor={placeholderTextColor}
        onChangeText={(e)=>{setValue(e); myValue(e)}}
            />
        </View>
    )
}

export default DropDown;