import { SafeAreaView } from "react-native";
import React from "react";
import AddNewPost from "../components/newpost/AddNewPost";

const NewScreenPost = ({ navigation }) => {
  return (
    <SafeAreaView>
      <AddNewPost navigation={navigation} />
    </SafeAreaView>
  );
};

export default NewScreenPost;
