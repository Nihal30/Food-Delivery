import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import { Feather } from "@expo/vector-icons";

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

      <Categories />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "row",
              margin: 10,
              borderRadius: 8,
            }}
          >
            <View>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 7,
                }}
                source={{ uri: item?.image }}
              />
            </View>
            <View style={{ padding: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item?.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  marginTop: 3,
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                {item?.type}
              </Text>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Feather name="clock" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 7,
            letterSpacing: 4,
            marginBottom: 5,
            color: "gray",
            fontWeight: "bold",
          }}
        >
          EXPLORE
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft: 10,
              marginVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 6 }}>
              {item?.name}
            </Text>

            <Text style={{ fontSize: 12, color: "gray", marginTop: 3 }}>
              {item?.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default index;

const recommended = [
  {
    id: 0,
    name: "Nandhana Palace",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/3/50713/81d0735ce259a6bf800e16bb54cb9e5e.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    time: "35 - 45",
    type: "Andhra",
  },
  {
    id: 0,
    name: "GFC Biriyani",
    image:
      "https://b.zmtcdn.com/data/pictures/0/20844770/f9582144619b80d30566f497a02e2c8d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*",
    time: "10 - 35",
    type: "North Indian",
  },
  {
    id: 0,
    name: "Happiness Dhaba",
    image:
      "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    time: "20 - 25",
    type: "North Indian",
  },

  {
    id: 0,
    name: "Happiness Dhaba",
    image:
      "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    time: "20 - 25",
    type: "North Indian",
  },
  {
    id: 0,
    name: "Happiness Dhaba",
    image:
      "https://b.zmtcdn.com/data/reviews_photos/2f1/c66cf9c2c68f652db16f2c0a6188a2f1_1659295848.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    time: "20 - 25",
    type: "North Indian",
  },
];

const items = [
  {
    id: "0",
    name: "Offers",
    description: "Upto 50% off",
    image: "https://cdn-icons-png.flaticon.com/128/9356/9356378.png",
  },
  {
    id: "1",
    name: "Legends",
    description: "Across India",
    image: "https://cdn-icons-png.flaticon.com/128/8302/8302686.png",
  },
  {
    id: "2",
    name: "Gourmet",
    description: "Selections",
    image: "https://cdn-icons-png.flaticon.com/128/1065/1065715.png",
  },
  {
    id: "3",
    name: "Healthy",
    description: "Curated dishes",
    image: "https://cdn-icons-png.flaticon.com/128/415/415744.png",
  },
];
