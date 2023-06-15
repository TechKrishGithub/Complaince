import { View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";

const OfficeForm = () => {
  const [addFormData, setAddFormData] = useState({
    nameofofficerIncharge: "",
    telephone: "",
    email: "",
  });

  const handleAddFormChange = (name, value) => {
    setAddFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   this is for form update values
  //   useEffect(() => {
  //     console.log("sosos", addFormData);
  //   }, [addFormData]);

  return (
    <View>
      <TextInput
        style={[styles.input, { marginTop: 14 }]}
        onChangeText={(value) =>
          handleAddFormChange("nameofofficerIncharge", value)
        }
        value={addFormData.permitsNumber}
        placeholder="Name of Officer Incharge"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleAddFormChange("telephone", value)}
        value={addFormData.permitsHolderName}
        placeholder="Telephone"
      />
      <TextInput
        style={styles.input}
        onChangeText={(value) => handleAddFormChange("email", value)}
        value={addFormData.siteName}
        placeholder="Email"
      />
    </View>
  );
};

export default OfficeForm;
