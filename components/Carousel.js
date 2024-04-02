import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const img =[
        "https://media.post.rvohealth.io/wp-content/uploads/2020/08/reasons-to-eat-real-food-1200x628-facebook-1200x628.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptgXa3ckbDRoXhmijVf9s_-F3Kp5Ay6gOtr1a_zLtJg&s"

    ]
  return (
    <View>
       <SliderBox
        images={img}
        autoPlay ={true}
        circleLoop
        dotColor="#13274F"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
            borderRadius:6,
            width:"94%",
            marginTop:10
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
