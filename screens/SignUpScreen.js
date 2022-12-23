import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import SignUpForm from "../components/Signupscreen/SignUpForm";

const SignUpScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/733/733558.png",
        }}
      />
    </View>
    <SignUpForm navigation={navigation} />
  </View>
);

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 12,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
