import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Table = ({ tableData }) => {
  const [data, setData] = useState(tableData);
  const deleteRow = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    console.log("sdd", id, data);
  };

  return (
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Pollutant</Text>
        <Text style={styles.headerText}>Unit</Text>
        <Text style={styles.headerText}>Max Limits</Text>
        <Text style={styles.headerText}>Result</Text>
      </View>

      {/* Table Data */}
      {tableData.map((entry, index) => (
        <View
          key={index}
          style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
        >
          <Text style={styles.text}>{entry.peramterPollutant}</Text>
          <Text style={styles.text}>{entry.unit}</Text>
          <Text style={styles.text}>{entry.permissibleLimit}</Text>
          <Text style={styles.text}>{entry.result}</Text>
          {tableData.length > 1 && (
            <TouchableOpacity onPress={() => deleteRow(entry.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 2,
    marginTop: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#ffffff",
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
});

export default Table;
