import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import db from "../../firebase";
import {
  collection,
  query,
  addDoc,
  where,
  onSnapshot,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import validUrl from "valid-url";
const PLACEHOLDER_IMG =
  "https://soho.edu.rs/wp-content/plugins/instagram-feed/img/thumb-placeholder.png";
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the maximum character"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLogedinUser, setcurrentLogedinUser] = useState(null);
  const getUserName = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const Ref = collection(db, "users");
    const q = query(Ref, where("owner_uid", "==", user.uid));
    const l = onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) => {
        setcurrentLogedinUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
        });
      });
    });
    return l;
  };

  useEffect(() => {
    getUserName();
  }, []);

  const uploadPostTofirebase = async (imageUrl, caption) => {
    const auth = getAuth();

    const Ref = collection(db, `users/${auth.currentUser.email}/posts`);
    await addDoc(Ref, {
      imageUrl: imageUrl,
      profile_picture: currentLogedinUser.profilePicture,
      user: currentLogedinUser.username,
      // posts_id:auth.currentUser.uid.posts.uid,
      owner_uid: auth.currentUser.uid,
      owner_email: auth.currentUser.email,
      caption: caption,
      createdAt: serverTimestamp(),
      likes_by_user: [],
      comments: [],
    }).then(() => navigation.goBack());
  };
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostTofirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={styles.container}>
            <Image
              source={{
                uri: validUrl.isUri(thumbnailUrl)
                  ? thumbnailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={styles.img}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a Caption..."
                multiline={true}
                style={{ fontSize: 19 }}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <View>
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              placeholder="Enter Image Url"
              style={{ fontSize: 18 }}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ fontsize: 10, color: "red" }}>
                {errors.imageUrl}
              </Text>
            )}
            <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  img: {
    width: 120,
    height: 120,
  },
});
