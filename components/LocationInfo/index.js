import React, { useState, useEffect } from "react";
import { View, TextInput } from "react-native";
import * as Location from "expo-location";
import styles from "./styles";

export default function LocationInfo() {
  const [location, setLocation] = useState("");
  const [latLong, setLatLong] = useState({ latitude: null, longitude: null });

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let long = location.coords.longitude;
    setLatLong({ latitude: lat, longitude: long });

    let addressResponse = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });
    for (let item of addressResponse) {
      let { name, street, city, region, country } = item;
      setLocation(`${name} ${street} ${city} ${region} ${country}`);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.locationAddressView]}>
        <TextInput
          style={[styles.input]}
          placeholder="Location"
          numberOfLines={4}
          onChangeText={(value) => {
            setLocation(value);
          }}
          editable={false}
          value={location}
        />
      </View>
      <View style={[styles.row]}>
        <View style={[styles.field]}>
          <TextInput
            style={[styles.input]}
            placeholder="Latitude"
            editable={false}
            value={`${latLong.latitude}`}
          />
        </View>
        <View style={[styles.field]}>
          <TextInput
            style={[styles.input]}
            placeholder="Longitude"
            editable={false}
            value={`${latLong.longitude}`}
          />
        </View>
      </View>
    </View>
  );
}
