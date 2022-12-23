import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { USERS } from "../Data/Users";

const stories = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text>
              {story.user.length > 8
                ? story.user.slice(0, 8).toLowerCase() + "..."
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  story: {
    width: 65,
    height: 65,
    borderRadius: 50,
    margin: 5,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});

export default stories;
