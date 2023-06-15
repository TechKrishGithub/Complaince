import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const DynamicForm = () => {
  const [formData, setFormData] = useState([
    { date: "", dischargeAmount: "", maxPermit: "" },
  ]);

  const handleAddRow = () => {
    setFormData([
      ...formData,
      { date: "", dischargeAmount: "", maxPermit: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const handleChange = (index, name, value) => {
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {formData.map((data, index) => (
          <View style={styles.row} key={index}>
            <TextInput
              placeholder="Enter Date"
              style={styles.input}
              value={data.date}
              onChangeText={(value) => handleChange(index, "date", value)}
            />
            <TextInput
              placeholder="Enter Discharge Amount"
              style={styles.input}
              value={data.dischargeAmount}
              onChangeText={(value) =>
                handleChange(index, "dischargeAmount", value)
              }
            />
            <TextInput
              placeholder="Enter Max Permit"
              style={styles.input}
              value={data.maxPermit}
              onChangeText={(value) => handleChange(index, "maxPermit", value)}
            />
            {formData.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveRow(index)}>
                <Ionicons name="ios-trash-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity onPress={handleAddRow} style={styles.addItemView}>
          <Text style={styles.addItemText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DynamicForm;
