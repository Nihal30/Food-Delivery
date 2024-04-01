import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";;

const index = () => {
  const [locationEnable, setLocationEnable] = useState();
  const [currentAddress, setCurrentAddress] = useState(
    "Fetching your location ....."
  );

  useEffect(() => {
    CheckIfLocationEnable();
    GetCurrentLocation();
  },[]);

  const CheckIfLocationEnable = async () => {
    let enable = await Location.hasServicesEnabledAsync();

    if (!enable) {
      Alert.alert(
        "Location service is not enable ",
        "Please enable your location service to continue ",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      setLocationEnable(true);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" ,}],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync();
    console.log( "location", location);
    let { coords } = await Location.getCurrentPositionAsync();
    console.log('coords', coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;
      for (let item of response) {
        let address = `${item?.name}, ${item?.postalCode}, ${item?.city}`;
        // console.log('item', item)

        setCurrentAddress(address);
      }
    }

    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   setErrorMsg('Permission to access location was denied');
    //   return;
    // }

    // let location = await Location.getCurrentPositionAsync({});
    // setCurrentAddress(location);
  };
  console.log('currentAddress', currentAddress)

  return (
    <View>
      <Text>home </Text>
    </View>
  );
};

export default index;
