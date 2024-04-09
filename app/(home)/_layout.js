import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/Store/store";

export default function _layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="restaurantScreen" />
      </Stack>
    </Provider> 
  );
}
