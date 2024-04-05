import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function Hotel({ item }) {

  const router = useRouter()
  return (
    <Pressable
      style={{
        marginHorizontal: 6,
        marginVertical: 15,
        borderRadius: 20,
        backgroundColor: "white",
      }}
      onPress={() => router.push({
        pathname:"/restaurantScreen",
        params:{
          id:item?.id,
          name:item?.name,
          address:item?.adress,
          smallAdress : item?.smalladress,
          cuisines:item?.cuisines,
          aggregate_rating : item?.aggregate_rating,
          no_of_Delivery : item?.no_of_Delivery

        }

      })}
    >
      <Image
        style={{
          aspectRatio: 6 / 4,
          width: "100%",
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
        }}
        source={{ uri: item?.featured_image }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 16,
              fontWeight: 600,
              marginTop: 10,
            }}
          >
            {item?.name}
          </Text>
          <Text
            style={{
              paddingHorizontal: 10,
              fontSize: 15,
              fontWeight: 500,
              marginTop: 2,
              color: "gray",
            }}
          >
            {item?.cuisines}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              style={{ marginLeft: 10 }}
              name="clock-time-three-outline"
              size={24}
              color="#006A4E"
            />
            <Text
              style={{
                paddingHorizontal: 5,
                fontSize: 15,
                fontWeight: 500,
                marginTop: 2,
                color: "#505050",
              }}
            >
              {item?.time}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#006A4E",
            borderRadius: 5,
            paddingHorizontal: 6,
            paddingVertical: 5,
            marginLeft: 10,
            gap: 3,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {item?.aggregate_rating}
          </Text>
          <MaterialIcons name="star" size={20} color="white" />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#C8C8C8",
          marginHorizontal: 5,
          marginVertical: 6,
          borderWidth: 0.2,
          opacity: 0.2,
        }}
      />

      <View style={{flexDirection:"row" ,gap:4,alignItems:"center",marginBottom:10,paddingHorizontal:10,}}>
      <MaterialCommunityIcons name="brightness-percent" size={24} color="#1F75FE" />
      <Text style={{color:"#1F75FE",fontWeight:"500"}}>{item?.offer}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
