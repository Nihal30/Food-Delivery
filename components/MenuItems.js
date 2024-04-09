import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart, decrementQnt, incrementQnt, removeFromCart } from "../redux/CartSlice";

export default function MenuItems({ data }) {
  const dispatch = useDispatch();
  const [addItems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);

  const handleAddClick = () => {
    setSelected(true);
    if (addItems === 0) {
      setAddItems((current) => current + 1);
    }
    dispatch(addToCart(data));
  };
  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", width: 220 }}>
            {data?.name}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            {data?.price}
          </Text>

          <Text
            style={{
              marginTop: 5,
              borderRadius: 4,
            }}
          >
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                // key={`${food.id}-${i}`}
                key={i}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(data.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </Text>
          <Text
            style={{ width: 200, marginTop: 8, color: "gray", fontSize: 16 }}
          >
            {" "}
            {data?.description.length > 40
              ? data?.description.substr(0, 37) + "..."
              : data?.description}
          </Text>
         
        </View>

        <Pressable style={{ marginRight: 10 }}>
          <Image
            style={{ width: 120, height: 120, borderRadius: 10 }}
            source={{
              uri: "https://www.eatingwell.com/thmb/QYZnBgF72TIKI6-A--NyoPa6avY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greek-salmon-bowl-f681500cbe054bb1adb607ff55094075.jpeg",
            }}
          />
          {/* add button */}

          {selected ? (
            <>
              
              <Pressable
                style={{
                  position: "absolute",
                  top: 95,
                  left: 20,
                  backgroundColor: "#fd5c63",
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Pressable
                  onPress={() => {
                    if (addItems == 1) {
                      dispatch(removeFromCart(data));
                      setAddItems(0);
                      setSelected(false);
                      return;
                    }
                    setAddItems((c) => c - 1);
                    dispatch(decrementQnt(data));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "white",
                      paddingHorizontal: 6,
                    }}
                  >
                    -
                  </Text>
                </Pressable>

                <Pressable>
                  <Text
                    style={{
                      color: "white",
                      paddingHorizontal: 6,
                      fontSize: 15,
                    }}
                  >
                    {addItems}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setAddItems((c) => c + 1);
                    dispatch(incrementQnt(data));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      color: "white",
                      paddingHorizontal: 6,
                    }}
                  >
                    +
                  </Text>
                </Pressable>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={handleAddClick}
              style={{
                position: "absolute",
                top: 95,
                left: 22,
                backgroundColor: "white",
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
                borderRadius: 5,
                borderColor: "#E32636",
                borderWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#fd5c63" }}
              >
                ADD
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
