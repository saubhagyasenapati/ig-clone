import { View, StyleSheet, Image } from "react-native";
import React from "react";
import LoginForm from "../components/loginscreen/LoginForm";

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/733/733558.png",
        }}
      />
    </View>
    <LoginForm navigation={navigation} />
  </View>
);

export default LoginScreen;

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
