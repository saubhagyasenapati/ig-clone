import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ navigation }) => {
  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        console.log("Signed Out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.logo} source={require("../assets/logo.svg")} />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image style={styles.icon} source={require("../assets/post.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon} source={require("../assets/send.png")} />
          <View>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  logo: {
    width: 140,
    height: 70,
    resizeMode: "contain",
  },
  iconContainer: {
    color: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },
  unreadBadgeText: {
    backgroundColor: "red",
    position: "absolute",
    right: -10,
    bottom: 0,
    borderRadius: 50,
    width: 20,
    height: 22,
    alignItems: "center",
  },
});
export default Header;
