import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";

const index = () => {
  const [locationEnable, setLocationEnable] = useState();
  const [currentAddress, setCurrentAddress] = useState(
    "Fetching your location ....."
  );

  useEffect(() => {
    CheckIfLocationEnable();
    GetCurrentLocation();
  }, []);

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
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync();

    let { coords } = await Location.getCurrentPositionAsync();

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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          gap: 12,
        }}
      >
        <FontAwesome6 name="location-dot" size={30} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Deliver To</Text>
          <Text style={{ fontSize: 15, marginTop: 3, color: "gray" }}>
            {currentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#6CB4EE",
            justifyContent: "center",
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>N</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 1,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderColor: "#C0C0C0",
        }}
      >
        <TextInput placeholder="Search for food,hotels" />
        <Ionicons name="search-sharp" size={30} color="#E52850" />
      </View>

      <Carousel />

      <Categories/>
    </ScrollView>
  );
};

export default index;
