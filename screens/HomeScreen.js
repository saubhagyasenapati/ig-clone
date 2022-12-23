import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Stories from "../components/Stories";
import Post from "../components/Post";
import BottomTabs from "../components/BottomTabs";
import { bottomTabsIcon } from "../components/BottomTabs";
import db from "../firebase";
import {
  collectionGroup,
  query,
  where,
  getDocs,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q= query(collectionGroup(db, 'posts'), orderBy('createdAt', 'desc'))
    // const q = query(collectionGroup(db, "posts"));
    const l = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabsIcon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
export default HomeScreen;
