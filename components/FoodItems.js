import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import MenuItems from "./MenuItems";

const FoodItems = ({ items }) => {
  const data = [items];
  return (
    <View>
      {data?.map((item) => (
        <>
          <Pressable
            onPress={console.log("first")}
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{fontSize:19,fontWeight:"bold"}}>
              {item?.name} ({item?.items.length})
            </Text>
            <AntDesign name="down" size={20} color="black" />
          </Pressable>

          {item?.items?.map((data, index) => (
            <MenuItems key={index} data={data} />
          ))}
        </>
      ))}
    </View>
  );
};

export default FoodItems;

const styles = StyleSheet.create({});
