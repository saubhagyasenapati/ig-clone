import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";

export const bottomTabsIcon = [
  {
    name: "Home",
    active: "https://img.icons8.com/material-rounded/512/home.png",
    inactive: "https://img.icons8.com/material-outlined/512/home--v2.png",
  },
  {
    name: "Search",
    inactive: "https://img.icons8.com/glyph-neue/512/search.png",
    active:
      "https://img.icons8.com/external-prettycons-solid-prettycons/512/external-search-essentials-prettycons-solid-prettycons.png",
  },
  {
    name: "Reels",
    inactive:
      "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/512/external-reels-video-social-media-interface-anggara-basic-outline-anggara-putra.png",
    active:
      "https://img.icons8.com/external-anggara-glyph-anggara-putra/512/external-reels-video-social-media-interface-anggara-glyph-anggara-putra.png",
  },
  {
    name: "Profile",
    inactive:
      "https://media.licdn.com/dms/image/C5603AQHxmBF9VYpniw/profile-displayphoto-shrink_800_800/0/1600160802737?e=1676505600&v=beta&t=YXP8BztkCy06roTBN5Yhr9MUQYCnXCwIAVzYLFqVGJo",
    active:
      "https://media.licdn.com/dms/image/C5603AQHxmBF9VYpniw/profile-displayphoto-shrink_800_800/0/1600160802737?e=1676505600&v=beta&t=YXP8BztkCy06roTBN5Yhr9MUQYCnXCwIAVzYLFqVGJo",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab == icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name == "Profile" ? styles.profilePic() : null,
          activeTab == "Profile" && icon.name == activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="veritical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "0%",
    zIndex: 999,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderColor: "#000",
    borderWidth: activeTab == "Profile" ? 2 : 0,
  }),
});
